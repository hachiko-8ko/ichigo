import { DeferredPromise } from './DeferredPromise';

interface IWorkerData { id: number; fn: string; args: string; }
interface IWorkerResponse { id: number; result?: string; error?: Error; }

/**
 * Creates a dedicated web worker that communicates via deferreds. It can execute whatever function
 * you give it. TaskStart() acts kind of like doing new Thread() and Thread.Start() in one step.
 * It is possible to do all this manually, but this helper class makes it a fairly trivial operation.
 *
 * Hackwork is used to avoid the need to create a specialized web worker js file. The worker created takes a
 * function and arguments, executes them in its own thread, and returns the result.
 *
 * Further hackwork is needed because web works have no access to modules, no access to closures, and can only
 * communiate in strings. The function to be executed needs to be passed as a string in the message between
 * threads.
 *
 * While it is possible to create a version that does not need to eval() the function string on every execution,
 * this requires the caller to manually code everything that you see in here the constructor. No helpers are allowed
 * (no access to other objects). If you wanted to do everything yourself, you could just make a web worker the right
 * way, without the helper.
 */
export class DynamicWebWorker {
    private deferredId: number = 0;
    private deferreds: Map<number, DeferredPromise> = new Map();
    private worker?: Worker; // TS doesn't know that _setUpWorker() is called in the constructor. Though I can see it with my eyes.

    constructor() {
        function setupFunc() {
            const ctx: Worker = self as any;

            // Set up what happens when a message is sent to the worker.
            // If you're willing to write all this, but remember to define your fn function
            // before onmessage, you can skip the eval() step.

            ctx.onmessage = function (evt: any) {
                const { id, fn, args } = evt.data as IWorkerData;
                try {
                    // This hack allows a single dedicated web worker to handle any function. Because
                    // the worker has no access to closures, it has no access to complex objects. It
                    // can only get the function to execute in the message, which contains simple objects
                    // only, strings and numbers. So it has to be serialized and then deserialized.
                    // The only way to deserialize it is to eval() it. Pretty horriffic.

                    // tslint:disable-next-line:prefer-const
                    let inputFunc: any;

                    // tslint:disable-next-line:no-eval
                    eval("inputFunc = " + fn + ";");
                    const argarray = JSON.parse(args) || [];
                    const result = inputFunc(...argarray); // Evaluate the function

                    // Send the response back.
                    ctx.postMessage({ id, result: JSON.stringify(result) } as IWorkerResponse);
                }
                catch (err) {
                    ctx.postMessage({ id, error: err } as IWorkerResponse);
                }

            };
        }

        this._setUpWorker(setupFunc);
    }

    /**
     * Starting a task returns a deferred promise that is resolved when the worker thread has completed its task.
     *
     * Remember that closures DO NOT WORK. Pass your arguments (which must be JSON.stringifiable).
     */
    taskStart(fn: (...args: any[]) => any, ...args: any[]): Promise<any> {
        const id = this.deferredId++;
        const msg: IWorkerData = {
            id,
            fn: fn.toString(),
            args: JSON.stringify(args)
        };
        const deferred = new DeferredPromise();
        this.deferreds.set(id, deferred);
        this.worker!.postMessage(msg);
        return deferred.output
            .then(resp => JSON.parse(resp || ''))
            .catch(err => { throw (err || new Error('Unknown error')); });
    }

    private _setUpWorker(callback: () => void): void {
        // Here's the main hack and it's a doozy.
        // Normally, you are required to create a special worker.js file for web workers and link
        // to them when loading the page. Obviously that makes it impossible to define them at runtime.
        // To get around the limitation, this encodes the worker as an object URL (which requires conversion
        // to a string) and loads that.
        this.worker = new Worker(URL.createObjectURL(new Blob(['(' + callback.toString() + ')();'])));
        this.worker.onmessage = evt => {
            const { id, result, error } = evt.data as IWorkerResponse;
            const deferred = this.deferreds.get(id);
            if (!deferred) {
                throw new Error("Deferred promise is missing.");
            }
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
            this.deferreds.delete(id);
        };
    }
}

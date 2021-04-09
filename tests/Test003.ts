import { assert, DeferredPromise, e_, paragraph } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Deferred Promises',
            descriptionHtml: `
            <h2>Intro</h2>
            <p>The deferred promise is like a regular javascript promise, except that the deferred promise can be triggered manually at any point after it's creation. Regular promises start immediately and just hold their response.</p>
            <p>The deferred promise is implemented as a wrapper around a regular promise, so it uses the same microtask queue.</p>
            <p>The API is similar to the Promise() API, but is tweaked a little bit for usability. For example, having onfulfilled() and onrejected() in then() means that errors in onfulfilled() are not caught. Experienced JS programmers recommend not using onrejected(). I left it out ... why invite disaster when catch() exists?</p>

            <h2>Usage</h2>
            <p>Create a new deferred with "new DeferredPromise()." The API is as follows:</p> 

            <pre>
            class DeferredPromise {
                constructor(
                    onfulfilled?: (value: any) => PromiseLike,
                    throwOnUnhandledError: boolean
                );

                then(
                        onfulfilled?: (value: any) => PromiseLike,
                        throwOnUnhandledError: boolean
                    ): this;
                catch(
                        onrejected?: (reason: any) => PromiseLike,
                        throwOnUnhandledError: boolean
                ): this;

                resolve(args?: any): void;
                reject(args?: any): void;

                get output(): Promise;
            }
            </pre>

            <p>The use of then() and catch() should look very familiar to you if you've used promises before. If it doesn't, google it.</p>

            <p>To invoke the promise, call resolve() on the deferred promise with whatever args you want to pass it.</p>
            <p>Promise.resolve('Something').then(s => someFunction(s))<br />
            is almost the same as <br />
            new DeferredPromise().then(s => someFunction(s)),<br />
            except that the latter is not executed until you call promise.resolve(). Actually, I lie. In that example, resolve() is called somewhere in both cases. It's a garbage example. The point is, in a deferred someFunction() is executed later.</p>

            <h3>Construction</h3>

            <p>Unlike with an unwrapped Promise, you can actually create a DeferredPromise by using new DeferredPromise(). This resolves one of the inconsistencies in the Promise API. One of the things I like about where JS is going is that classes are generally newable.</p>

            <p>The deferred promise takes an optional callback as an input, so that new DeferredPromise(() => console.log('Got it')) is the same as "new DeferredPromise().then(() => console.log('Got it'))."</p>

            <p>Promises, except when used in an async/await context, have an issue with unhandled exceptions. In normal code, an unhandled exception throws in the browser console. In promises, an unhandled exception is silently swallowed. The only way of handling this is to include a catch() step, which will force errors to drop to the catch, and all is good ... unless an error is thrown in the catch. Oops. Having the opposite error handling behavior is a flaw in the promise API, so by default, throwOnUnhandledError adds an extra catch onto every step to throw an error in the browser console.</p>

            <small>I would have preferred to add this only at the end of the chain, but the DeferredPromise doesn't know where the end of the chain is, only the beginning.</small>

            <small>This is messy but it means you don't need to worry that exceptions will be swallowed. It breaks the then().then().catch() pattern so it's not enabled by default.</small>

            <p>It is possible to set throwOnUnhandledError on a step-by-step basis, but it's probably not extremely useful.</p>

            <h3>Async/await</h3>
            <p>Async/await in JS is syntactic sugar around promises, so to make this work, you need access to the actual inner promise that is being wrapped in the DeferredPromise(). This is made accessible through the "output" accessor. You can use it like this:</p>

            <pre>
                this.deferred = new DeferredPromise().then(() => fetchSomething());
                const result = await this.deferred.output;
                setSomethingEqualTo(result);
            </pre>

            <p>Then when something else, such as a mouse-click or the result of some other async operation triggers this.deferred.resolve(), the code picks up again at the await.</p>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test003 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            new DeferredPromise(() => this.testArea.appendChild(paragraph("Waitable test 1", { id: 'waitTest1' }))).resolve();
            new DeferredPromise().then(() => this.testArea.appendChild(paragraph("Waitable test 2", { id: 'waitTest2' }))).resolve();

            const waitDefer = new DeferredPromise().then(() => this.testArea.appendChild(paragraph("Waitable test 3", { id: 'waitTest3' })));
            setTimeout(() => waitDefer.resolve(), 500);

            // Testing errors is hard in a pattern where you don't want to see exceptions
            const none: any = null;
            new DeferredPromise(() => {
                none.nullReferenceException();
            })
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest1' })))
                .catch(() => this.testArea.appendChild(paragraph("CAUGHT ERROR", { id: 'catchTest1' })))
                .resolve();

            new DeferredPromise(() => {
                none.nullReferenceException();
            }, true)
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest2' })))
                .catch(s => this.testArea.appendChild(paragraph('Automatic message: ' + s.message, { id: 'catchTest2' })))
                .resolve();

            new DeferredPromise(() => {
                none.nullReferenceException();
            })
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest3' })), true)
                .catch(s => this.testArea.appendChild(paragraph('Automatic message: ' + s.message, { id: 'catchTest3' })))
                .resolve();

            new DeferredPromise(() => {
                none.nullReferenceException();
            }, true)
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest4' })))
                .catch(() => none.nullReferenceException()) // error thrown in catch
                .catch(() => this.testArea.appendChild(paragraph("CAUGHT ERROR IN CATCH", { id: 'catchTest4' })))
                .resolve();

            new DeferredPromise(() => {
                none.nullReferenceException();
            })
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest5' })))
                .catch(() => none.nullReferenceException(), true) // error thrown in catch
                .catch(() => this.testArea.appendChild(paragraph("CAUGHT ERROR IN CATCH", { id: 'catchTest5' })))
                .resolve();

            new DeferredPromise(() => this.log("This should never be called"))
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'rejectTest1' })))
                .catch(s => this.testArea.appendChild(paragraph("CAUGHT ERROR: " + s, { id: 'rejectTest1' })))
                .reject('REJECTED MANUALLY');

            // This isn't a perfect test because this project is currently generating ES2015, and TSC turns async/await into a generator.
            const waitAsync = new DeferredPromise(() => "AWAITED");
            // Async/await test
            async function test() {
                const awaited = await waitAsync.output;
                document.getElementById('testArea')!.appendChild(paragraph("ASYNC/AWAIT: " + awaited, { id: 'awaitTest1' }));
            }
            setTimeout(() => test(), 0);
            setTimeout(() => waitAsync.resolve(), 10);

            this.log('Async test initiated (2 test sets).');

            // Testing async stuff, ick
            setTimeout(() => {
                try {
                    // 100ms after creation, waitDefer should not have been invoked.
                    const wait1 = document.getElementById('waitTest3');
                    assert(!wait1, "Waitable should wait before resolution.");

                    this.log(`TEST ${this.viewModel.testNumber}: Test set 1 successful.`);
                } catch (err) {
                    this.log("ERROR: " + err);
                    throw err;
                }
            }, 10);

            setTimeout(() => {
                try {
                    const wait1 = document.getElementById('waitTest1');
                    assert(!!wait1, "Waitable constructor should activate when resolve() called.");
                    const wait2 = document.getElementById('waitTest2');
                    assert(!!wait2, "Waitable then() should activate when resolve called().");
                    const wait3 = document.getElementById('waitTest3');
                    assert(!!wait3, "Deferred should not need to be resolved immediately.");

                    const error1 = document.getElementById('catchTest1');
                    assert(e_(error1).innerHTML === "CAUGHT ERROR", "Catch() should be executed on an error");
                    const error2 = document.getElementById('catchTest2');
                    assert(e_(error2).innerHTML.includes('nullReferenceException'), "Automatic throwOnUnhandledError should be thrown with the default error message text");
                    const error3 = document.getElementById('catchTest3');
                    assert(e_(error3).innerHTML.includes('nullReferenceException'), "Instance-level automatic throwOnUnhandledError should be executed on error");
                    const error4 = document.getElementById('catchTest4');
                    assert(e_(error4).innerHTML === "CAUGHT ERROR IN CATCH", "throwOnUnhandledError should catch errors thrown in a catch() statement");
                    const error5 = document.getElementById('catchTest5');
                    assert(e_(error5).innerHTML === "CAUGHT ERROR IN CATCH", "Error in catch() should be caught with instance-level throwOnUnhandledError");
                    const error6 = document.getElementById('rejectTest1');
                    assert(e_(error6).innerHTML === "CAUGHT ERROR: REJECTED MANUALLY", "Reject() should force execution of catch() block");

                    const asyncawait = document.getElementById('awaitTest1');
                    assert(e_(asyncawait).innerHTML === "ASYNC/AWAIT: AWAITED", "Async/await() should act as expected (note: implementation varies by TypeScript ES version)");

                    this.log(`TEST ${this.viewModel.testNumber}: Test set 2 successful.`);
                } catch (err) {
                    this.log("ERROR: " + err);
                    throw err;
                }
            }, 1000);

        } catch (err) {
            this.log("ERROR: " + err);
            throw err;
        }
    }
}

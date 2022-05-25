import { assert, createElement, EventHandler } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Event Handler',
            descriptionHtml: `
            <h2>Intro</h2>
            <p>An event handler is an object containing a subscribe() method and an invoke() method.
            When the invoke() method is called, any delegates that are subscribed are executed. At it's heart, that's
            all it is. The basic design comes from C# event handlers, as does the name (personally, I would prefer "event
            emitter", because to me the subscribing delegate listeners are "handling" the event, but who am I to argue
            with Microsoft).</p>

            <h2>Usage</h2>
            <p>The API is as follows:</p>

            <pre>
            type DelegateType = { callback: IAction1<any>, thisArg: any, promise: RepeatablePromise };
            type RepeatablePromise = RecursiveArray<DelegateType>;

            class EventHandler<TArgs> {
                delegate: RecursiveDelegate;

                subscribe(delegate: RecursiveDelegate): void;
                subscribe(callback: IAction1<TArgs>): void;

                invoke(args?: TArgs): void;

                unsubscribeCallback(callback: IAction1<TArgs>): void;
                unsubscribeDelegate(delegate: RecursiveDelegate): void;
                unsubscribeListener(listener: any): void;
                clear(): void;

                dispose(): void;
            }
            </pre>

            <p>You can subscribe one or more callbacks, either individually or all at the same time. You can also subscribe other delegates, which themselves can be made of multiple callbacks. This is useful to have one delegate invocation trigger multiple event handlers.  You can keep going ad-infinitum. You can subscribe a delegate to itself, if you want to crash the browser.</p>

            <p>The RecursiveDelegate is an array of DelegateType, or an array of arrays of DelegateType, or an array of array of arrays of DelegateType, etc.</p>

            <p>You shoulds include thisArg for the listener that should execute the callback. This is not absolutely required for extremely simple callbacks, but the majority of callbacks do require the thisArg to function, and it's really easy to leave out, making for confusing errors. If this were C#, I might have marked that override as obsolete so you'd get a warning.</p>

            <p>By default, the EventHandler is asynchronous, using promises to execute the delegate. To create a synchronous event handler, send false into the constructor, new EventHandler(false).</p>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test005 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            const handler1 = new EventHandler<{ id: string, innerHTML: string }>();
            handler1.subscribe(args => this.testArea.appendChild(createElement('p', args)), this);
            handler1.invoke({ id: 'handler1', innerHTML: 'TEST 1' });
            handler1.invoke({ id: 'handler2', innerHTML: 'TEST 2' });

            const handler2 = new EventHandler<{ id: string, innerHTML: string }>(true);
            handler2.subscribe(args => {
                args.id = args.id + 's';
                args.innerHTML = args.innerHTML + ': SYNC';
                this.testArea.appendChild(createElement('p', args));
            }, this);
            handler2.invoke({ id: 'handler3', innerHTML: 'TEST 3' });

            // You can subscribe delegates to other delegates, the same as callbacks.
            handler1.subscribe(handler2.delegate);
            handler1.invoke({ id: 'handler4', innerHTML: 'TEST 4' });

            handler1.unsubscribeDelegate(handler2.delegate);
            handler1.invoke({ id: 'handler5', innerHTML: 'TEST 5' });

            const listener1 = {
                callback: function (args: { id: string, innerHTML: string }): void {
                    args.id = args.id + 'c';
                    args.innerHTML = args.innerHTML + ': CALLBACK';
                    document.getElementById('testArea')!.appendChild(createElement('p', args));
                }
            };
            handler1.clear();
            handler1.subscribe(listener1.callback, listener1);
            handler1.invoke({ id: 'handler6', innerHTML: 'TEST 6' });

            handler1.unsubscribeListener(listener1);
            handler1.invoke({ id: 'handler7', innerHTML: 'TEST 7' });

            handler1.subscribe(listener1.callback, listener1);
            handler1.unsubscribeCallback(listener1.callback);
            handler1.invoke({ id: 'handler8', innerHTML: 'TEST 8' });

            // Handler 2 should call handler 1 which calls the callback on handler 1.
            handler1.subscribe(listener1.callback, listener1);
            handler2.subscribe(handler1.delegate);
            handler2.invoke({ id: 'handler9', innerHTML: 'TEST 9' });

            // The delegate is a real reference, not a copy, so if you unsub the callback, it should also unsub from handler2.
            handler1.unsubscribeCallback(listener1.callback);
            handler2.invoke({ id: 'handler10', innerHTML: 'TEST 10' });

            this.log('Async test initiated (1 test set).');

            // Testing async stuff is super annoying
            setTimeout(() => {
                try {
                    const test1 = document.getElementById('handler1');
                    assert(!!test1, 'invoke() should execute the callback with the arguments provided.');

                    const test2 = document.getElementById('handler2');
                    assert(!!test2, 'invoke() should be repeatable.');

                    const test3 = document.getElementById('handler3s');
                    assert(!!test3, 'Synchronous invoke() should execute the listener.');

                    const test4a = document.getElementById('handler4');
                    assert(!!test4a, 'invoke() when chained should still function.');

                    const test4b = document.getElementById('handler4s');
                    assert(!!test4b, 'invoke() when chained should execute the secondary observable');

                    const test5 = document.getElementById('handler5s');
                    assert(!test5, 'Unsubscribed delegates should not be triggered by invoke.');

                    const test6 = document.getElementById('handler6c');
                    assert(!!test6, 'Dumb callbacks should be chainable just like observables.');

                    const test6b = document.getElementById('handler6');
                    assert(!test6b, 'Clear() should unsubscribe all listeners.');

                    const test7 = document.getElementById('handler7c');
                    assert(!test7, 'Should be able to unsubscribe callbacks by listener.');

                    const test8 = document.getElementById('handler8c');
                    assert(!test8, 'Should be able to unsubscribe specific callbacks.');

                    const test9 = document.getElementById('handler9sc');
                    assert(!!test9, 'When unsubscribing a callback from a secondary listener, it should also be unsubscribed from the primary.');

                    const test10 = document.getElementById('handler10sc');
                    assert(!test10, 'When unsubscribing a delegate from a secondary listener, it should also be unsubscribed from the primary.');

                    this.log(`TEST ${this.viewModel.testNumber}: Test successful`);
                } catch (err) {
                    this.log(err.toString());
                }
            }, 1000);

        } catch (err) {
            this.log(err.toString());
        }
    }
}

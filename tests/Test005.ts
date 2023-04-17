import { assert, createElement, EventHandler, DeferredPromise, delay } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';
import { EventHub } from '../src/System/EventHandler/EventHub';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Event Handlers and Channels',
            descriptionHtml: `
            <h2>Intro</h2>
            <p>An event handler is an object containing a subscribe() method and an invoke() method.
            When the invoke() method is called, any delegates that are subscribed are executed. At it's heart, that's
            all it is. The basic design comes from C# event handlers, as does the name (personally, I would prefer "event
            emitter", because to me the subscribing delegate listeners are "handling" the event, but who am I to argue
            with Microsoft).</p>

            <p>To simplify the process, there are global channels that can be accessed using the EventHub class. Channels simplify the
            process of having multiple objects invoke events for multiple listeners by making it easy to find an event handler without
            passing around references. In many cases, you'll be able to put everthing into the main channel.</p>

            <p>You shoulds include thisArg when subscribing for the listener that should execute the callback. This is not absolutely required for extremely simple callbacks, but the majority of callbacks do require the thisArg to function, and it's really easy to leave out, making for confusing errors. If this were C#, I might have marked that override as obsolete so you'd get a warning.</p>

            <p>By default, the EventHandler is asynchronous, using promises to execute the delegate. To create a synchronous event handler, set asyncSetting false on the eventChannel.</p>

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
            const asyncAsserts = new DeferredPromise(delay(1000), true);

            const handler1 = new EventHandler<{ id: string, innerHTML: string }>();
            handler1.subscribe(args => this.testArea.appendChild(createElement('p', args)), this);
            handler1.invoke({ id: 'handler1h', innerHTML: 'TEST 1' });
            asyncAsserts.then(() => {
                const test1 = document.getElementById('handler1h');
                assert(!!test1, 'invoke() should execute the callback with the arguments provided.');
            });

            handler1.invoke({ id: 'handler2h', innerHTML: 'TEST 2' });
            asyncAsserts.then(() => {
                const test2 = document.getElementById('handler2h');
                assert(!!test2, 'invoke() should be repeatable.');
            });

            const handler2 = new EventHandler<{ id: string, innerHTML: string }>();
            handler2.subscribe(args => {
                args.id = args.id + 's';
                args.innerHTML = args.innerHTML + ': SYNC';
                this.testArea.appendChild(createElement('p', args));
            }, this);
            handler2.invoke({ id: 'handler3', innerHTML: 'TEST 3' }, false);
            handler2.invoke({ id: 'handler3.2', innerHTML: 'TEST 2' });
            const test3s = document.getElementById('handler3s');
            assert(!!test3s, 'Synchronous invoke() should execute the listener synchronously.');
            const test3a = document.getElementById('handler3.2s');
            assert(!test3a, 'Asynchronous invoke() should execute the listener asynchronously.');

            const listener1 = {
                callback: function (args: { id: string, innerHTML: string }): void {
                    args.id = args.id;
                    args.innerHTML = args.innerHTML + ': CALLBACK';
                    document.getElementById('testArea')!.appendChild(createElement('p', args));
                }
            };

            handler1.subscribe(listener1.callback, listener1);
            handler1.clear();
            handler1.invoke({ id: 'handler6', innerHTML: 'TEST 6' });
            asyncAsserts.then(() => {
                const test6b = document.getElementById('handler6');
                assert(!test6b, 'Clear() should unsubscribe all listeners.');
            });

            handler1.subscribe(listener1.callback, listener1);
            handler1.unsubscribe(listener1.callback);
            handler1.invoke({ id: 'handler8', innerHTML: 'TEST 8' });
            asyncAsserts.then(() => {
                const test8 = document.getElementById('handler8');
                assert(!test8, 'Should be able to unsubscribe specific callbacks.');
            });

            handler1.subscribe(listener1.callback, listener1);
            handler1.unsubscribe(listener1);
            handler1.invoke({ id: 'handler7', innerHTML: 'TEST 7' });
            asyncAsserts.then(() => {
                const test7 = document.getElementById('handler7');
                assert(!test7, 'Should be able to unsubscribe callbacks by listener.');
            });

            EventHub.subscribe(listener1.callback, listener1);
            EventHub.invoke('main', { id: 'channel1', innerHTML: 'TEST Channel 1' });
            asyncAsserts.then(() => {
                const test = document.getElementById('channel1');
                assert(!!test, 'Should be able to subscribe to the main eventChannel (triggered)');
            });

            EventHub.unsubscribe('main', listener1.callback, listener1);
            EventHub.invoke('main', { id: 'channel2', innerHTML: 'TEST Channel 2' });
            asyncAsserts.then(() => {
                const test = document.getElementById('channel2');
                assert(!test, 'Should be able to unsubscribe from the main eventChannel (not triggered)');
            });

            EventHub.currentChannel = "foo";
            EventHub.subscribe(listener1.callback, listener1);
            EventHub.invoke('main', { id: 'channel3', innerHTML: 'TEST Channel 3' });
            asyncAsserts.then(() => {
                const test = document.getElementById('channel3');
                assert(!test, 'Should be able to subscribe to a different eventChannel than the one invoked (not triggered)');
            });

            EventHub.invoke('foo', { id: 'channel4', innerHTML: 'TEST Channel 4' });
            asyncAsserts.then(() => {
                const test = document.getElementById('channel4');
                assert(!!test, 'Should be able to invoke events on other channels than main (triggered)');
            });

            EventHub.unsubscribe('foo', listener1.callback);
            EventHub.invoke('foo', { id: 'channel5', innerHTML: 'TEST Channel 5' });
            asyncAsserts.then(() => {
                const test = document.getElementById('channel5');
                assert(!test, 'Should be able unsubscribe a different eventChannel (not triggered)');
            });

            EventHub.subscribe('bar', listener1.callback, listener1);
            EventHub.invoke('bar', { id: 'channel6c', innerHTML: 'TEST Channel 6' });
            asyncAsserts.then(() => {
                const test = document.getElementById('channel6');
                assert(!test, 'Should be able subscribe to manually named channels (triggered)');
            });

            // Test synchronous channels. These should execute synchronous event handlers.
            EventHub.subscribe('syncTest', listener1.callback, listener1);
            EventHub.setAsync('syncTest', false);
            EventHub.invoke('syncTest', { id: 'channelSync', innerHTML: 'TEST Channel Sync' });
            const testSync = document.getElementById('channelSync');
            assert(!!testSync, 'Should be able to see sync channel result on the main thread');

            this.log(`TEST ${this.viewModel.testNumber}: Synchronous tests succeeded`);

            this.log('Async test initiated (1 test set).');

            this.log('Starting async tests');
            asyncAsserts.then(() => this.log(`TEST ${this.viewModel.testNumber}: Async tests succeeded`));
            asyncAsserts.catch(err => {
                this.log('ASYNC TESTS FAILED: ' + err.message);
                throw (err);
            });
            asyncAsserts.resolve();
        } catch (err) {
            this.log(err.toString());
        }
    }
}

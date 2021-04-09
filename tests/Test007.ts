import { assert, DeferredPromise, delay, ObservableProxy, paragraph, PropertyChangedEventArgs } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Observable (Roxy) by Proxy',
            descriptionHtml: `
            <p>A clean aproach for the programmer is to use ES2015 proxies. Proxies have been around for enough years
            that they should be supported by all browsers.  They have the benefit of being able to trap access to an
            object in a way that is invisible. They have the disadvantage of being orders of magnitude slower than
            direct access. But we're everywhere using promises, which are an order of magnitude slower than callbacks, so
            clearly CPU cycles are cheap these days. For normal GUI operations, high performance isn't needed.</p>

            <p>The way you create proxies in JavaScript is nasty stuff, and requires the original proxied object to
            be stored somewhere. This is hidden way from you by the ObservableProxy.proximate() method, which takes an
            object and returns the proxied observable version.</p>

            <p>Proxied observables do not have any helper methods like the observable property's safeValue. To the user, they
            appear to be simple POJOs, where get just returns a string. You have to remember to escape it yourself (this isn't
            to say I won't make an extension method at some point).</p>

            <pre><code>
                const observable = ObservableProxy.proximate<IUltimateQuestion>({ theAnswer: 41 });
                observable.subscribe(someComponent.render, someComponent);
                observable.theAnswer += 1;
            </code></pre>

            <p>As you can see, other than the factory method needed to create such an observable, you can access the object's keys as normal.  There's no need to access any special value property like there is with the ObservableProperty class.</p>

            <p>The place where it really shines is on arrays.  The amount of code required to create an ObservableList object is
            considerable (I have it right here), and such an object cannot be accessed using the obj[indexer] syntax, because that
            is built-in and can't be overridden. But on the other hand, this looks almost like a normal array:</p>

            <pre><code>
                const observable = ObservableProxy.proximate<number[]>([0, 1, 2]);
                observable.subscribe(someComponent.render, someComponent);
                observable.push(3, 4);
                observable[4] = 42;
            </code></pre>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test007 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            // test this as a better-connected way to schedule async asserts, since I'm doing so much of them
            const asyncAsserts = new DeferredPromise(delay(1000), true);

            // This is the expected way to produce an observable.
            const observable1 = ObservableProxy.proximate({ num1: 1, num2: 2 });
            assert(observable1.num1 === 1 && observable1.num2 === 2, 'Observable should match initial values');
            observable1.subscribe(args => this.testArea.appendChild(paragraph(`New:${args.newValue}. Old:${args.oldValue}.`, { id: "obs1test" + args.oldValue })));
            observable1.num1 = 2;
            observable1.num1 = 3;

            asyncAsserts.then(() => assert(document.getElementById('obs1test1')!.innerHTML === 'New:2. Old:1.', 'Callback 1 executed with correct arguments'));
            asyncAsserts.then(() => assert(document.getElementById('obs1test2')!.innerHTML === 'New:3. Old:2.', 'Callback 2 executed with correct arguments'));

            // It is possible to build a proxy of a simple value (anything but an object or function). The proximate() method must still
            // return an object, however. It does this by putting the value into a property named 'value.'
            const observable1a = ObservableProxy.proximate(1);
            assert(observable1a.value === 1, "Observable.value loaded with initial value.");
            observable1a.subscribe(args => this.testArea.appendChild(paragraph(`Key: ${args.propertyName}. New:${args.newValue}. Old:${args.oldValue}.`, { id: "observable1a" })));
            observable1a.value = 111;

            asyncAsserts.then(() => assert(document.getElementById('observable1a')!.innerHTML === 'Key: value. New:111. Old:1.', 'Observable.value triggers callback'));

            // Of course, you could do THIS, but it won't do what you're expecting. proximate() makes a COPY (two actually), so changes
            // do not make it to the original object. So don't do this.
            const dontDoThis = { num1: 1, num2: 2 };
            const dontDoThisObservable = ObservableProxy.proximate(dontDoThis);
            dontDoThisObservable.num1 = 3;
            assert(dontDoThis.num1 === 1, 'Original object is not affected');

            const observable2 = ObservableProxy.proximate({ name: "Dog" });
            const observable3 = ObservableProxy.proximate({ name: "Cat" });
            const observable4 = ObservableProxy.proximate({ name: "Cactus" });
            function callback(this: { name: string }, args: PropertyChangedEventArgs, id: number): void {
                document.getElementById('testArea')!.appendChild(paragraph(`I am ${this.name}. Event value: ${args.newValue}`, { id: "forwardTest" + id }));
            }

            // Passing around "this" in javascript is bloody annoying.
            // But usually we aren't linking directly to the observable and trying to manually send in enclosed values.
            // Not THIS redundant (using call()) all the time.
            observable2.subscribe(args => callback.call(observable2, args, 1), observable2);
            observable3.subscribe(args => callback.call(observable3, args, 2), observable3);
            observable4.subscribe(args => callback.call(observable4, args, 3), observable4);
            observable3.sendChangeEventsTo(observable2);
            observable3.receiveChangeEventsFrom(observable4);

            // 4 is sending to 3, which is sending to 2. So modifying 4 will trigger all 3 callbacks.
            observable4.name = "Boa Constrictor";

            asyncAsserts.then(() => assert(document.getElementById('forwardTest1')!.innerHTML === 'I am Dog. Event value: Boa Constrictor', 'Two subscribe layers deep succeeded'));
            asyncAsserts.then(() => assert(document.getElementById('forwardTest2')!.innerHTML === 'I am Cat. Event value: Boa Constrictor', 'One subscribe layer deep succeeded'));
            asyncAsserts.then(() => assert(document.getElementById('forwardTest3')!.innerHTML === 'I am Boa Constrictor. Event value: Boa Constrictor', 'Original subscribe succeeded'));

            // Key deletions are also trapped
            const observable5 = ObservableProxy.proximate({ world: 'Mars' });
            observable5.subscribe(args => this.testArea.appendChild(paragraph(`Type:${args.type}. Key:${args.propertyName}.`, { id: "observable5" })));
            delete observable5.world;
            asyncAsserts.then(() => assert(document.getElementById('observable5')!.innerHTML === 'Type:delete. Key:world.', 'Proxy raises event on delete'));

            // A more generalized proximate function can allow you to track arbitrary method calls on an object. This lets you track changes
            // to inner objects without having to proxy those inner objects.
            class ComplexObject {
                private _arr = [1, 2, 3, 4, 5];
                add(val: any): void {
                    this._arr.push(val);
                }
                get(i: number): any {
                    return this._arr[i];
                }
            }
            const observable6 = ObservableProxy.proximateObject(new ComplexObject(), false, false, ['add']);
            observable6.subscribe(args => this.testArea.appendChild(paragraph(`Type:${args.type}. Key:${args.propertyName}. Args:${JSON.stringify(args.newValue)}.`, { className: 'observable6-no' })));

            const observable6a = ObservableProxy.proximateObject(new ComplexObject(), false, false, ['add']);
            observable6a.subscribe(args => this.testArea.appendChild(paragraph(`Type:${args.type}. Key:${args.propertyName}. Args:${JSON.stringify(args.newValue)}.`, { className: 'observable6-yes' })));

            assert(observable6.get(4) === 5, 'get method call returns expected value');
            asyncAsserts.then(() => assert(document.querySelector('.observable6-no') === null, "Subscribe not called on unwatched method"));

            observable6a.add(6);
            asyncAsserts.then(() => assert(document.querySelector('.observable6-yes')!.innerHTML === "Type:call. Key:add. Args:[6].", "Subscribe called on watched method"));

            // Arrays are very simple, and each method that modifies the array triggers an event.
            // Note that something that modifies an item contained inside the array, without modifing the array itself,
            // is not trapped. To handle this case, you must load the array with observable children, grandchildren, etc, or
            // use a state observable.
            const arr = ObservableProxy.proximate(['a', 'b', 'c']);

            let idx = 0;
            arr.subscribe(args => {
                this.testArea.appendChild(paragraph(`Operation:${args.type} ${args.propertyName}. <span>Now:[${args.newValue}]</span>`, { id: 'array' + idx }));
                idx += 1;
            });

            arr[3] = 'd';
            asyncAsserts.then(() => arrayTest(0, 'a,b,c,d', 'set'));
            arr.length = 3;
            asyncAsserts.then(() => arrayTest(1, 'a,b,c', 'length'));
            arr.push('D');
            asyncAsserts.then(() => arrayTest(2, 'a,b,c,D', 'push'));
            arr.splice(1, 1, 'B');
            asyncAsserts.then(() => arrayTest(3, 'a,B,c,D', 'splice'));
            arr.shift();
            asyncAsserts.then(() => arrayTest(4, 'B,c,D', 'shift'));
            arr.unshift('A');
            asyncAsserts.then(() => arrayTest(5, 'A,B,c,D', 'unshift'));
            arr.reverse();
            asyncAsserts.then(() => arrayTest(6, 'D,c,B,A', 'reverse'));
            arr.pop();
            asyncAsserts.then(() => arrayTest(7, 'D,c,B', 'pop'));
            arr.sort();
            asyncAsserts.then(() => arrayTest(8, 'B,D,c', 'sort'));
            arr.fill('Q', 0, 2);
            asyncAsserts.then(() => arrayTest(9, 'Q,Q,c', 'fill'));
            arr.copyWithin(0, 2);
            asyncAsserts.then(() => arrayTest(10, 'c,Q,c', 'copyWithin'));
            delete arr[0];
            asyncAsserts.then(() => arrayTest(11, ',Q,c', 'delete'));

            function arrayTest(int: number, expected: string, name: string): void {
                assert(document.querySelector(`#array${int} span`)!.innerHTML === `Now:[${expected}]`, `Array ${name} triggers observable`);
            }

            // To make a proxied observable synchronous, set disableAsync to true. This will execute
            // the callbacks in a synchronous way. Note in this example how the current value matches
            // the newValue, when if this were async, the current value would always be Remus.
            // Note that when a proxy is synchronous, subscribe() does not return a promise (obviously) but
            // instead returns undefined. Synchronous subscribe is not thenable.
            let idx2 = 0;
            const observable7 = ObservableProxy.proximate({ name: 'World' }, true);
            observable7.subscribe(args => {
                this.testArea.appendChild(paragraph(`New:${args.newValue}. Current:${observable7.name}.`, { id: "syncObservable" + idx2 }));
                idx2 += 1;
            });
            observable7.name = 'Vulcan';
            assert(document.getElementById('syncObservable0')!.innerHTML === 'New:Vulcan. Current:Vulcan.', 'Callback called synchronously 1');
            observable7.name = 'Romulus';
            assert(document.getElementById('syncObservable1')!.innerHTML === 'New:Romulus. Current:Romulus.', 'Callback called synchronously 2');
            observable7.name = 'Remus';
            assert(document.getElementById('syncObservable2')!.innerHTML === 'New:Remus. Current:Remus.', 'Callback called synchronously 3');

            const observable8 = ObservableProxy.proximate({ name: 'Foo' }, false, true);
            observable8.subscribe(args => {
                this.testArea.appendChild(paragraph(`New:${args.newValue}.`, { id: "noop" }));
            });
            observable8.name = 'Foo';
            asyncAsserts.then(() => assert(document.getElementById('noop') === null, 'No update when value not changed if onlyWhenChanged set'));

            const arr2 = ObservableProxy.proximate([1, 2, 3], true);
            arr2.subscribe(args => {
                this.testArea.appendChild(paragraph(`New:${args.newValue.length}. Current:${arr2.length}.`, { id: "syncObservable" + idx2 }));
                idx2 += 1;
            });
            arr2.push(4);
            assert(document.getElementById('syncObservable3')!.innerHTML === 'New:4. Current:4.', 'Callback called synchronously (array 1)');
            arr2.push(5);
            assert(document.getElementById('syncObservable4')!.innerHTML === 'New:5. Current:5.', 'Callback called synchronously (array 2)');

            this.log(`TEST ${this.viewModel.testNumber}: Sync tests succeeded`);

            this.log('Starting async tests');
            asyncAsserts.then(() => this.log(`TEST ${this.viewModel.testNumber}: Async tests succeeded`));
            asyncAsserts.catch(err => {
                this.log('ASYNC TESTS FAILED: ' + err.message);
                throw (err);
            });
            asyncAsserts.resolve();
        } catch (err) {
            this.log("ERROR: " + err);
            throw err;
        }
    }
}

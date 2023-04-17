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

            <p>The way you create proxies in JavaScript is nasty stuff. This is hidden way from you by the ObservableProxy.proximate() method, which takes an object and returns the proxied observable version. You can keep the original object but it seems to work just as well if you ignore it proximate(new Foo()).</p>

            <p>Proxied observables do not have any helper methods like the observable property's safeValue. To the user, they
            appear to be simple POJOs, where get just returns a string. You have to remember to escape it yourself (this isn't
            to say I won't add it at some point).</p>

            <pre><code>
                const observable = ObservableProxy.proximate<IUltimateQuestion>({ theAnswer: 41 }, 'channelname');
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
            const observable1 = ObservableProxy.proximate({ num1: 1, num2: 2, nest: { name: 'NestedTest' } }, 'test1');
            assert(observable1.num1 === 1 && observable1.num2 === 2, 'Observable should match initial values');
            observable1.subscribe(args => this.testArea.appendChild(paragraph(`New:${args.newValue}. Old:${args.oldValue}.`, { id: "obs1test" + args.oldValue })));
            observable1.num1 = 2;
            asyncAsserts.then(() => assert(document.getElementById('obs1test1')!.innerHTML === 'New:2. Old:1.', 'Callback 1 executed with correct arguments'));
            observable1.num1 = 3;
            asyncAsserts.then(() => assert(document.getElementById('obs1test2')!.innerHTML === 'New:3. Old:2.', 'Callback 2 executed with correct arguments'));

            // By default, proximated objects are deep proxies, meaning that if you change a object nested inside the object, that is also changed.
            // They do this by proxying the child objects as they are pulled out, so when you update them, you're updating another proxy.
            observable1.nest.name = 'ChangedDeeplyNestedProperty';
            asyncAsserts.then(() => assert(document.getElementById('obs1testNestedTest')!.innerHTML === 'New:ChangedDeeplyNestedProperty. Old:NestedTest.', 'Callback 3 executed with correct arguments'));

            // You can create a shallow proxy by setting the /shallow/ argument to true
            const observable1s = ObservableProxy.proximate({ num1: 11, num2: 22, nest: { name: 'ShallowNestedTest' } }, 'test1', true);
            observable1s.num1 = 22;
            asyncAsserts.then(() => assert(document.getElementById('obs1test11')!.innerHTML === 'New:22. Old:11.', 'Shallow observables should still trigger on top-level changes'));
            observable1s.nest.name = "Should not trigger";
            asyncAsserts.then(() => assert(!document.getElementById('obs1testShallowNestedTest'), 'Shallow observables should not trigger n nested changes'));

            // It is possible to build a proxy of a simple value (anything but an object or function). The proximate() method must still
            // return an object, however. It does this by putting the value into a property named 'value.'
            const observable1a = ObservableProxy.proximate(1, 'test1a');
            assert(observable1a.value === 1, "Observable.value loaded with initial value.");
            observable1a.subscribe(args => this.testArea.appendChild(paragraph(`Key: ${args.propertyName}. New:${args.newValue}. Old:${args.oldValue}.`, { id: "observable1a" })));
            observable1a.value = 111;

            asyncAsserts.then(() => assert(document.getElementById('observable1a')!.innerHTML === 'Key: value. New:111. Old:1.', 'Observable.value triggers callback'));

            // Key deletions are also trapped
            const observable5 = ObservableProxy.proximate({ world: 'Mars' }, 'test5');
            observable5.subscribe(args => this.testArea.appendChild(paragraph(`Type:${args.type}. Key:${args.propertyName}.`, { id: "observable5" })));
            delete observable5.world;
            asyncAsserts.then(() => assert(document.getElementById('observable5')!.innerHTML === 'Type:delete. Key:world.', 'Proxy raises event on delete'));

            // Arrays are very simple, and each method that modifies the array triggers an event.
            // Note that something that modifies an item contained inside the array, without modifing the array itself,
            // is not trapped. To handle this case, you must load the array with observable children, grandchildren, etc, or
            // use a state observable.
            const arr = ObservableProxy.proximate(['a', 'b', 'c'], 'testarr');

            let idx = 0;
            arr.subscribe(args => {
                this.testArea.appendChild(paragraph(`Operation:${args.type} <span>${args.propertyName} = [${args.args}]</span>`, { id: 'array' + idx }));
                idx += 1;
            });

            arr[3] = 'd';
            asyncAsserts.then(() => arrayTest(0, '3 = [d]', 'set'));
            arr.length = 3;
            asyncAsserts.then(() => arrayTest(1, 'length = [3]', 'length'));
            arr.push('D');
            asyncAsserts.then(() => arrayTest(2, 'push = [D]', 'push'));
            arr.splice(1, 1, 'B');
            asyncAsserts.then(() => arrayTest(3, 'splice = [1,1,B]', 'splice'));
            arr.shift();
            asyncAsserts.then(() => arrayTest(4, 'shift = []', 'shift'));
            arr.unshift('A');
            asyncAsserts.then(() => arrayTest(5, 'unshift = [A]', 'unshift'));
            arr.reverse();
            asyncAsserts.then(() => arrayTest(6, 'reverse = []', 'reverse'));
            arr.pop();
            asyncAsserts.then(() => arrayTest(7, 'pop = []', 'pop'));
            arr.sort();
            asyncAsserts.then(() => arrayTest(8, 'sort = []', 'sort'));
            arr.fill('Q', 0, 2);
            asyncAsserts.then(() => arrayTest(9, 'fill = [Q,0,2]', 'fill'));
            arr.copyWithin(0, 2);
            asyncAsserts.then(() => arrayTest(10, 'copyWithin = [0,2]', 'copyWithin'));
            delete arr[0];
            asyncAsserts.then(() => arrayTest(11, '0 = []', 'delete'));

            function arrayTest(int: number, expected: string, name: string): void {
                assert(document.querySelector(`#array${int} span`)!.innerHTML === expected, `Array ${name} triggers observable`);
            }

            this.log(`TEST ${this.viewModel.testNumber}: Sync tests succeeded`);

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

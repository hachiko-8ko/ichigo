import { assert, DeferredPromise, delay, ObservableState, paragraph, PropertyChangedEventArgs } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Observable State',
            descriptionHtml: `<p>The state observable, an idea I stole from React, solves one of the basic problems of
            observable objects which may have references, using a somewhat clunky convention. This can be a fair tradeoff.
            The trade is such: by only reading the state using designated methods (value, getState, getValue, getSafeValue)
            and only writing to the state using setState(), you can be sure that changes to any referenced object are trapped.</p>

            <p>For example, if you have an object containing an array of objects, normally to raise an event when a property of
            one of those objects is modified, then that object must be observable. That can't always be done, especially if
            you don't control the source of the referenced object. But when every change has to go through setState(),
            it can be trapped there.</p>

            <p>The state in a state observable is an immutable clone of the data provided. Every time you get the object or
            write to the object, it is cloned. In terms of performance, it's probably even slower than a proxy, but in most
            use cases you won't even notice.</p>

            <p>The methods getValue(key) and getSafeValue(key) return the value of the key you provide. The .value getter
            and getState() method return the entire state.</p>

            <p>The setter .value replaces the entire state, as does the setState(val, true) method when overwriteAll is true.
            The method setState( { key: val } ) method replaces only the keys you provide, and the method setState( callback )
            method executes the callback on the value.  In all cases, setState returns the before and after values as
            { oldValue, newValue }.  When a callback is used, a 'returnValue' key returns any value returned from the callback.</p>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test008 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            // this seems to be working out well
            const asyncAsserts = new DeferredPromise(delay(1000), true);

            const testObject = {
                place: 'motels',
                howMany: 200,
                header: '<h1>200 Motels</h1>',
                caps: function () {
                    return `${this.howMany} ${this.place}`.toUpperCase();
                },
                get getter() {
                    return this.caps();
                },
                voices: [
                    { name: 'Flo' },
                    { name: 'Eddie' },
                    { name: 'Jimmie Carl Black' },
                    { name: 'Jim Pons' }
                ]
            };

            // Demonstrating setState
            (testObject as any).year = 1971;

            const observable1 = new ObservableState(testObject);
            // Both for legibility and to avoid pulling the value 4 times
            const v1 = observable1.value;
            assert(v1.place === 'motels' && v1.howMany === 200 && v1.voices.length === 4, 'value should return the original data');
            assert(v1 !== testObject, 'value should not return the actual referenced object');
            const v1b = observable1.getState();
            assert(v1b.place === 'motels' && v1b.howMany === 200 && v1b.voices.length === 4, 'getState should return the original data');

            assert(observable1.getSafeValue('header') === '&lt;h1&gt;200 Motels&lt;&#x2F;h1&gt;', 'getSafeValue gets the HTML-escaped value if a string');
            assert(observable1.getValue('header') === '<h1>200 Motels</h1>', 'getValue is not HTML-escaped');
            assert(Array.isArray(observable1.getValue('voices')), 'getValue gets the value having the supplied key');

            assert(observable1.value.caps() === '200 MOTELS', 'Logic such as methods can be stored/cloned');
            assert(observable1.value.getter === '200 MOTELS', 'Custom getters can be stored/cloned, though they suck');

            // You can set single keys using a partial object
            const updated1a = observable1.setState({ place: 'Motels' });
            assert(observable1.value.place === 'Motels', 'setState updates the key provided');
            assert(observable1.value.howMany === 200, 'setState leaves other keys as-is');
            assert(updated1a.oldValue.place === 'motels' && updated1a.newValue.place === 'Motels', 'setState returns old and new values');

            // You can also update using a callback, which is good when you need to do incremental modifications.
            // TypeScript is not very good about this, though. It forgets the type of the state object and forces
            // a verbose cast.
            const updated1b = observable1.setState((val: typeof testObject) => val.howMany += 1);
            assert(observable1.getValue('howMany') === 201, 'Callback was executed');
            assert(updated1b.oldValue.howMany === 200 && updated1b.newValue.howMany === 201 && updated1b.returnValue === 201, 'setState returns old, new, and return values for callback input');

            // When setState is called with overwriteAll set to true, or when using the setter, the entire object is replaced.
            observable1.setState({
                place: 'gore motel',
                howMany: 1,
                header: '<h1>Gore Motel</h1>',
                caps: function () {
                    return `${this.howMany} ${this.place}`.toUpperCase();
                },
                get getter() {
                    return this.caps();
                },
                voices: []
            }, true);
            assert(observable1.value.place === 'gore motel', 'setState with an entire object');
            assert((observable1.value as any).year === undefined, 'setState with overwriteAll true replaces everything, even unlisted properties');

            observable1.value = {
                place: 'fugitive motel',
                howMany: 1,
                header: '<h1>Fugitive Motel</h1>',
                caps: function () {
                    return `${this.place}`.toUpperCase();
                },
                get getter() {
                    return this.caps();
                },
                voices: [
                    { name: 'Guy Garvey' },
                    { name: 'Craig Potter' },
                    { name: 'Mark Potter' },
                    { name: 'Pete Turner' }
                ]
            };
            assert(observable1.value.place === 'fugitive motel', 'value setter');

            // Remember, value is a clone of the internal state. You cannot use it to modify the state.
            (observable1.value as any).howMany = 1000;
            assert(observable1.value.howMany === 1, 'Internal state is read-only');

            const observable2 = new ObservableState(testObject);
            observable2.subscribe(args => this.testArea.appendChild(paragraph(`New:${args.newValue.howMany}. Old:${args.oldValue.howMany}.`, { id: "obs2test" + args.oldValue.howMany })));
            observable2.setState({ howMany: 300 });
            observable2.setState({ howMany: 400 });
            observable2.setState((prev: any) => prev.howMany = prev.howMany / 2);

            asyncAsserts.then(() => assert(document.getElementById('obs2test200')!.innerHTML === 'New:300. Old:200.', 'Callback 1 executed with correct arguments'));
            asyncAsserts.then(() => assert(document.getElementById('obs2test300')!.innerHTML === 'New:400. Old:300.', 'Callback 2 executed with correct arguments'));
            asyncAsserts.then(() => assert(document.getElementById('obs2test400')!.innerHTML === 'New:200. Old:400.', 'Callback 3 executed with correct arguments'));

            // And now, to demonstrate the reason the state observable exists. The following test would take a bit more work to
            // get functioning using ordinary observables. Voices would need to be an array of observables, not simple objects.
            // We'll also demonstrate the cloning of a state observable.
            const observable3 = new ObservableState(observable2);
            observable3.subscribe(args => this.testArea.appendChild(paragraph(`Voices:${args.newValue.voices.map((m: any) => m.name).join(', ')}`, { id: "obs3test" })));
            observable3.setState((obj: any) => {
                obj.voices[0].name = 'Mark Volman';
                obj.voices[1].name = 'Howard Kaylan';
            });
            asyncAsserts.then(() => assert(document.getElementById('obs3test')!.innerHTML === 'Voices:Mark Volman, Howard Kaylan, Jimmie Carl Black, Jim Pons', 'Callback executed with nested modification'));

            // The same forward/bubble events exist as on other observables
            const observable4 = new ObservableState({ name: "Dog" });
            const observable5 = new ObservableState({ name: "Cat" });
            const observable6 = new ObservableState({ name: "Cactus" });
            function callback(this: ObservableState<{ name: string }>, args: PropertyChangedEventArgs, id: number): void {
                document.getElementById('testArea')!.appendChild(paragraph(`I am ${this.value.name}. Event value: ${args.newValue.name}`, { id: "forwardTest" + id }));
            }

            // Passing around "this" in javascript is bloody annoying.
            observable4.subscribe(args => callback.call(observable4, args, 1), observable4);
            observable5.subscribe(args => callback.call(observable5, args, 2), observable5);
            observable6.subscribe(args => callback.call(observable6, args, 3), observable6);
            observable5.sendChangeEventsTo(observable4);
            observable5.receiveChangeEventsFrom(observable6);

            // 4 is sending to 3, which is sending to 2. So modifying 4 will trigger all 3 callbacks.
            observable6.value = { name: "Boa Constrictor" };

            asyncAsserts.then(() => assert(document.getElementById('forwardTest1')!.innerHTML === 'I am Dog. Event value: Boa Constrictor', 'Two subscribe layers deep succeeded'));
            asyncAsserts.then(() => assert(document.getElementById('forwardTest2')!.innerHTML === 'I am Cat. Event value: Boa Constrictor', 'One subscribe layer deep succeeded'));
            asyncAsserts.then(() => assert(document.getElementById('forwardTest3')!.innerHTML === 'I am Boa Constrictor. Event value: Boa Constrictor', 'Original subscribe succeeded'));

            // To make an observable synchronous, set disableAsync to true. This will execute the callbacks in a synchronous way. Note
            // in this example how the current value matches the newValue, when if this were async, the current value would always be Remus.
            let idx = 0;
            const observable7 = new ObservableState({ name: 'World' }, { disableAsync: true });
            observable7.subscribe(args => {
                this.testArea.appendChild(paragraph(`New:${args.newValue.name}. Current:${observable7.getSafeValue('name')}.`, { id: "syncObservable" + idx }));
                idx += 1;
            });
            observable7.value = { name: 'Vulcan' };
            assert(document.getElementById('syncObservable0')!.innerHTML === 'New:Vulcan. Current:Vulcan.', 'Callback called synchronously 1');
            observable7.value = { name: 'Romulus' };
            assert(document.getElementById('syncObservable1')!.innerHTML === 'New:Romulus. Current:Romulus.', 'Callback called synchronously 2');
            observable7.value = { name: 'Remus' };
            assert(document.getElementById('syncObservable2')!.innerHTML === 'New:Remus. Current:Remus.', 'Callback called synchronously 3');

            // The observable object can be a primitive object.
            const observable8 = new ObservableState("World");
            observable8.value = 'Mars';
            assert(observable8.value === 'Mars', 'State can be a primitive object');

            // You can call getValue() and getSaveValue() with no args.
            assert(observable8.getValue() === 'Mars', 'getValue() called with no args for a primitive object');
            observable8.value = '<>';
            assert(observable8.getSafeValue() === '&lt;&gt;', 'getSafeValue() called with no args for a primitive object');

            // SetState can be used, it cannot be called with either a partial (primitives don't have partial object properties to set) or
            // a method (it will execute, but primitives are immutable and mostly value types, so if you replace them, changes are lost).
            observable8.setState('Jupiter', true);
            assert(observable8.getValue() === 'Jupiter', 'setState() called with overwriteAll for a primitive object');

            observable8.setState('Saturn');
            assert(observable8.getValue() === 'Saturn', 'On primitive types, overwriteAll is set automatically');

            this.log('Starting async tests');
            asyncAsserts.then(() => this.log(`TEST ${this.viewModel.testNumber}: Async tests succeeded`));
            asyncAsserts.catch(err => {
                this.log('ASYNC TESTS FAILED: ' + err.message);
            });
            asyncAsserts.resolve();

            this.log(`TEST ${this.viewModel.testNumber}: Sync tests succeeded`);

        } catch (err) {
            this.log(err.toString());
        }
    }
}

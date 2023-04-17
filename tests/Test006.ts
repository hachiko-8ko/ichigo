import {
    assert,
    createElement,
    e_,
    observableAssign,
    ObservableProperty,
    paragraph,
    PropertyChangedEventArgs,
} from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';
import { EventHub } from '../src/System/EventHandler/EventHub';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Observable Property',
            descriptionHtml: `
            <h2>Usage</h2>
            <p>An observable property is a field that, when you set its value, raises an event on its event handler.</p>
            <p>And really, it's no more complicated than that. You would use it like the following:</p>
            <pre><code>
                var prop = new ObservableProperty<int>(41);
                prop.subscribe(someComponent.render, someComponent);
                prop.value += 1;
            </code></pre>
            <p>Now someComponent refreshes to show the answer to the ultimate question of life, the universe, and everything. You should try to use safeValue, which is a non-null, HTML-escaped string, for any displayed properties. By default, injection
            should not occur. If it is necessary to inject the value directly into the HTML, use value.</p>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test006 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            const observable1 = new ObservableProperty(1, { name: "A Number", eventChannel: 'test1' });
            assert(observable1.value === 1, "Observable value should return initial value");
            observable1.subscribe(args => this.testArea.appendChild(paragraph(`New:${args.newValue}. Old:${args.oldValue}`, { id: "test" + args.oldValue })), observable1);
            observable1.value = 2;
            observable1.value = 3;
            // See later for assert

            assert(observable1.toString() === "3", "toString should return the string representation of the internal value");

            const observable4 = new ObservableProperty("Hamustaa", { name: "Discordian", eventChannel: 'test2' });

            // 4 is sending to 3, which is sending to 2. So modifying 4 will trigger all 3 callbacks.
            observable4.value = "Boa Constrictor";

            const observable5 = new ObservableProperty("", 'test3');
            observable5.subscribe(args => this.testArea.appendChild(createElement("div", { innerHTML: observable5.safeValue, id: "escape1" })), observable5);
            observable5.value = "<p>paragraph should be escaped</p>";

            const observable6 = new ObservableProperty("", 'test4');
            observable6.subscribe(args => this.testArea.appendChild(createElement("div", { innerHTML: observable6.value, id: "escape2" })), observable6);
            observable6.value = "<p>paragraph should not be escaped</p>";

            const observable8: any = {
                prop: new ObservableProperty("Foo", 'test5')
            };

            observable8.prop.subscribe((args: any) => this.testArea.appendChild(paragraph(`New:${args.newValue}. Old:${args.oldValue}`, { id: "assign" })), observable8);
            observableAssign(observable8, { prop: "BAR", notprop: "BAZ" }); // very simple test
            assert(observable8.notprop === "BAZ", "All properties copied by observableAssign");

            this.log('Async test initiated (1 test set).');

        } catch (err) {
            this.log(err.toString());
        }

        // Testing async stuff is super annoying
        setTimeout(() => {
            try {
                const test1 = document.getElementById('test1');
                assert(!!test1, 'changing value should execute the callback.');
                assert(e_(test1).innerHTML === "New:2. Old:1", "Correct arguments should be passed");

                const test2 = document.getElementById('test2');
                assert(!!test2, 'changing value should execute the callback repeatedly.');

                assert(e_(document.getElementById('escape1')).innerHTML === "&lt;p&gt;paragraph should be escaped&lt;/p&gt;", "safeValue should be escaped for string observables");
                assert(e_(document.getElementById('escape2')).querySelector('p').innerHTML === "paragraph should not be escaped", "value should not be escaped");

                assert(document.getElementById('assign')!.innerHTML === "New:BAR. Old:Foo", "Observable assign assigns full object without losing subscribers");

                this.log(`TEST ${this.viewModel.testNumber}: Test successful`);
            } catch (err) {
                this.log('ERROR: ' + err);
            }
        }, 1000);
    }
}

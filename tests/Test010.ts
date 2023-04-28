import {
    assert,
    BoundComponent,
    createElement,
    createFragment,
    createHtml,
    DeferredPromise,
    delay,
    div,
    elementType,
    ExistingElementOptions,
    IComponentBindingOptions,
    ILoopParent,
    InnerHtmlOptions,
    kw,
    nodeListSelector,
    nodeListSelectorAll,
    ObservableBase,
    ObservableProperty,
    ObservableProxy,
    ObservableState,
    OuterHtmlBindingOptions,
    ExistingLookupBindingOptions,
} from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Bound Component',
            descriptionHtml: `<p>A bound component is a component that has its 1- or 2-way databinding configured by custom HTML attributes beginning with the string "i5_" (or :, which is either valid or invalid depending on which spec you read). The main inspiration, and most of the ideas, are taken from AngularJS and Vue, though Ichigo's templating language is much more basic and does not involve special tokens like {} or {{}}.</p>

            <p>As usual in HTML5, bound components can be constructed in JavaScript code or a combination of JavaScript and HTML. There is even partial support for custom element tags, though this is done by replacing the element, not building a shadow root.</p>

            <p>(A shadow root webcomponent helper is a task for another day, when I feel up to it. The standard has changed and many pages about it are now incorrect, so it's a chore.)</p>

            <h2>Usage</h2>

            <p>The most basic constructor looks like this: new BoundComponent(viewModel).  The view model is any data type.  Normally it is expected to be an observable object, but it could be a simple string or number, if needed.</p>

            <p>You can also convert components using the static BoundComponent.inject() method, which is convenient if you need to convert many elements at once.</p>

            <p>The most important part of the bound component is the ability to set an HTML template for the content. This is done using by using HTML templates, behind the scenes.  What this means is that you should pass valid HTML, either in the innerHTML of the content or as the argument of parseTemplate(). Now, special replacement tags like {} or \${} (I wish template literals were actual templates, then I could use them) are not part of HTML. The way you indicate replacements is with i-v tags, for example &lt;i-v&gt;viewModelVariableName&lt;/i-v&gt;. ViewModelVariableName must be a property of the viewModel you sent in.</p>

            <p>If you send in a simple data type, not an object, you can reference it by a period by itself ('.') as in "Hello &lt;i-v&gt;.&lt;/i-v&gt;"</p>

            <p>To avoid HTML escaping replacement values, include the noescape attribute, &lt;i-v noescape&gt;. If you need to nest components, indicate which component owns a replacement by using the name as a custom attribute &lt;i-v name&gt; (thus, names should contain only valid characters).</p>

            <p>There are so many custom properties in the bound component that I can't really go through them here. I'll summarize them and you can look through the test cases. The following are custom element attributes:</p>

            <ul>
            <li> i5_name="" or :name="" - Name for the component, used to bind specific &lt;i-v name&gt; tags when there are nested components
            <li> i5_text="property" or :text="property" - Set innerHTML to escaped property
            <li> i5_html="property" or :html="property" - Set innerHTML to unescaped property
            <li> i5_value="property" or :value="property" - Set form field value to property
            <li> i5_attr_attributeName="property" or i5_attr:attributeName="property" or :attr:attributeName="property" - Set attribute attributeName to property
            <li> i5_bool_attributeName="property" or i5_bool:attributeName="property" or :bool:attributeName="property" - Add boolean attribute attributeName if property is truthy
            <li> i5_bool0_attributeName="property" or i5_bool-:attributeName="property" or :bool-:attributeName="property" - Remove boolean attribute attributeName if property is truthy
            <li> i5_style="property" or :style="property" - Set style string to property
            <li> i5_class="property" or :class="property" - Set classList string to property
            <li> i5_class_className="property" or i5_class:className="property" or :class:className="property" - If property is truthy, add className. If falsy, remove className
            <li> i5_class0_className="property" or i5_class-:className="property" or :class-:className="property" - Reverse of previous option
            <li> i5_if="property" or :if="property" - If property is truthy, display:none applied. If falsy, removed (and possibly reset if switched on then off)
            <li> i5_if0="property" or :if-="property" - Reverse of previous option
            <li> i5_loop="property" or :loop="property" - Repeat element once for each item in property, calling loopPostProcess() after
            <li> i5_loop_null="property" or i5_loop:null="property" or :loop:null="property" - The same, but loopPostProcess() is not called
            <li> i5_item or :item (no value) - Indicate a the item in a loop that should be converted into a component (optional)
            <li> i5_input or :input (no value) - Bind input events on form field to the BoundComponent.write() method
            <li> i5_target="property" or :target="property" - BoundComponent.write() should send input data to property
            <li> i5_target1="property", i5_target2="property", :target1="property", etc - The same, but write to multiple targets
            <li> i5_input="property" or :input="property" - Shortcut for i5_input i5_target="property"
            </ul>

            <p>"Property" can be an object property, observable property, or parameterless function name. Can be prefixed with "this." to reference the component itself. These custom attributes can be used as attributes, data attributes, or passed in the constructor.</p>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test010 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            const basicViewModel = {
                name: "World",
                list: ["World", "Underworld"],
                cssClass: 'does-nothing',
                cssClasses: 'class-1 class-2',
                rawHtml: "Hello <em>World</em>",
                truthiness: true,
                trumpiness: false,
                nothing: null,
                block: "display: block",
                bold: "font-weight: bold",
                sampleMethod: function () { return this.name; },
                sampleMethod2: function () { return this.cssClass; },
                sampleMethod3: function () { return `Hello <em>${this.name}</em>`; },
                writable: null,
                writable2: null,
                writerMethod: function (arg: any) { this.writable = arg; },
                lastListItem: function () { return this.list[this.list.length - 1]; }
            };

            const asyncAsserts = new DeferredPromise(delay(1000), true);

            // Create the most basic template using pure JS and a simple HTML template.
            // This shows the template replacement format, using <i-v> tags.
            const comp1 = new BoundComponent(basicViewModel, { element: createElement(elementType.HTMLDivElement, { innerHTML: 'Hello <i-v>name</i-v>' }) }).appendToParent(this.testArea);
            assert(comp1.innerHTML === 'Hello <i-v>World</i-v>', 'Simple HTML replacement should populate i-v tags.');

            // The viewModel can be a simple object and can be referenced by '.'
            const comp2 = new BoundComponent("World", { innerHtml: 'Hello <i-v>.</i-v>' }).appendToParent(this.testArea);
            assert(comp2.innerHTML === 'Hello <i-v>World</i-v>', 'Period should indicate the viewModel itself.');

            // Attributes amd other can be set using special attributes. More on this later.
            const comp3 = new BoundComponent(basicViewModel, {
                id: 'comp3',
                innerHtml: 'Hello <i-v>name</i-v>',
                attributes: {
                    i5_class: 'cssClass'
                }
            }).appendToParent(this.testArea);
            assert(comp3.classList.toString() === 'does-nothing', "CSS class attribute should be set");

            // The normal way to create a component is not like the examples given before, but to
            // reference an existing HTML DOM element. While it is possible to set the properties
            // entirely in JS code, there's no need for a bound component without HTML attributes.
            // Note that the TS has to take our word for it that the element is HTMLDivElement.
            this.testArea.appendChild(createHtml('<div id="comp5" i5_class="cssClass">Hello <i-v>name</i-v></div>'));
            const comp5 = new BoundComponent(basicViewModel, { element: (document.getElementById('comp5') as HTMLDivElement)! });
            assert(comp5.innerHTML === 'Hello <i-v>World</i-v>', 'Simple HTML replacement should populate i-v tags.');
            assert(comp5.classList.toString() === 'does-nothing', "CSS class attribute should be set");

            // This is a shortcut for the same thing (with a small twist). It gets extra speed because the type isn't checked.
            // So it has a minus, which is that TS doesn't get the type.
            this.testArea.appendChild(createHtml('<div id="comp5a" i5_class="cssClass">Hello <i-v>name</i-v></div>'));
            const comp5a = new BoundComponent(basicViewModel, { parent: this.testArea, selector: '#comp5a' });
            assert(comp5a.innerHTML === 'Hello <i-v>World</i-v>', 'Simple HTML replacement should populate i-v tags.');
            assert(comp5a.classList.toString() === 'does-nothing', "CSS class attribute should be set");

            // You could also create a new component using new HTML, using almost the same code, using the outerHtml overload.
            // Again, TS has to take our word for it that we're using a DIV, because it's not like it knows.
            // This does make for the quickest unit testing, however, so I will use it extensively.
            const comp6 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, { outerHtml: '<div id="comp6" i5_class="cssClass">Hello <i-v>name</i-v></div>' }).appendToParent(this.testArea);
            assert(comp6.innerHTML === 'Hello <i-v>World</i-v>', 'Simple HTML replacement should populate i-v tags.');
            assert(comp6.classList.toString() === 'does-nothing', "CSS class attribute should be set");

            // Property names can reference data fields but they can also reference methods. If a method is referenced, it is executed
            // and the result is inserted. The method is called with no arguments.
            // Also, outerHtml is so easy to set that you may want to use this shortcut.
            // CONSIDER: Offer a way to set arguments. This can easily get hairy.
            const comp7 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp7" i5_class="sampleMethod2">Hello <i-v>sampleMethod</i-v></div>').appendToParent(this.testArea);
            assert(comp7.innerHTML === 'Hello <i-v>World</i-v>', 'Methods should be called when referenced');
            assert(comp7.classList.toString() === 'does-nothing', "Methods should be called when referenced");

            // Values are by default escaped.
            const comp8 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp8">Escaped: <i-v>rawHtml</i-v></div>').appendToParent(this.testArea);
            assert(comp8.innerHTML === 'Escaped: <i-v>Hello &lt;em&gt;World&lt;/em&gt;</i-v>', "By default replacements should be HTML escaped");

            // You can skip the HTML escape process by adding a noescape property to the i-v element.
            const comp9 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp9">Not escaped: <i-v noescape>rawHtml</i-v></div>').appendToParent(this.testArea);
            assert(comp9.content.querySelector('i-v')!.innerHTML === 'Hello <em>World</em>', "If noescape set, replacements should not be HTML escaped");

            // Escaped text can be set directly by using the i5_text attribute, instead of using the HTML template.
            // This makes a simple one-element template
            const comp10 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, { outerHtml: '<div id="comp10" i5_text="rawHtml"></div>' }).appendToParent(this.testArea);
            assert(comp10.innerHTML === '<i-v>Hello &lt;em&gt;World&lt;/em&gt;</i-v>', "Text property should set escaped HTML");

            // The non-escaped HTML can also be set directly by the i5_html attribute, instead of using the HTML template.
            // This makes a simple one-element template.
            const comp11 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp11" i5_html="rawHtml"></div>').appendToParent(this.testArea);
            // The HTML in this case is -- <i-v noescape="">Hello <em>World</em></i-v> -- which may be browser specific.
            assert(comp11.content.firstElementChild!.innerHTML === 'Hello <em>World</em>', 'HTML property should set unescaped HTML');

            // One will probably use the shortcut text and html properties with methods, however, in places where the HTML needs to be
            // very dynamic. Just like always, methods are fine.
            const comp12 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, { outerHtml: '<div id="comp12" i5_html="sampleMethod3"></div>' }).appendToParent(this.testArea);
            assert(comp12.content.firstElementChild!.innerHTML === 'Hello <em>World</em>', 'Methods should be called when referenced');

            // And just like always, simple models can be accessed by '.'
            const comp13 = new BoundComponent<HTMLDivElement, string>("Hello <em>World</em>", '<div id="comp13" i5_html="."></div>').appendToParent(this.testArea);
            assert(comp13.content.firstElementChild!.innerHTML === 'Hello <em>World</em>', 'Simple objects should be referenced by period');

            // Form fields are pretty nasty because the HTML standard doesn't have a standard way to set the value.
            // To make setting them as easy as it is to set the HTML, the i5_value property is introduced.
            this.testArea.appendChild(createFragment(`<div>
                <input id="comp14a" i5_value="name" />
                <select id="comp14b" i5_value="name">
                    <option value="Sun">Sun</option>
                    <option value="Moon">Moon</option>
                    <option value="Stars">Stars</option>
                    <option value="World">World</option>
                    <option value="Underworld">Underworld</option>
                </select>
                <select id="comp14c" i5_value="list" multiple size="2">
                    <option value="World">World</option>
                    <option value="Underworld">Underworld</option>
                    <option value="Sun">Sun</option>
                    <option value="Moon">Moon</option>
                    <option value="Stars">Stars</option>
                </select>
            </div>`));
            const comp14a = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, { element: document.getElementById('comp14a') as HTMLInputElement });
            const comp14b = new BoundComponent<HTMLSelectElement, typeof basicViewModel>(basicViewModel, { element: document.getElementById('comp14b') as HTMLSelectElement });
            const comp14c = new BoundComponent<HTMLSelectElement, typeof basicViewModel>(basicViewModel, { element: document.getElementById('comp14c') as HTMLSelectElement });
            assert(comp14a.value === 'World', 'Input value can be set');
            assert(comp14b.value === 'World', 'Single select value can be set');
            const setsAreEqual = (a: Set<string>, b: Set<string>) => a.size === b.size && [...a].every(v => b.has(v));
            assert(setsAreEqual(new Set(comp14c.value as string[]), new Set(['World', 'Underworld'])), 'Multi select value can be set');

            // You can set attributes by using i5_attr_attribute or i5_attr:attribute.
            // One looks nicer in HTML but isn't valid JS. The other is less clear but is valid.
            // You can set boolean attributes by using i5_bool_attribute or i5_bool:attribute
            const comp15a = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input id="comp15a" i5_value="name" i5_bool:disabled="truthiness" i5_attr:style="block" />').appendToParent(this.testArea);
            assert(comp15a.value === 'World', 'Value should set value');
            assert(comp15a.style.display === 'block', 'Attr should set attribute');
            assert(comp15a.content.hasAttribute('disabled'), 'Attr should set boolean attribute');

            // Same thing, different style
            const comp15b = new BoundComponent(basicViewModel, {
                id: 'comp15b',
                type: elementType.HTMLInputElement,
                attributes: {
                    // tslint:disable-next-line:object-literal-key-quotes
                    i5_value: 'name',
                    // tslint:disable-next-line:object-literal-key-quotes
                    i5_attr_style: 'block',
                    'i5_bool:disabled': 'truthiness'
                }
            }).appendToParent(this.testArea);
            assert(comp15b.value === 'World', 'Value should set value');
            assert(comp15b.style.display === 'block', 'Attr should set attribute');
            assert(comp15b.content.hasAttribute('disabled'), 'Attr should set boolean attribute');

            // Boolean attributes are ones that take effect if they even exist, regardless of their values.
            // They can be negates by adding ! to the end, i5_bool!:attribute
            // Also there's a different way to set style. While it is possible to set style through attributes, this is probably not normal.
            // Mainly because attributes are the initial value, not the current value.
            // You can set only one style string, mainly because it gives you an easy way to remove previous styles.
            const comp15c = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input id="comp15c" i5_value="name" i5_bool-:disabled="nothing" i5_style="block" />').appendToParent(this.testArea);
            assert(comp15c.content.hasAttribute('disabled'), 'Null attr should set negated boolean attribute');
            assert(comp15c.style.display === 'block', 'Style should set style');

            // You can set the classList with i5_class, which we've already seen. If there are multiple classes, include them
            // separated by space, just like you do in HTML. This lets you turn classes on or off.
            // You can also swtich classes on or off based on truthy/falsy values using i5_class:className (or i5_class_className).
            const comp16 = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp16" i5_class="cssClasses" i5_class_class-3="nothing" i5_class:class-4="truthiness">Hello World</div>').appendToParent(this.testArea);
            assert(comp16.className === 'class-1 class-2 class-4', 'Can turn classes on or off and set multiple classes');

            // A negative switch is followed by a - or a 0 before the first colon.
            const comp16a = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp16a" i5_class0_class-3="trumpiness" i5_class-:class-4="trumpiness" i5_class-:class-5="truthiness">Hello World</div>').appendToParent(this.testArea);
            assert(comp16a.className === 'class-3 class-4', 'Negative className switches reverse logic');

            // i5_if can be used to make a component element visible or invisible, using display: none.
            const comp17a = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp17a" i5_if="truthiness">Hello World</div>').appendToParent(this.testArea);
            const comp17b = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp17b" i5_if="trumpiness">Hello World</div>').appendToParent(this.testArea);
            assert(comp17a.style.display === '', 'i5_if is true, element is displayed');
            assert(comp17b.style.display === 'none', 'i5_if is false, element is not displayed');

            // If i5_if is switched off and then on, the original value of display is restored.
            // This is needed because, aside from using classes (which are probably a MUCH better solution),
            // there is no simple 'not-display-none' style, but instead a host of values for the display property.
            const observable = ObservableProxy.proximate(basicViewModel);
            const comp17c = new BoundComponent<HTMLInputElement, typeof basicViewModel>(observable, '<input id="comp17c" i5_style="block" i5_if="truthiness" value="Hello World"/>').appendToParent(this.testArea);
            observable.truthiness = false;
            observable.truthiness = true;
            asyncAsserts.then(() => assert(comp17c.style.display === 'block', 'i5_if is true, element display property is restored'));

            // The most common piece of event-based functionality is writing to a variable. In most cases, this
            // triggers an input event. According to the HTML5 specification, the input event is triggered
            // on any input, select, or textarea, but real life browsers may vary. For example, in Edge,
            // the input event isn't supported through most of its history.

            // Use the built-in attribute i5_target="propertyName" to indicate what properties the built-in
            // write method should set. If propertyName indicates a method, then that method is called
            // with the value.
            // The following mean the same thing:
            const comp18a = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input id="comp18a" style="display: block;" i5_input i5_target="writable"/>').appendToParent(this.testArea);
            // Shortcut combining the event and the target
            const comp18b = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input id="comp18b" style="display: block;" i5_input="writable"/>').appendToParent(this.testArea);

            comp18a.value = 'First test';
            comp18a.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'First test', 'Input works');
            comp18b.value = 'Second test';
            comp18b.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Second test', 'Input shortcut can take target as an argument');

            // The property 'writable' can be replaced by a method call
            const comp18c = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input id="comp18c" style="display: block;" i5_input="writerMethod"/>').appendToParent(this.testArea);
            const comp18d = new BoundComponent<HTMLInputElement, (x: any) => void>((x: any) => basicViewModel.writerMethod(x), '<input id="comp18d" style="display: block;" i5_input="."/>').appendToParent(this.testArea);

            comp18c.value = 'Fourth test';
            comp18c.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Fourth test', 'Write method can call methods');
            comp18d.value = 'Fifth test';
            comp18d.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Fifth test', 'Write method can call functions');

            // Often you want to set both the input and the value to the same thing.
            // You can use i5_input_value="foo" as a shortcut for i5_input="foo" and i5_value="foo"
            const comp18e = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input id="comp18e" style="display: block;" i5_input_value="writable"/>').appendToParent(this.testArea);
            assert(comp18e.value === 'Fifth test', 'i5_input_value sets value before');
            comp18e.value = 'Sixth test';
            comp18e.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Sixth test', 'i5_input still works');
            assert(comp18e.value === 'Sixth test', 'i5_input_value sets value after');

            // The i5_target attribute can be replicated to write to multiple targets.
            // Everything after the "target", so i5_target1, i5_targetwhatever are valid.

            const comp19 = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input id="comp19" style="display: block;" i5_input i5_target1="writable" i5_target2="writable2" />').appendToParent(this.testArea);
            comp19.value = 'Sixth test';
            comp19.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Sixth test' && basicViewModel.writable2 === 'Sixth test', 'Write method can write to multiple targets');

            // The basic loop, calling the built-in method BoundComponent.loopPostProcess.
            // Without any injection of loop item components (which I will get to shortly), the default loopPostProcess method does nothing.
            // I will need to detour into injection to go over the default post process method.
            const comp20a = new BoundComponent<HTMLDivElement, string[]>(['One', 'Two', 'Three'], '<div id="comp20a" i5_loop=".">Random <span>span content</span>. </div>').appendToParent(this.testArea);
            const comp20b = new BoundComponent<HTMLDivElement, typeof basicViewModel>(basicViewModel, '<div id="comp20b" i5_loop="list">Random <span>span content</span>. </div>').appendToParent(this.testArea);
            assert(comp20a.content.querySelectorAll('span').length === 3, "Inner loop content should be replicated");
            assert(comp20b.content.querySelectorAll('span').length === 2, "Inner loop content should be replicated");

            let loopcalled21a = 0;

            // To do your own logic, pass in a function in the loopPostProcess option. loopPostProcess() is called once for each row in the iterable.
            function loopPostProcess(row: any, addedContent: HTMLElement, allRows: Iterable<any>, previousContent: DocumentFragment): void {
                loopcalled21a++; // simple counter

                addedContent.querySelector('span')!.innerHTML = row; // fill first span in the added content with current value
                const rows = Array.from(allRows);
                // If the last item in the iterable, add a period. This logic depends on the items being unique.
                if (rows.indexOf(row) === rows.length - 1) {
                    addedContent.querySelectorAll('span')[1].innerHTML = '.';
                }
            }

            const comp21a = new BoundComponent<HTMLDivElement, string[]>(['One', 'Two', 'Three'], { outerHtml: '<div id="comp21a" i5_loop=".">A <span>span content</span><span>,</span> </div>', loopPostProcess }).appendToParent(this.testArea);
            assert(loopcalled21a === 3, 'Manual loop was called once per row');
            assert(comp21a.innerHTML === "<i5-loop-row>A <span>One</span><span>,</span> </i5-loop-row><i5-loop-row>A <span>Two</span><span>,</span> </i5-loop-row><i5-loop-row>A <span>Three</span><span>.</span> </i5-loop-row>", 'Manual loop should get the correct inputs and be able to modify the output.');

            // But even though that's possible, doing everything manually isn't ideal.
            // What would be ideal is if there were a way to componentize each item, doing replacements, etc.

            // DETOUR AHEAD

            // So now we make a detour into injection, because the default way to include variation in
            // the loop is by making them a component, by injecting component code.
            // By default, the existing element is kept and converted into a component.
            this.testArea.appendChild(div(`<div>Down in here is a component:
                <div ichigo id="inject01a">Hello <i-v>name</i-v> #1</div>
                <div ichigo i5_style="bold">Hello <i-v>name</i-v> #2</div>
            </div>`));
            const firstInject = document.getElementById('inject01a');

            // This is the same as calling inject(viewmodel, '[ichigo]');
            const injected = BoundComponent.inject<HTMLDivElement, typeof basicViewModel>(kw('viewModel', basicViewModel));
            assert(injected[0].innerHTML === 'Hello <i-v>World</i-v> #1', 'Inject should replace first.');
            assert(injected[0].content === firstInject, 'Inject with keep=true should keep the existing element in place.');
            assert(injected[1].innerHTML === 'Hello <i-v>World</i-v> #2', 'Inject should replace second.');

            // Using the default selector of [ichigo] is probably not a good idea, because it doesn't allow multiple
            // components ... or multiple tests. Let me clean up.
            function injectClean() {
                for (const e of document.querySelectorAll('[ichigo]')) {
                    e.removeAttribute('ichigo');
                }
            }
            injectClean();

            // The strength of the inject method, however, isn't as a shortcut for the regular constructor.
            // It's as a way to replace custom tags.
            this.testArea.appendChild(div(`
                <inject-test-2 id="inject02a">Hello <i-v>name</i-v> #1</inject-test-2>
                <inject-test-2 i5_style="bold">Hello <i-v>name</i-v> #2</inject-test-2>
                <inject-test-3 id="inject02b">Hello <i-v>name</i-v> #3 </inject-test-3>
                <inject-test-3>Hello <i-v>name</i-v> #4 </inject-test-3>
                <div ichigo id="eraseMe" i5_style="bold">Something <i-v>to be replaced</i-v></div>
                <div id="id04d">Also <i-v>to be replaced</i-v></div>
            `));

            const injected2 = BoundComponent.inject<HTMLDivElement, typeof basicViewModel>('inject-test-2', { replace: true }, kw('viewModel', basicViewModel));
            const injected2b = BoundComponent.inject<HTMLSpanElement, typeof basicViewModel>('inject-test-3', { type: 'span', replace: true }, kw('viewModel', basicViewModel));
            assert(injected2[0].content.tagName === 'DIV' && injected2b[0].content.tagName === 'SPAN', 'Elements (including custom tags) are replaced when replace is true');
            assert(injected2[1].style.cssText === 'font-weight: bold;', 'Existing attributes are kept even when replace is true and are attribute template logic is applied');

            const injected2c = BoundComponent.inject<HTMLSpanElement, typeof basicViewModel>('[ichigo]', { outerHtml: '<span i5_style="bold">The new <i-v>name</i-v></span>', id: 'inject02c', replace: true }, kw('viewModel', basicViewModel));
            assert(injected2c[0].innerHTML === 'The new <i-v>World</i-v>', 'When OuterHtml passed, the current innerHTML of the element is discarded');
            assert(injected2c[0].id === 'inject02c', 'OuterHtml options also work with injection');
            assert(injected2c[0].content.tagName === 'SPAN', 'OuterHtml inject still works without using custom tags');
            assert(injected2c[0].style.cssText === 'font-weight: bold;', 'OuterHtml inject keeps existing attributes if not overridden');

            const injected2d = BoundComponent.inject<HTMLSpanElement, typeof basicViewModel>('#id04d', '<span id="inject02d" i5_style="bold">Also the new <i-v>name</i-v></span>', kw('viewModel', basicViewModel));
            assert(injected2d[0].id === 'inject02d' && injected2d[0].innerHTML === 'Also the new <i-v>World</i-v>', 'OuterHtml replace shortcut also works');

            injectClean();

            // When selector is a string, the elements are picked up using document.querySelectorAll().
            // If you are re-using selectors, this will pick up stuff you don't want to use.
            // Feel free to do your own query and pass in the results, or simply an array of elements to replace.
            this.testArea.appendChild(div(`
                <div class="inject-selector-1">Hello <i-v>name</i-v> #1</div>
                <div class="inject-selector-1">Hello <i-v>name</i-v> #2</div>
            `, { id: 'inject03a' }));
            this.testArea.appendChild(div(`<div class="inject-selector-1">Hello <i-v>.</i-v> #3</div>`, { id: 'inject03b' }));
            this.testArea.appendChild(div('Hello <i-v>.</i-v> #4', { id: 'inject03c' }));
            const injected3 = BoundComponent.inject<HTMLDivElement, typeof basicViewModel>(document.getElementById('inject03a')!.querySelectorAll('.inject-selector-1'), kw('viewModel', basicViewModel));
            const injected3b = BoundComponent.inject<HTMLDivElement, string>(document.getElementById('inject03b')!.querySelectorAll('.inject-selector-1'), kw('viewModel', "Sekai"));
            const injected3c = BoundComponent.inject<HTMLDivElement, string>(document.getElementById('inject03c')!, kw('viewModel', "WARUDO"));
            assert(injected3[0].content.querySelector('i-v')!.innerHTML === 'World' && injected3b[0].content.querySelector('i-v')!.innerHTML === 'Sekai', 'Injection applied to NodeList when passed');
            assert(injected3c[0].content.querySelector('i-v')!.innerHTML === 'WARUDO', 'Injection applied to single element when passed');

            // The final piece of the injection recipe is what component is injected.
            // Most of these tests are using the default BoundComponent class, but in the wild,
            // this will most commonly be the relevant view class, such as OrderView or BlogEntryView.
            this.testArea.appendChild(div(`
                <inject-test-4>Hello <i-v>name</i-v></inject-test-4>
                <inject-test-5>Hello <i-v>name</i-v></inject-test-5>
            `));
            class InjectTestComponent extends BoundComponent<HTMLDivElement, typeof basicViewModel> {
                constructor(vm: typeof basicViewModel, args: InnerHtmlOptions) {
                    const tmp = Object.assign({}, vm, { name: 'Derived Class' }); // Change name
                    super(tmp, args);
                }
            }
            // These are both ways to do the same thing
            const injected4 = InjectTestComponent.inject<HTMLDivElement, typeof basicViewModel>('inject-test-4', { replace: true }, kw('viewModel', basicViewModel));
            const injected4b = BoundComponent.inject<HTMLDivElement, typeof basicViewModel>('inject-test-5', { replace: true }, InjectTestComponent, kw('viewModel', basicViewModel));
            assert(injected4[0].innerHTML === 'Hello <i-v>Derived Class</i-v>' && injected4b[0].innerHTML === 'Hello <i-v>Derived Class</i-v>', 'Can replace component class in inject()');

            // END DETOUR

            // And now that we understand injection, we can finally handle loop items using the default looper.
            // This uses the default BoundComponent for the top-level, using a string[] viewModel, and the same class for the
            // item-level, using a string viewModel (not validated by TypeScript).
            const comp22 = new BoundComponent<HTMLDivElement, string[]>(['One', 'Two', 'Three'], `<div id="comp22" i5_loop="."><span><i-v>.</i-v> </span></div>`
            ).appendToParent(this.testArea);
            assert(comp22.innerHTML === '<span iv_bound_component=\"\"><i-v>One</i-v> </span><span iv_bound_component=\"\"><i-v>Two</i-v> </span><span iv_bound_component=\"\"><i-v>Three</i-v> </span>', 'BoundComponent template processed each line individually');

            // Now test the ^ (parent) data source.
            const comp22a = new BoundComponent<HTMLDivElement, { parentProperty: string, iter: string[] }>({ parentProperty: 'out of Three', iter: ['One', 'Two', 'Three'] }, `<div id="comp22a" i5_loop="iter"><span><i-v>.</i-v> <i-v>^parentProperty</i-v> </span></div>`
            ).appendToParent(this.testArea);

            assert(comp22a.content.innerText === 'One out of Three Two out of Three Three out of Three', 'BoundComponent loop contains reference to parent viewModel when referenced by ^');

            // The i-v :source property lets you grab data from any boundComponent on the page, referenced by id
            const comp22b1 = new BoundComponent<HTMLSpanElement, string>("out of Three", { id: "comp22b1", type: "span" }).appendToParent(this.testArea);
            const comp22b = new BoundComponent<HTMLDivElement, string[]>(['One', 'Two', 'Three'], `<div id="comp22b" i5_loop="."><span><i-v>.</i-v> <i-v :source="comp22b1">.</i-v> </span></div>`
            ).appendToParent(this.testArea);
            assert(comp22b.content.innerText === 'One out of Three Two out of Three Three out of Three', 'Data fetched from other component when referenced by :source');

            // The :source property also works for other custom attributes that are used to render the data (all but write targets)
            const comp22c = new BoundComponent<HTMLSpanElement, { passFail: string, falsy: boolean, style: string }>({ passFail: "PASSED", falsy: false, style: "text-decoration:underline;" }, { id: "comp22c", type: "span" }).appendToParent(this.testArea);
            const comp22d = new BoundComponent<HTMLInputElement, { passFail: string, falsy: boolean }>({ passFail: "FAILED", falsy: true }, {
                type: "input",
                attributes: {
                    i5_source: "comp22c",
                    i5_attr_attributecheck: "passFail",
                    i5_value: "passFail",
                    i5_class: "passFail",
                    i5_style: "style"
                }
            }).appendToParent(this.testArea);

            assert(comp22d.content.getAttribute('attributecheck') === "PASSED", "Other component can be used as source for :attr:value");
            assert(comp22d.content.value === "PASSED", "Other component can be used as source for :value");
            assert(comp22d.content.className === "PASSED", "Other component can be used as source for :class");
            assert(comp22d.content.style.textDecoration === "underline", "Other component can be used as source for :style");

            const comp22e = new BoundComponent<HTMLDivElement, { passFail: string, falsy: boolean }>({ passFail: "FAILED", falsy: true }, {
                type: "div",
                id: "comp22e",
                properties: {
                    innerHTML: '<div><i-v #comp22e>.</i-v></div>',
                },
                attributes: {
                    i5_source: "comp22c",
                    i5_class0_passed: "falsy",
                    i5_if: "falsy",
                    i5_loop: "passFail"
                }
            }).appendToParent(this.testArea);

            assert(comp22e.content.className === "passed", "Other component can be used as source for :class:class");
            assert(comp22e.content.style.display === "none", "Other component can be used as source for :if");
            assert(Array.from(comp22e.content.querySelectorAll("div")).length === 6 && comp22e.content.querySelector("div")!.innerText === "P", "Other component can be used as soruce for :loop");

            // Of course, the component can be any class that inherits BoundComponent
            class LoopComponent2 extends BoundComponent<HTMLDivElement, string[]> { }
            const comp23a = new BoundComponent(['One', 'Two', 'Three'], {
                outerHtml: `<div id="comp23a" i5_loop="."><span><i-v>.</i-v> </span></div>`
            }).appendToParent(this.testArea);
            assert(comp23a.content.querySelector('span')!.innerHTML === '<i-v>One</i-v> ', 'Successfully use derived class');

            // In these cases, when you have a view class for the top-level component, you probably
            // don't want to use the default BoundComponent class for the loop items. Set the loopItemClass to
            // indicate a class to use (of course, if you don't use the default looper, you can do whatever).
            // The important point in some contexts is that the parent component is passed on options.parent.
            // Use it in the occasional case where a child needs to know its parent.

            // If you want to have different components for different children (for example, a title component followed by
            // an image component), either encapsulate them in a parent component or don't use the default class/loop.

            // When the content is looped, before render() is called, the innerHTML is blank. It would be possible to keep the
            // template content, but in the case of an async component, that would create a flash of unprocessed content. The way
            // it's being done here, it goes from blank to having data. Much cleaner.

            // WARNING: By default, render() (which contains the loopPostProcess() call) is called in the constructor of BoundComponent.
            // If your child component depends on logic set up in the initialization of the parent component, this will produce bugs.
            // Lifecycle: Main CTOR() => Main super() => Main render() => Loop inject => Item CTOR() => Item CTOR end => Main super end => Main CTOR body (TypeScript field initialization) => Main CTOR end
            // As you can see from the lifecycle, any logic in the item CTOR is called before Main CTOR body.
            // It can be fixed in two ways. One is to set async: true in the options, creating an async component.
            // The second is to set defer: true and call render() manually when appropriate.
            // Currently neither of these is default.

            let loopcounter23b = 0;
            class LoopComponent3 extends BoundComponent<HTMLSpanElement, string> {
                index: number;

                constructor(vm: string, options: IComponentBindingOptions<LoopComponent3> &
                    ExistingElementOptions<HTMLSpanElement> &
                    ILoopParent<LoopComponent2>) {
                    super(vm, options);
                    // Not deferred or async, so if this referenced the parent component, the loopcounter field would be undefined.
                    this.index = loopcounter23b++;
                    this.content.dataset.id = this.index.toString();
                }
            }
            const comp23b = new LoopComponent2(['One', 'Two', 'Three'], new OuterHtmlBindingOptions({
                outerHtml: `<div id="comp23b" i5_loop="."><span><i-v>.</i-v> </span></div>`,
                loopItemClass: LoopComponent3,
                asyncStartup: false // Not using async render because it makes testing suck (this is default)
            })).appendToParent(this.testArea);
            assert(comp23b.content.querySelector<HTMLElement>('span:nth-child(2)')!.dataset.id === '1', 'Successfully call constructor of derived class');

            loopcounter23b = 0;
            const comp23c = new LoopComponent2(['One', 'Two', 'Three'], new OuterHtmlBindingOptions({
                outerHtml: `<div id="comp23c" i5_loop="."><span><i-v>.</i-v> </span></div>`,
                loopItemClass: LoopComponent3,
                defer: true
            })).appendToParent(this.testArea);
            assert(comp23c.innerHTML === '', "Defer true prevents calling of the render() method");
            comp23c.render();
            assert(comp23c.innerHTML === comp23b.innerHTML, "Render can be called at any time after, even outside the derived constructor");

            // If you want to do nothing after creation, the easiest way is to supply an empty method, as in the example i5_loop:null="."
            const comp24 = new LoopComponent2(['One', 'Two', 'Three'], new OuterHtmlBindingOptions({
                outerHtml: `<div id="comp24" i5_loop:null="."><span><i-v>.</i-v> </span></div>`,
                loopItemClass: LoopComponent3
            })).appendToParent(this.testArea);
            assert(comp24.innerHTML === '<span><i-v>.</i-v> </span><span><i-v>.</i-v> </span><span><i-v>.</i-v> </span>', 'Null loop handler does not inject any component');

            // At this time, I decided to add a way to access properties of the view, rather than the viewModel, by
            // prefixing them with "this." This would need to be in a derived class, because none of the methods
            // base class are applicable.

            // WARNING: Normally, render() is called in the constructor of BoundComponent. In the super() call of your class.
            // This will cause problems in most cases where properties are accessed. To handle this, using this.properties
            // triggers automatic { defer: true } behavior.
            // To handle it, you can set async to true or you can call render() at the end of the constructor.
            class LoopComponent4 extends BoundComponent<HTMLSpanElement, string> {
                index = 0;

                constructor(vm: string, options: IComponentBindingOptions<LoopComponent3> &
                    ExistingElementOptions<HTMLSpanElement> &
                    ILoopParent<LoopComponent2>) {
                    super(vm, options);

                    // If you look at the JS that TS generates, you'll see that this.index = 0 isn't called until after super().
                    // In render() (called in super()), index is undefined.
                    this.index = options.loopParent!.viewModel.indexOf(vm);
                }
            }

            const comp25a = new LoopComponent2(['One', 'Two', 'Three'], new OuterHtmlBindingOptions({
                outerHtml: `<div id="comp25a" i5_loop="."><span i5_attr:data-id="this.index"><i-v>.</i-v> </span></div>`,
                loopItemClass: LoopComponent4
            })).appendToParent(this.testArea);
            assert(comp25a.content.innerText === '. . .', 'Render() not called automatically when "this." used.');

            // You can use fields without difficulty if async is true
            const comp25b = new LoopComponent2(['One', 'Two', 'Three'], new OuterHtmlBindingOptions({
                outerHtml: `<div id="comp25b" i5_loop="."><span i5_attr:data-id="this.index"><i-v>this.index</i-v>: <i-v>.</i-v> </span></div>`,
                loopItemClass: LoopComponent4,
                asyncStartup: true
            })).appendToParent(this.testArea);
            // This is why I hate testing with async. Throw a debugger in and this will fail:
            this.log('Async test initated for 25b.');
            asyncAsserts.then(() => assert((document.querySelector('#comp25b span:nth-child(2)') as HTMLElement).dataset.id === '1', 'this.index can be accessed asynchronously'));

            // If you want to do a synchronous call, do it this way.
            class LoopComponent5 extends LoopComponent4 {
                constructor(vm: string, options: IComponentBindingOptions<LoopComponent3> &
                    ExistingElementOptions<HTMLSpanElement> &
                    ILoopParent<LoopComponent2>) {
                    super(vm, options);
                    this.render(); // Now it's safe to call render.
                }
            }
            const comp25c = new LoopComponent2(['One', 'Two', 'Three'], new OuterHtmlBindingOptions({
                outerHtml: `<div id="comp25c" i5_loop="."><span i5_attr:data-id="this.index"><i-v>this.index</i-v>: <i-v>.</i-v> </span></div>`,
                loopItemClass: LoopComponent5
            })).appendToParent(this.testArea);
            assert((document.querySelector('#comp25c span:nth-child(2)') as HTMLElement).dataset.id === '1', 'this.index can be accessed if render() called in constructor');

            // I warned you against having replacement values that return other components, because the process of refreshing the data
            // (if an observable is in play) will delete your references. And the timing can be tricky.
            // That said, there should be no issues with nesting a component inside  (the static portion of) another component. Don't
            // loop, because loops are all dynamic.

            // But there will be issues without additional work.
            // In the following example, you'll see that without filtering i-v tags, the replacement in comp-2 will want to print
            // [Object object]. Which will break comp-2's replacement.
            // But by setting the name and matching it up in the "component" property of the i-v tags, the replacements are filtered to
            // only certain components.

            this.testArea.appendChild(div(`
                <comp-1>
                    Hello <i-v #comp26a>name</i-v>
                    <comp-2>This is <i-v #comp26b>.</i-v></comp-2>
                </comp-1>
            `));
            const comp26a = BoundComponent.inject('comp-1', { replace: true, type: elementType.HTMLDivElement, id: 'comp26a' }, kw('viewModel', basicViewModel));
            // You can set name by attribute iv_name or by name option.
            const comp26b = BoundComponent.inject('comp-2', { replace: true, type: elementType.HTMLDivElement, id: 'comp26b' }, kw('viewModel', 'nested'));

            assert(comp26a[0].innerHTML.includes('Hello <i-v #comp26a="">World</i-v>'), 'I-V tags are replaced based on their assigned components');
            assert(comp26a[0].innerHTML.includes('<div id="comp26b" iv_bound_component="">This is <i-v #comp26b="">nested</i-v></div>'), 'I-V tags are restricted to their assigned components');

            this.testArea.appendChild(div(`
                <comp-1>
                    Hello <i-v>name</i-v>
                    <comp-2>This is <i-v component="comp26d">.</i-v></comp-2>
                </comp-1>
            `));
            // This is pretty risky because i-v has no reference so I don't recommend being lazy like this.
            const comp26c = BoundComponent.inject('comp-1', { replace: true, type: elementType.HTMLDivElement, id: 'comp26c' }, kw('viewModel', basicViewModel));
            const comp26d = BoundComponent.inject('comp-2', { replace: true, type: elementType.HTMLDivElement, id: 'comp26d' }, kw('viewModel', 'nested'));
            assert(comp26c[0].innerHTML.includes('Hello <i-v>World</i-v>'), 'Non-scoped I-V tags match first component requested');
            assert(comp26c[0].innerHTML.includes('<div id="comp26d" iv_bound_component="">This is <i-v component="comp26d">nested</i-v></div>'), 'I-V tags are replaced based on their assigned components when bound using full syntax');

            // Multi-renderer containers
            // In our previous examples, components were being created for each bindable element. That isn't necessary.
            // A single component can bind any child element containing a property beginning with i5_ (or the shortcut ':')
            this.testArea.appendChild(createHtml(`
                <div id='multiRenderComponent'>
                    <div id='multi-1' :style="validate">
                        <div>
                            <input id="multi-2" name="name" :input:="name" />
                        </div>
                    </div>
                    <h5 id='multi-3'><i-v>name</i-v></h5>
                    <div :loop="data" id='multi-4'>
                        <div :item>
                            Animals whose names are <i-v>num</i-v> letters:
                            <div :loop="animals" :attr:id="."><div :item><i-v>.</i-v></div></div>
                        </div>
                    </div>
                </div>
            `));

            const multiViewModel: any = ObservableProxy.proximate({
                name: 'John Doe',
                validate: (() => multiViewModel.name ? '' : 'background: red') as () => string,
                data: [{ num: 3, animals: ['dog', 'cat'] }, { num: 5, animals: ['horse', 'hippo', 'birdy'] }]
            });

            const multiComponent = new BoundComponent(multiViewModel, new ExistingLookupBindingOptions({ selector: '#multiRenderComponent ' }));

            assert((this.testArea.querySelector('#multi-4') as HTMLElement).innerText === "Animals whose names are 3 letters:\ndog\ncat\nAnimals whose names are 5 letters:\nhorse\nhippo\nbirdy", "Loop sub-renderer and nested loop populated");
            assert((this.testArea.querySelector('#multi-2') as HTMLInputElement).value === "John Doe", "Input value sub-renderer in child element of component populated");
            (this.testArea.querySelector('#multi-2') as HTMLInputElement).value = '';
            (this.testArea.querySelector('#multi-2') as HTMLElement).dispatchEvent(new Event('input', { bubbles: true }));
            asyncAsserts.then(() => assert((this.testArea.querySelector('#multi-1') as HTMLElement).style.background === "red", "Sub-renderer in child element of component updated after observable event"));

            // SHORTCUTS

            // To make things quicker, there is a shortcut for the "i5_" prefix on custom attributes: :
            // This makes :attr, :value, :loop, and so forth.
            // : is completely non-standard but it is legal in attribute names.
            const short1 = new BoundComponent(basicViewModel, '<div :class="cssClass">Shortcut</div>').appendToParent(this.testArea);
            assert(short1.classList.toString() === 'does-nothing', ':class shortcut for i5_class');
            const short2 = new BoundComponent(basicViewModel, '<span :style="block">Shortcut</span>').appendToParent(this.testArea);
            assert(short2.style.display === 'block', ':style shortcut for i5_style');
            const short3 = new BoundComponent(basicViewModel, '<div :text="rawHtml"></div>').appendToParent(this.testArea);
            assert(short3.innerHTML === '<i-v>Hello &lt;em&gt;World&lt;/em&gt;</i-v>', ":text shortcut for i5_text");
            const short4 = new BoundComponent(basicViewModel, '<div :html="rawHtml"></div>').appendToParent(this.testArea);
            assert(short4.content.firstElementChild!.innerHTML === 'Hello <em>World</em>', ":html shortcut for i5_html");
            const short5 = new BoundComponent(basicViewModel, '<input :style="block" :value="name" />').appendToParent(this.testArea);
            assert(short5.value === 'World', ':value shortcut for i5_value');
            const short6 = new BoundComponent(basicViewModel, '<input :style="block" :value="name" :attr:disabled="truthiness" />').appendToParent(this.testArea);
            assert(short6.content.hasAttribute('disabled'), ':attr shortcut for i5_attr');
            const short7 = new BoundComponent(basicViewModel, '<div :if="truthiness">Shortcut seen</div>').appendToParent(this.testArea);
            const short8 = new BoundComponent(basicViewModel, '<div :if="trumpiness">Shortcut not seen</div>').appendToParent(this.testArea);
            const short9 = new BoundComponent(basicViewModel, '<div :if-="truthiness">Shortcut not seen</div>').appendToParent(this.testArea);
            assert(short7.style.display === '', ':if shortcut for i5_if');
            assert(short8.style.display === 'none', ':if shortcut for i5_if');
            assert(short9.style.display === 'none', ':if- shortcut for i5_if0');

            const short10 = new BoundComponent(basicViewModel, '<input :style="block" :input="writable" />').appendToParent(this.testArea);
            short10.value = 'Shortcut 10';
            short10.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Shortcut 10', ':input shortcut for i5_input');
            const short11 = new BoundComponent(basicViewModel, '<input :style="block" :input :target1="writable" :target2="writable2" />').appendToParent(this.testArea);
            short11.value = 'Shortcut 11';
            short11.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Shortcut 11' && basicViewModel.writable2 === 'Shortcut 11', ':target shortcut can handle multiple targets');

            // The shortcut for i5_input_value is :input: (:input_value will still work but it's still wordy)
            const short12 = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input style="display: block;" :input:="writable" />').appendToParent(this.testArea);
            assert(short12.value === 'Shortcut 11', ':input: before');
            short12.value = 'Shortcut 12';
            short12.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(short12.value === 'Shortcut 12', ':input: after');

            // You can shortcut loops
            const short13 = new BoundComponent(['Short', 'Shorter', 'Shortest'],
                `<div :loop="."><span><i-v>.</i-v></span></div>`
            ).appendToParent(this.testArea);

            // The : shortcut is only intended to replace custom component attributes.
            const short14 = new BoundComponent(['Short', 'Shorter', 'Shortest'],
                `<div :loop="."><span><i-v>.</i-v></span></div>`
            ).appendToParent(this.testArea);

            // Ichigo makes heavy use of custom attributes, and purists might refuse to use it because all the attributes are
            // technically invalid, not even considering the shortcut character.
            // To make them happy, Ichigo can also be configured using data attributes, which are valid. It didn't take a lot of code.
            const dataset1 = new BoundComponent(basicViewModel, '<div data-i5_class="cssClass">Shortcut</div>').appendToParent(this.testArea);
            assert(dataset1.classList.toString() === 'does-nothing', 'i5_class in dataset');
            const dataset2 = new BoundComponent(basicViewModel, '<span data-i5_style="block">Shortcut</span>').appendToParent(this.testArea);
            assert(dataset2.style.display === 'block', 'i5_style in dataset');
            const dataset3 = new BoundComponent(basicViewModel, '<div data-i5_text="rawHtml"></div>').appendToParent(this.testArea);
            assert(dataset3.innerHTML === '<i-v>Hello &lt;em&gt;World&lt;/em&gt;</i-v>', "i5_text in dataset");
            const dataset4 = new BoundComponent(basicViewModel, '<div data-i5_html="rawHtml"></div>').appendToParent(this.testArea);
            assert(dataset4.content.firstElementChild!.innerHTML === 'Hello <em>World</em>', "i5_html in dataset");
            const dataset5 = new BoundComponent(basicViewModel, '<input style="display: block" data-i5_value="name" />').appendToParent(this.testArea);
            assert(dataset5.value === 'World', 'i5_value in dataset');
            const dataset6 = new BoundComponent(basicViewModel, '<input style="display: block" data-i5_value="name" data-i5_attr_disabled="truthiness" />').appendToParent(this.testArea);
            assert(dataset6.content.hasAttribute('disabled'), 'i5_attr in dataset');

            const dataset7 = new BoundComponent(basicViewModel, '<div data-i5_if="truthiness">Shortcut seen</div>').appendToParent(this.testArea);
            const dataset8 = new BoundComponent(basicViewModel, '<div data-i5_if="trumpiness">Shortcut not seen</div>').appendToParent(this.testArea);
            assert(dataset7.style.display === '', 'i5_if in dataset');
            assert(dataset8.style.display === 'none', 'i5_if in dataset');

            const dataset9 = new BoundComponent(basicViewModel, '<input style="display: block" data-i5_input="writable" />').appendToParent(this.testArea);
            dataset9.value = 'Dataset 9';
            dataset9.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Dataset 9', 'i5_input in dataset');
            const dataset10 = new BoundComponent(basicViewModel, '<input style="display: block" data-i5_input data-i5_target1="writable" data-i5_target2="writable2" />').appendToParent(this.testArea);
            dataset10.value = 'Dataset 10';
            dataset10.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(basicViewModel.writable === 'Dataset 10' && basicViewModel.writable2 === 'Dataset 10', 'data-i5_target shortcut can handle multiple targets');

            const dataset11 = new BoundComponent<HTMLInputElement, typeof basicViewModel>(basicViewModel, '<input style="display: block;" data-i5_input_value="writable"/>').appendToParent(this.testArea);
            assert(dataset11.value === 'Dataset 10', 'data-i5_input_value before');
            dataset11.value = 'Dataset 11';
            dataset11.content.dispatchEvent(new Event('input', { bubbles: true }));
            assert(dataset11.value === 'Dataset 11', 'data-i5_input_value after');

            const dataset12 = new BoundComponent(['Short', 'Shorter', 'Shortest'],
                `<div data-i5_loop="."><span><i-v>.</i-v></span></div>`
            ).appendToParent(this.testArea);

            // Again, some extra complexity for the sake of consistency.
            const dataset13 = new BoundComponent(['Short', 'Shorter', 'Shortest'],
                `<div data-i5_loop="."><span><i-v>.</i-v></span></div>`
            ).appendToParent(this.testArea);

            // If you subscribe the render() method of the component to an observable's changes,
            // then when the data is modified, the rendering of that data will be updated.
            // Remember that by default, observables work asynchronously.

            // If the view model is an observable, you can observe it simply by
            // passing observeViewModel: true in the component options.
            class ObservableViewModel extends ObservableBase {
                name = new ObservableProperty<string>("World", { name: "name", eventChannel: "VM1" });
            }
            const observableViewModel = new ObservableViewModel("VM1");
            const observeComp1 = new BoundComponent(observableViewModel, {
                innerHtml: 'Hello <i-v>name</i-v>'
            }).appendToParent(this.testArea);
            assert(observeComp1.innerHTML === 'Hello <i-v>World</i-v>', 'Component shows initial value before update');
            setTimeout(() => {
                observableViewModel.name.value = "Neptune";
            }, 500);
            asyncAsserts.then(() => assert(observeComp1.innerHTML === 'Hello <i-v>Neptune</i-v>', 'Render() called when observing viewModel, if using the same channel.'));

            // You can also observe each individual property of a view model, which is useful when the VM itself is a dumb object. Which
            // is generally better, in my opinion. Simpler chain of responsibility.
            class MoreTypicalViewModel {
                name = new ObservableProperty<string>("World", "typicalVM");
            }
            const dumbViewModel = new MoreTypicalViewModel();
            const observeComp2 = new BoundComponent(dumbViewModel, {
                innerHtml: 'Hello <i-v>name</i-v>'
            }).appendToParent(this.testArea);
            observeComp2.observeAll();
            assert(observeComp2.innerHTML === 'Hello <i-v>World</i-v>', 'Component shows initial value before update #2');
            setTimeout(() => {
                dumbViewModel.name.value = "Mars";
            }, 600);
            asyncAsserts.then(() => assert(observeComp2.innerHTML === 'Hello <i-v>Mars</i-v>', 'Render() called when observing all observable properties of a dumb view model'));

            // Of course, you can manually specify the observers
            const observeComp3 = new BoundComponent(dumbViewModel, {
                innerHtml: 'Hello <i-v>name</i-v> #2'
            }).appendToParent(this.testArea);
            observeComp3.observe(dumbViewModel.name);
            asyncAsserts.then(() => assert(observeComp3.innerHTML === 'Hello <i-v>Mars</i-v> #2', 'Render() called when observing observable properties on a dumb view model explicitly'));

            // The VM doesn't matter as long as it's observable. The process is the same for an array.
            // In this case, the array is the view model, so pass observeViewModel to true.
            const observableArr = ObservableProxy.proximate(['One', 'Two']);
            const observeComp7 = new BoundComponent(observableArr,
                {
                    outerHtml: `<div :loop="."><span class="observing"><i-v>.</i-v> </span></div>`
                }
            ).appendToParent(this.testArea);
            assert(Array.from(observeComp7.content.querySelectorAll('.observing')).length === 2, 'Array length before updating.');
            observableArr.push('Three');
            asyncAsserts.then(() => assert(Array.from(observeComp7.content.querySelectorAll('.observing')).length === 3, 'Array length after updating.'))
                .then(() => assert(Array.from(observeComp7.content.querySelectorAll('.observing i-v')).pop()!.innerHTML === 'Three', 'Last item is the most recent array addition'));

            // State observables are similar, but keep in mind a few things.
            // Most importantly, you should observe the view model itself, never the sub-objects, which are just parts of the overall state.
            // Also, you are a bit limited in the complexity of your object.
            const stateObservable = new ObservableState<typeof basicViewModel>(basicViewModel, 'stateVM');
            const observeComp8 = new BoundComponent(stateObservable, {
                innerHtml: 'Hello <i-v>lastListItem</i-v>'
            }).appendToParent(this.testArea);
            asyncAsserts.then(() => assert(observeComp8.innerHTML === 'Hello <i-v>Middle Earth</i-v>', 'Render() called with setState()'));
            stateObservable.setState({ list: ['World', 'Underworld', 'Middle Earth'] });

            // The following shouldn't throw. They won't do anything, but they shouldn't throw.
            const null1 = new BoundComponent(undefined, { element: createElement(elementType.HTMLDivElement, { innerHTML: 'Null-hello <i-v>name</i-v>' }) }).appendToParent(this.testArea);
            const null2 = new LoopComponent2(undefined as any, {
                outerHtml: `<div id="null2" i5_loop="."><span><i-v>.</i-v> </span></div>`,
                loopItemClass: LoopComponent3,
                asyncStartup: false // Not using async render because it makes testing suck (this is default)
            }).appendToParent(this.testArea);
            const null3 = new BoundComponent(undefined, {
                innerHtml: 'Null-hello <i-v>name</i-v>'
            }).appendToParent(this.testArea);

            // If you declare the loop in the format :loop:someUniqueProperty (not including null), then simple change detection is applied.
            // In the default case, during a change, the entire list is destroyed and re-filled. With change detection on, items may be
            // moved, inserted, or deleted. It just requires the iterable to return objects having a unique id to identify the current rows.
            // In some cases (adding a row to a very big list), this might perform better.
            // I'm not 100% sure it's needed. Even my computer is fast enough that I can't see the difference.
            const observableArr2 = ObservableProxy.proximate([{ id: 1, val: 'One' }, { id: 2, val: 'Two' }]);
            const observeComp7a = new BoundComponent(observableArr2,
                {
                    outerHtml: `<div :loop:id="."><span class="observing"><i-v>val</i-v> </span></div>`
                }
            ).appendToParent(this.testArea);
            assert(Array.from(observeComp7a.content.querySelectorAll('.observing')).length === 2, 'Array length before updating (change detection on).');
            const firstItem = observeComp7a.content.querySelector('.observing');
            observableArr2.push({ id: 3, val: 'Three' });
            asyncAsserts.then(() => assert(Array.from(observeComp7a.content.querySelectorAll('.observing')).length === 3, 'Array length after updating (change detection on).'))
                .then(() => assert(Array.from(observeComp7a.content.querySelectorAll('.observing i-v')).pop()!.innerHTML === 'Three', 'Last item is the most recent array addition (change detection on)'))
                .then(() => assert(observeComp7a.content.querySelector('.observing') === firstItem, 'First item has not been destroyed because it did not change (change detection on)'));

            this.log(`TEST ${this.viewModel.testNumber}: Sync test successful`);

            this.log('Starting async tests');
            asyncAsserts.then(() => this.log(`TEST ${this.viewModel.testNumber}: Async tests succeeded`));
            asyncAsserts.catch(err => {
                this.log('ASYNC TESTS FAILED: ' + err.message);
            });
            asyncAsserts.resolve();

        } catch (err) {
            this.log(err.toString());
        }
    }
}

import { assert, Component, ComponentMap, div, elementType } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Components',
            descriptionHtml: `<p>A component is the base class that implements IContent, an object whose "content"
            property is an HTMLElement that is the representation of the object on the page. Most of the class
            is made up of helpers to make construction easy and to access common functions, like innerHTML, without
            having to type obj.content.HTML.</p>

            <h2>Usage</h2>
            <pre><code>
            abstract class Component<TElement> {
                content: TElement;
                get id(): string;
                set id(value);
                get innerHTML(): string;
                set innerHTML(value);

                constructor();
                constructor(lookupExistingElement: IExistingLookupOptions);
                constructor(existingElement: IExistingElementOptions<TElement>);
                constructor(newElement: IInnerHtmlOptions);
                constructor(newElement: IOuterHtmlOptions);
                constructor(newElement: string);

                addEventListener(eventType: string, event: (evt: Event) => any, options?: AddEventListenerOptions): this;
                addInlineEventListeners(componentFilter?: string): this;

                append<T>(newChild: T): this;

                appendChild<T>(newChild: T): T;

                setStyle(property: string, value: string): this;
                setStyle(style: { [string]: string }): this;

                setClass(className: string): this;
                setClass(classNames: string[]): this;

                appendToParent(parent: Node): this;
            }
            </code></pre>

            <p>The component is just a base class, so you must inherit from it. All the work is in the constructor. You can pass it an
            existing element, enough info to look up an element, a tag name and the inner HTML, the full outer HTML (either as an object
            or a string). The rest are just helper methods that access the "content" object, which is a reference to the element you
            passed in the constructor.</p>

            <p>The one exception to this rule is the addInlineEventListeners() method, which acts upon custom attributes. If you create
            an element with a property named either i5_event or :event, along with an event name in parentheses set equal to a method
            on the component, it is translated into an addEventListener() call.</p>

            <pre><code>
            &lt;button type="button" i5_event (click)="something"&gt;Click Me&lt;/button&gt;
            </code></pre>

            <p>This is the same as button.addEventListener('click', component.something.bind(component));</p>
            `
        });
    }
}

/**
 * This class has nothing to add to the component. Makes it faster to unit test.
 * Normally you would probably set this to something specific.
 */
class PassThroughComponent<TElement extends HTMLElement> extends Component<TElement> {
    constructor(args?: any) {
        super(args);
    }
}

export class Test009 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            const comp1 = new PassThroughComponent();
            assert(comp1.content.tagName === "DIV", "Default should be div component.");

            const comp2 = new PassThroughComponent({ id: 'comp2' });
            assert(comp2.content.id === 'comp2', "Id should match containerId");
            assert(comp2.id === comp2.content.id, "Id helper should return content element id");

            this.testArea.appendChild(comp2.content);
            assert(!!this.testArea.querySelector('#comp2'), "Should be able to add content to page");

            comp2.innerHTML = "Hello component 2";
            assert(comp2.content.innerHTML === "Hello component 2", "innerHTML setter should set content HTML");

            const comp3 = new PassThroughComponent({ id: 'comp3', innerHtml: 'Hello component 3', type: elementType.HTMLSpanElement });
            assert(comp3.content.innerHTML === "Hello component 3", "innerHtml setting should set initial HTML");
            assert(comp3.content.tagName === "SPAN", "Should create tag type provided in constructor");

            const adiv = div("Some existing element");
            const comp4 = new PassThroughComponent({ element: adiv });
            assert(comp4.content === adiv, "When containerElement specified, it should become the content of the component");

            assert(ComponentMap.components.get(comp4.content) === comp4, "ComponentMap should return component when provided component content");

            const comp4a = comp4.append(div("A new child", { id: 'comp4a' }));
            assert(!!comp4.content.querySelector('#comp4a'), "Append() should append to content");
            assert(comp4a === comp4, "Append() should return reference to component.");

            const div2 = div("A new child", { id: 'comp4b' });
            const comp4b = comp4.appendChild(div2);
            assert(!!comp4.content.querySelector('#comp4b'), "appendChild() should append to content");
            assert(comp4b === div2, "appendChild() should return reference to child.");

            const div3 = div("Another element", { id: 'comp5a' });
            const comp5 = new PassThroughComponent({ element: div3 });
            const comp6 = comp5.addClass('a-class').addClass('b-class c-class').addClass(['d-class', 'e-class']).setStyle('border', 'solid').setStyle({ color: 'blue' });
            assert(comp6 === comp5, "setClass() and setStyle() should return reference to child");
            for (const c of ['a-class', 'b-class', 'c-class', 'd-class', 'e-class']) {
                assert((Array.from(div3.classList) as any).includes(c), "setClass() should add class to content");
            }
            assert(div3.style.border === 'solid', "setStyle() should set style of content");
            assert(div3.style.color === 'blue', "setStyle() should set style of content");
            comp5.appendToParent(this.testArea);
            assert(!!this.testArea.querySelector('#comp5a'), "appendToParent() should add content as child of target element");

            const comp7 = new PassThroughComponent({ outerHtml: '<span id="comp7" style="display: block;">Hello component 7</span>' }).appendToParent(this.testArea);
            assert(comp7.content.innerHTML === "Hello component 7", "outerHtml setting should set initial HTML");
            assert(comp7.content.tagName === "SPAN", "Should create tag type provided in outerHTML");

            // Here's something a little fancy.

            // There are already ways to add events, with no need to resort to shortcuts. But event shortcuts
            // are common in javascript frameworks. Take angular, which stores method call as a string, which is executed.
            // Now shudder.

            // In Ichigo, we add an i5_event or :event attribute to the HTML (both are acceptable ... it just depends on if you
            // mind non-standard attribute format or not), and then the event type in parentheses, which is set equal to a method in
            // the component.  This method is called with the event as its only argument, as in the following examples:
            // <div i5_event (click)="doSomething"></div>
            // <input :event (input)="writeSomething" />

            // The following is invalid and will throw: <button :event (click)="modifySometing(evt.currentTarget, someClosure)"></button>
            // It will throw because that string is not a method name on the component (unless you have weird methods).

            let comp8clicked;
            class Comp8Test extends Component<HTMLDivElement> {
                constructor() {
                    super('<div id="comp8" i5_event (click)="simpleTest">Click Me</div>');
                    this.addInlineEventListeners();
                }
                simpleTest(evt: Event): void {
                    comp8clicked = 'I was clicked';
                }
            }
            const comp8 = new Comp8Test().appendToParent(this.testArea);
            comp8.content.click();
            assert(!!comp8clicked, 'Click event should be wired to method');

            this.log(`TEST ${this.viewModel.testNumber}: Test successful`);
        } catch (err) {
            this.log(err.toString());
        }
    }
}

import '../src/ExtensionLoader';

import { assert, createElement, div, elementType, ObservableProperty } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Extension Methods',
            descriptionHtml: `<p>In 2017, the original goal was to have one-line binding of HTML elements to dynamic properties, as if
            it were a built-in part of the HTML5 standard. This eventually involved the creation of prototype extension methods. The
            implementation has changed -- now everything uses component binding -- but the original API of extension methods remains. 
            Further extensions were created to do other useful tasks, such as replacing an element.</p>

            <p>To add extension methods to the HTML element prototypes, import ExtensionLoader.ts directly.</p>

            <h2>Usage</h2>

            <p>These are just links to other methods that have already been referenced elsewhere, so I'm just going to list the methods.</p>

            <pre><code>
            interface HTMLElement {
                appendToParent(parent: HTMLElement): this;
                appendChildFluent<T extends Node>(child: T): this;
                appendSibling<T extends Node>(next: T): T;
                appendSiblingFluent<T extends Node>(next: T): this;
                replaceWith<T extends Node>(newElement: T): T;
                swap<T extends Node>(element: T): T;
                extract(): this;
                addEventListenerFluent(eventType: string, event: (evt: Event) => any, options?: AddEventListenerOptions): this;
                addStyle(property: string, value: string): this;
                addClass(classNames: string | string[]): this;
            }
            interface DocumentFragment {
                createElement<TElement extends HTMLElement>(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): TElement;
                createElementFluent(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): this;
                appendToParent<TElement extends HTMLElement>(parent: TElement): TElement;
            }
            interface HTMLElement {
                getComponent(this: HTMLElement): IContent | undefined;
                bindComponent<TElement extends HTMLElement = HTMLElement, TModel = any>(this: TElement, viewModel: TModel): BoundComponent<TElement, TModel>;
                deleteComponent(): void;
            }
            interface Object {
                toObservable<T>(name?: string): ObservableProperty<T>;
            }
            interface String {
                toObservable(name?: string): ObservableProperty<string>;
            }
            interface Number {
                toObservable(name?: string): ObservableProperty<number>;
            }
            interface Boolean {
                toObservable(name?: string): ObservableProperty<boolean>;
            }
            </code></pre>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test012 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {

            let clickTest = false;

            const newDiv = div("PARENT", { id: "newDiv" });
            const sister = newDiv.appendToParent(this.testArea)
                .appendChildFluent(div("CHILD", { id: "child" }))
                .addClass("some-class")
                .addStyle("text-decoration", "underline")
                .appendSiblingFluent(div("BROTHER", { id: "brother" }))
                .appendSibling(div("SISTER", { id: "sister" }))
                .addEventListenerFluent("click", () => { clickTest = true; });

            assert(newDiv.parentElement === this.testArea, "AppendToParent adopts parent element");
            assert(document.getElementById("child")!.parentElement === newDiv, "AppendChildFluent works as appendChild");
            assert(newDiv.className === 'some-class', "AddClass adds a class, and appendChildFluent returned reference to fluent object");
            assert(newDiv.style.textDecoration === 'underline', "AddStyle adds a style, and addClass returned reference to fluent object");
            assert(document.getElementById("brother")!.parentElement === this.testArea, "AppendSiblingFluent adds a sibling element");
            assert(document.getElementById("sister")!.parentElement === this.testArea, "AppendSibling adds a sibling element and appendSiblingFluent returned reference to fluent object");
            assert(document.getElementById("sister") === sister, "AppendSibling returns reference to argument and addEventListenerFluent returned reference to fluent object");

            sister.click();
            assert(clickTest, "AddEventListenerFluent adds click handler");

            const exchangeStudent = this.testArea.appendChild(div("FAMILY IN ANOTHER COUNTRY", { id: "foreign" }))
                .appendChild(div("EXCHANGE STUDENT", { id: "exchange" }));

            exchangeStudent.swap(sister);
            assert(document.getElementById("foreign") === sister.parentElement && exchangeStudent.parentElement === this.testArea, "Swap exchanged element locations");

            const puppy = document.getElementById("child")!.replaceWith(div("PUPPY"));
            assert(puppy.parentElement === newDiv && document.getElementById("child") === null, "ReplaceWith added replaced the element");

            sister.extract();
            assert(document.getElementById("sister") === null, "Extract removed the element");

            const frag = document.createDocumentFragment();
            frag.createElementFluent(elementType.HTMLDivElement, { innerHTML: "Frag Brother", id: "frag-brother" })
                .createElement(elementType.HTMLDivElement, { innerHTML: "Frag Sister", id: "frag-sister" })
                .appendChild(div("Frag Nephew", { id: "frag-nephew" }));

            frag.appendToParent(this.testArea);

            assert(document.getElementById("frag-brother")!.parentElement === this.testArea, "CreateElementFluent created an element and appendToParent added the fragment content");
            assert(document.getElementById("frag-sister")!.parentElement === this.testArea, "CreateElement created an element and CreateReferencFluent returned reference to fluent object");
            assert(document.getElementById("frag-nephew")!.parentElement === document.getElementById("frag-sister"), "CreateElement returned reference to argument");

            const testViewModel = {
                name: "My Name".toObservable(),
                age: (24).toObservable(),
                observed: true.toObservable(),
                friend: exchangeStudent.toObservable<HTMLElement>(),
                friendsName: function () { return this.friend.value.innerHTML; }
            };

            assert(testViewModel.name instanceof ObservableProperty, "toObservable made simple string an observable");
            assert(testViewModel.age instanceof ObservableProperty, "toObservable made simple number an observable");
            assert(testViewModel.observed instanceof ObservableProperty, "toObservable made simple bool an observable");
            assert(testViewModel.friend instanceof ObservableProperty, "toObservable made object an observable");

            // Now we put it all together. I don't recommend building a full form like this. Someone will need to maintain it.
            // That person might be you. But for adding a single bound element, it could work.

            const form = this.testArea.appendChild(createElement(elementType.HTMLFormElement));
            const name = createElement(elementType.HTMLInputElement, { id: "name" })
                .bindComponent(testViewModel)
                .setValueAttribute("name")
                .addWriteTarget("name")
                .addWriteEvent()
                .observe(testViewModel.name)
                .render()
                .appendToParent(form);
            const age = createElement(elementType.HTMLInputElement, { type: "number", id: "age" })
                .bindComponent(testViewModel.age)
                .setValueAttribute() // defaults to .
                .addWriteTarget() // defaults to .
                .addWriteEvent()
                .observe()
                .render()
                .appendToParent(form);
            const observed = createElement(elementType.HTMLInputElement, { id: "observed" }, { readonly: true })
                .bindComponent(testViewModel)
                .setValueAttribute("observed", true)
                .appendToParent(form);
            const friend = createElement(elementType.HTMLInputElement, { id: "friend" }, { readonly: true })
                .bindComponent(testViewModel)
                .setValueAttribute("friendsName", true)
                .appendToParent(form);

            assert(name.value === "My Name", "Element binding is in place");
            assert(age.value === 24, "Element binding is in place with default attribute");
            assert(document.getElementById('friend')!.getComponent() === friend, "GetComponent gets the component bound");

            this.log(`TEST ${this.viewModel.testNumber}: Begin Async Test`);
            name.value = "Not My Name";
            name.content.dispatchEvent(new Event('input', { bubbles: true }));
            testViewModel.age.value = 25;

            setTimeout(() => {
                assert(age.value === 25, "Two-way binding is reading");
                assert(testViewModel.name.value === "Not My Name", "Two-way binding is writing");
                this.log(`TEST ${this.viewModel.testNumber}: Async Test successful`);
            }, 1000);

            this.log(`TEST ${this.viewModel.testNumber}: Sync Test successful`);
        } catch (err) {
            this.log(err.toString());
        }
    }
}

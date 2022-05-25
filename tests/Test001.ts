import {
    anchor,
    assert,
    button,
    createElement,
    createFragment,
    createHtml,
    deleteNodeContent,
    div,
    e_,
    elementType,
    escapeHtml,
    extractNodeContent,
    paragraph,
    span,
} from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    str?: string;

    constructor() {
        super({
            name: 'Assorted HTML helpers',
            descriptionHtml: `<p>Create various elements using createElement and its related functions div(), span(), etc.
                You can easily create any element using createElement() and then add it using the vanilla JS appendChild().</p>

                <p>A few other assorted HTML helpers are here. Some of these are redundant because pieces of the test bench
            depend on them. But what the hey.</p>`
        });
    }
}

export class Test001 extends TestCaseView<TestViewModel> {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            // Add elements using the createElement helper
            this.testArea.appendChild(createElement("div", { id: 'div1', innerHTML: 'DIV' }));
            test('div1', 'DIV', 'createElement should create div.');

            this.testArea.appendChild(createElement("span", { id: 'span1', innerHTML: 'SPAN' }));
            test('span1', 'SPAN', 'createElement should create span.');

            // Add elements using frequently used element creation helpers. DIV and SPAN can take inner html or an element
            const nestedParagraph = createElement(elementType.HTMLParagraphElement, { id: "divChild", innerHTML: "Nested paragraph" });
            this.testArea.appendChild(div(nestedParagraph, { id: 'divParent' }));
            test('divParent', 'DIV', 'div() helper should create a div');
            assert(!!nestedParagraph, 'Div should be created and appended with appendChild.');
            assert(nestedParagraph.parentElement === this.testArea.querySelector('#divParent'), 'Parent of child should be the target of appendChild');

            this.testArea.appendChild(span('Span helper', { id: 'spanHelper' }));
            test('spanHelper', 'SPAN', 'span() helper should create a span');

            // Other helpers just take inner html
            this.testArea.appendChild(paragraph('Paragraph helper', { id: 'paragraphHelper' }));
            test('paragraphHelper', 'P', 'paragraph() helper should create a p');

            this.testArea.appendChild(anchor('github', 'https://github.com/', { id: 'anchorHelper' }));
            test('anchorHelper', 'A', 'anchor() helper should create an a');
            assert(e_(this.testArea.querySelector('#anchorHelper')).href === 'https://github.com/', 'Anchor href should take the second argument');

            this.testArea.appendChild(button(
                'Click me and nothing will happen',
                { id: 'buttonHelper', style: 'display: block;' },
                { readonly: true }
            ));
            test('buttonHelper', 'BUTTON', 'button() helper should create a button');
            const btn = document.getElementById('buttonHelper');
            if (!btn) { throw new Error('Where did the button go?'); }
            assert(btn.style.display === 'block', 'Style property should set style');
            assert(btn.getAttribute('readonly') === 'true', 'Attributes input should set attributes');

            // Create HTML by providing a raw HTML string
            const foo = 12345;
            this.testArea.appendChild(createHtml(`<p id="rawwr">Element ${foo} created through raw HTML.</p>`));
            test('rawwr', 'P', 'Raw element should create the html element provided');

            // Escape some HTML
            this.viewModel.str = escapeHtml('<br>');
            assert(this.viewModel.str === '&lt;br&gt;', 'escapeHtml() should escape the HTML');

            // Extract content and put it elsewhere
            const fromEle = createHtml('<div><p id="e1">I am some content</p></div>');
            const toEle = div({ id: 'e2' });
            this.testArea.appendChild(fromEle);
            this.testArea.appendChild(toEle);
            const extracted = extractNodeContent(fromEle);
            toEle.appendChild(extracted);

            const tgt1 = document.getElementById('e2');
            if (!tgt1) { throw new Error(); }
            const tgt2 = tgt1.querySelector('#e1');
            assert(!!tgt2, 'extractNodeContent() should remove the html from the source location, and appendChild should add them into the new location.');
            assert(e_(tgt2).innerHTML === 'I am some content', 'The content moved to the new location should match the original content.');

            // Delete content
            const delEle = createHtml('<div><p id="e3">Something that should be deleted</p></div>');
            this.testArea.appendChild(delEle);
            deleteNodeContent(delEle);
            assert(!document.getElementById('e3'), "deleteNodeContent() should remove the html from the source location.");

            // Create a raw document fragment and add it
            const fragment = createFragment(`<p id="rawwr">Fragment created through raw HTML.</p>`);
            this.testArea.appendChild(fragment);
            assert(e_(this.testArea.querySelector('#rawwr')).tagName === 'P', 'Raw fragment should create the html element provided');

            this.log(`TEST ${this.viewModel.testNumber}: Test successful`);

            function test(id: string, tag: string, error: string): void {
                assert(e_(document.getElementById('testArea')!.querySelector('#' + id)).tagName === tag, error);
            }

        } catch (err) {
            this.log(err.toString());
        }
    }
}

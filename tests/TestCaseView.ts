// tslint:disable:max-classes-per-file
import { Component, createElement, div, elementType, IView, paragraph, span } from '../src/Api';

import { ConsoleView } from './TestCaseConsole';
import { TestCaseViewModel } from './TestCaseViewModel';

export abstract class TestCaseView<TViewModel extends TestCaseViewModel = TestCaseViewModel> extends Component<HTMLDivElement> implements IView<HTMLDivElement, TestCaseViewModel> {
    viewModel: TViewModel;
    console: ConsoleView;
    testArea: HTMLDivElement;

    private testAreaHeader: HTMLHeadingElement;
    private toggleId?: number;

    constructor(viewModel: TViewModel) {
        super();
        this.viewModel = viewModel;

        // Multiple ways of appending new components
        this.appendChild(new TestHeader(viewModel));
        this.console = new ConsoleView().appendToParent(this);

        this.testAreaHeader = this.appendChild(createElement(elementType.HTMLHeading2Element, {
            innerHTML: 'Test Area',
            style: 'cursor: pointer;'
        }));

        this.testArea = this.appendChild(div('', { id: 'testArea' }));

        // Need to add a small delay, because this component is added to the DOM by the PageRouter immediately
        // after construction. document.getElementById(), used in many test cases, won't find anything until after
        // the closing brace.
        setTimeout(() => this.testCase(), 150);

        // Make the test area collapsable and collapse it after 3s.
        this.testAreaHeader.addEventListener('click', this.toggleTestArea.bind(this));
        this.toggleId = setTimeout(() => this.toggleTestArea(), 3000);
    }

    log(thing: any): void {
        this.console.log(thing);
    }

    toggleTestArea(evt?: Event) {
        // Don't toggle after user clicks the header
        if (evt && this.toggleId) {
            clearTimeout(this.toggleId);
            this.toggleId = undefined;
        }

        if (this.testArea.style.display !== 'none') {
            this.testArea.style.display = 'none';
            this.testAreaHeader.style.color = 'lightgray';
            this.testAreaHeader.innerHTML = 'Test Area (hidden)';
        } else {
            this.testArea.style.display = 'block';
            this.testAreaHeader.style.color = 'black';
            this.testAreaHeader.innerHTML = 'Test Area';
        }
    }

    abstract testCase(): void;
}

export class TestHeader extends Component {
    constructor(vm: TestCaseViewModel) {
        super();
        if (vm.name) {
            this.appendChild(paragraph(`<h1>Test ${vm.testNumber}: ${vm.name}</h1>`));
        }
        if (vm.description) {
            this.appendChild(span(vm.description));
        }
    }
}

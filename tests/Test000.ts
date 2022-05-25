import { assert } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file

class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Test the TestCase base classes',
            descriptionHtml: `<p>This test case base class runs tests and outputs stuff to the console, which can be
            included in the actual page (so it's not necessary to open the dev tools console, though
            that's still pretty useful).</p>
            <p>If you don't see "Test successful," then it failed, with an error in the log. Hard to
            show the log in the page if the page is broken, so have to check the log after all.</p>`
        });
    }
}

export class Test000 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            let logElement = document.getElementById('consoleLog');
            if (logElement === null) { throw new Error("Rendering failed."); }

            this.console.log("Hello world.");

            // Component rendering is asynchronous (on the microtask queue), so the assert has to be later
            setTimeout(() => {
                try {
                    logElement = document.getElementById('consoleLog');
                    if (logElement === null) { throw new Error("Rendering failed."); }

                    assert(logElement.innerHTML.includes("Hello world."), "Log should update the page.");
                    this.log(`TEST ${this.viewModel.testNumber}: Test successful`);
                } catch (err) {
                    this.log(err.toString());
                }
            }, 100);

        } catch (err) {
            this.log(err.toString());
        }
    }
}

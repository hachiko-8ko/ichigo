import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'NAME',
            descriptionHtml: `<p>Description.</p>`
        });
    }
}

export class TestXXX extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {

        } catch (err) {
            this.log(err.toString());
        }
    }
}

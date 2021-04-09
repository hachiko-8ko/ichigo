import { escapeHtml, Nullable, PageRouter } from '../src/Api';

export abstract class TestCaseViewModel {
    name?: Nullable<string>;
    description?: Nullable<string>;
    testNumber: string;

    constructor({ name, descriptionHtml }: IOptions = {}) {
        this.name = escapeHtml(name);
        this.description = descriptionHtml;
        this.testNumber = PageRouter.params.get('id') || '?';
    }
}

interface IOptions {
    name?: string;
    descriptionHtml?: string;
}

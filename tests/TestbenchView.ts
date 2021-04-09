import { Component, PageRouter } from '../src/Api';

export class TestbenchView extends Component {
    constructor() {
        super({
            id: 'test-bench',
            innerHtml: `<div>
                <a href="#" class="test-link">Previous Test</a>
                <span id="testHeader">Test #0</span>
                <a href="#" class="test-link" data-next="1">Next Test</a>
            </div>
            <br />
            <layout-body></layout-body>`
        });

        const hdr = this.content.querySelector('#testHeader');
        if (hdr) {
            hdr.innerHTML = "Test #" + PageRouter.matchedRoute.params.get('id') || '0';
        }

        // Initialize pager to go through tests.
        for (const l of this.content.querySelectorAll('.test-link')) {
            l.addEventListener('click', this.gotoNextTest.bind(this));
        }
    }

    private gotoNextTest(evt: Event) {
        evt.preventDefault();
        const id = Number(PageRouter.matchedRoute.params.get('id') || '0');
        let nextid;
        if ((evt.currentTarget as HTMLAnchorElement).dataset.next) {
            nextid = id + 1;
            // At the moment, there's exactly one route per test, so we can cheaply know we're at the end
            // even without any configuration for the tests being in this class. This is a cheat, though,
            // because we could easily have added some other routes.
            if (nextid >= PageRouter.allRoutes.length) {
                nextid = 0;
            }
        } else {
            nextid = id - 1;
            if (nextid < 0) {
                nextid = PageRouter.allRoutes.length - 1;
            }
        }

        const hdr = this.content.querySelector('#testHeader');
        if (hdr) {
            hdr.innerHTML = "Test #" + nextid;
        }
        PageRouter.route('test/' + nextid);
    }
}

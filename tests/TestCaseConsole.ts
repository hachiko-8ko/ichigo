import { BoundComponent, Component, isNone, ObservableProxy, ProxiedArray } from '../src/Api';

class ConsoleViewModel {
    output: ProxiedArray<string> = ObservableProxy.proximate([]);
}

// tslint:disable-next-line:max-classes-per-file
export class ConsoleView extends Component<HTMLDivElement>{
    viewModel: ConsoleViewModel;
    entries: BoundComponent<HTMLDivElement, ConsoleViewModel>;
    constructor() {
        super({
            innerHtml: `
                <h2>Log</h2>
                <div id="consoleLog" :loop="output">
                    <div><i-v>.</i-v></div>
                </div>`
        });
        this.viewModel = new ConsoleViewModel();
        this.entries = new BoundComponent<HTMLDivElement, ConsoleViewModel>(this.viewModel, {
            parent: this.content,
            selector: '#consoleLog',
            observeAllViewModel: true
        });
    }

    /**
     * Log to the dev console but also to the output observable, where it can be used for display.
     *
     * @param {*} thing
     * @memberof ConsoleView
     */
    log(thing: any): void {
        // tslint:disable-next-line:no-console
        console.log(thing);
        this.viewModel.output.push(clean(thing));

        function clean(val: any): string {
            if (isNone(val)) {
                return '';
            }
            if (typeof val === 'string') {
                return val;
            }
            return JSON.stringify(val);
        }
    }
}

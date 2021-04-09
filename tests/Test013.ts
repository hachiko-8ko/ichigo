import { assert, DynamicWebWorker } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Dedicated Web Worker (Experimental)',
            descriptionHtml: `<p>This is an experimental web worker that can be created on the fly and dedicated
            to heavy tasks that, assuming the user's PC is powerful enough, be run on background threads without
            impacting front-end performance.</p>

            <p>You can type away in the next input to see that the front end is not being blocked.</p>
            <input style="width: 100%;"/>

            <h2>Usage</h2>
            <p>Pass the task and its arguments to taskStart().then(response => wait for the response);</p>
            `
        });
    }
}

export class Test013 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            function bigCalculation(iter: number, mult: number) {
                const primes = calculatePrimes(iter, mult);
                return primes;

                function calculatePrimes(iterations: number, multiplier: number): number[] {
                    // tslint:disable-next-line:no-shadowed-variable
                    const primes = [];
                    for (let i = 0; i < iterations; i++) {
                        const candidate = i * (multiplier * Math.random());
                        let isPrime = true;
                        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
                            if (candidate % c === 0) {
                                isPrime = false;
                                break;
                            }
                        }
                        if (isPrime) {
                            primes.push(candidate);
                        }
                    }
                    return primes;
                }
            }

            this.log(`Test ${this.viewModel.testNumber}: Test start`);

            let calc: number[] = [];
            const dyn = new DynamicWebWorker();
            dyn.taskStart(bigCalculation, 1000, 1000000000).then(resp => {
                calc = resp;
                // tslint:disable-next-line:no-console
                console.log(resp);
                this.log(resp.length + ' primes calculated');
            }).then(() => {
                assert(calc.length === 1000, 'All the primes were calculated');
                this.log(`Test ${this.viewModel.testNumber}: Test successful`);
            });

        } catch (err) {
            this.log("ERROR: " + err);
            throw err;
        }
    }
}

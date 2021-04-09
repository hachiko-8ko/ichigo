import { assert, e_, paragraph, RepeatablePromise } from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Repeatable Promises',
            descriptionHtml: `
            <h2>Intro</h2>
            <p>The promise is almost like an event emitter, and with the introduction of the DeferredPromise class,
            which allows invocation at a later point in time, this is more true. But there is one thing that makes
            promises inadequate as event emitters: promises can only be resolved once. The resolve once behavior is
            fundamental to the entire concept of the promise.</p>

            <p>But they're so nice, otherwise. The promise API is so useful for chaining asynchronous event handlers,
            and it makes the async/await syntax possible, and as much as I like the promise API, the async/await API
            is far better. You can't have it without promises, though.</p>

            <p>And so the RepeatablePromise was born. The repeatable promise is a fiction that pretends to be a promise
            by showing a similar API. In fact, it is a factory class. Wwhat it does is build a new promise every time you
            call it, which involves a performance hit but is better than nothing it all. Sure, nothing at all is really darn
            fast, but it has a tendency to be useless.</p>

            <h2>Usage</h2>
            <p>Create a new repeatable with "new RepeatablePromise()." The API is as follows:</p>

            <pre>
            class RepeatablePromise {
                constructor(
                    onfulfilled?: (value: any) => PromiseLike,
                    onUnhandledError?: (value: any) => PromiseLike,
                    throwOnUnhandledError: boolean
                );

                then(
                        onfulfilled?: (value: any) => PromiseLike
                    ): this;
                catch(
                        onrejected?: (reason: any) => PromiseLike
                ): this;

                resolve(args?: any): Promise;
                reject(args?: any): Promise;

                build(): DeferredPromise;
            }
            </pre>

            <p>The use of then() and catch() should look very familiar to you if you've used promises before. If it doesn't, google it.</p>

            <p>To invoke the promise, call resolve() on the repeatable promise with whatever args you want to pass it. You can do this as many times as you need to.</p>

            <p>The build() method gives a hint about how the RepeatablePromise class works, as it is a DeferredPromise factory. The build() method is public so that if you want to use it as a promise builder, you can go right on and do it.</p>

            <h3>Construction</h3>

            <p>The repeatable promise takes an optional callback as an input, so that new RepeatablePromise(() => console.log('Got it')) is the same as "new RepeatablePromise().then(() => console.log('Got it'))."</p>

            <p>Promises, except when used in an async/await context, have an issue with unhandled exceptions. In normal code, an unhandled exception throws in the browser console. In promises, an unhandled exception is silently swallowed. The only way of handling this is to include a catch() step, which will force errors to drop to the catch, and all is good ... unless an error is thrown in the catch. Oops. Having the opposite error handling behavior is a flaw in the promise API, so by default, throwOnUnhandledError adds an extra catch onto the very end that throws if the error is unhandled.</p>

            <p>If you want to declare, during construction, a catch block to be called on any unhandled error, you can spedify the onUnhandledError input. This is sugar for promise.then().then().catch(myCallback) (this would have been done in the DeferredPromise if it were possible).</p>

            <h3>Async/await</h3>
            <p>Async/await in javascript is syntactic sugar around promises, so to make this work, you need access to the actual inner promise that is being wrapped in the RepeatablePromise.  This is returned from the resolve method. You can use it like this:</p>

            <pre>
                this.repeatable = new RepeatablePromise().then(() => fetchSomething());
                this.someMethod = function() {
                    const result = await this.repeatable.resolve();
                    setSomethingEqualTo(result);
                }
            </pre>

            <p>Then when something else, such as a mouse-click or the result of some other async operation calls someMethod(), the promise is resolved and acted upon.</p>

            <p>Again, tests are async and will keep running. Wait for tests to complete before leaving page. From this point on, most of
            the test cases are async.</p>
            `
        });
    }
}

export class Test004 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            // The tests for deferred must also work for repeable.

            new RepeatablePromise(() => this.testArea.appendChild(paragraph("Waitable test 1", { id: 'waitTest1' }))).resolve();
            new RepeatablePromise().then(() => this.testArea.appendChild(paragraph("Waitable test 2", { id: 'waitTest2' }))).resolve();

            const waitDefer = new RepeatablePromise().then(() => this.testArea.appendChild(paragraph("Waitable test 3", { id: 'waitTest3' })));
            setTimeout(() => waitDefer.resolve(), 500);

            // Testing errors is hard in a pattern where you don't want to see exceptions
            const none: any = null;
            new RepeatablePromise(() => {
                none.nullReferenceException();
            })
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest1' })))
                .catch(() => this.testArea.appendChild(paragraph("CAUGHT ERROR", { id: 'catchTest1' })))
                .resolve();

            new RepeatablePromise(() => {
                none.nullReferenceException();
            }, null, true)
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest2' })))
                .catch(s => this.testArea.appendChild(paragraph('Automatic message: ' + s.message, { id: 'catchTest2' })))
                .resolve();

            new RepeatablePromise(() => {
                none.nullReferenceException();
            }, null, true)
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest4' })))
                .catch(() => none.nullReferenceException()) // error thrown in catch
                .catch(() => this.testArea.appendChild(paragraph("CAUGHT ERROR IN CATCH", { id: 'catchTest4' })))
                .resolve();

            new RepeatablePromise(() => this.log("This should never be called"))
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'rejectTest1' })))
                .catch(s => this.testArea.appendChild(paragraph("CAUGHT ERROR: " + s, { id: 'rejectTest1' })))
                .reject('REJECTED MANUALLY');

            // This isn't a perfect test because this project is currently generating ES2015, and TSC turns async/await into a generator.
            const waitAsync = new RepeatablePromise(() => "AWAITED");
            // Async/await test
            async function test() {
                const awaited = await waitAsync.resolve();
                document.getElementById('testArea')!.appendChild(paragraph("ASYNC/AWAIT: " + awaited, { id: 'awaitTest1' }));
            }
            setTimeout(() => test(), 0);

            // Tests for repeatable functionality

            let i = 1;
            const repeater1 = new RepeatablePromise(() => {
                this.testArea.appendChild(paragraph("Repeated: " + i, { id: "repeatTest" + i }));
                i++;
            });
            repeater1.resolve();
            repeater1.resolve();

            new RepeatablePromise(() => {
                none.nullReferenceException();
            }, () => this.testArea.appendChild(paragraph("CAUGHT ERROR", { id: 'catchTest7' }))
            )
                .then(() => this.testArea.appendChild(paragraph("FORCED ERROR FAILED", { id: 'catchTest7' })))
                .resolve();

            const repeater3 = new RepeatablePromise().then(() => this.testArea.appendChild(paragraph("Build test", { id: 'repeatTest3' })));
            const wait4 = repeater3.build();
            wait4.resolve();

            this.log('Async test initiated (2 test sets).');

            // Testing async stuff is super annoying
            setTimeout(() => {
                try {
                    // 100ms after creation, waitDefer should not have been invoked.
                    const wait1 = document.getElementById('waitTest3');
                    assert(!wait1, "Waitable should wait before resolution.");

                    this.log(`TEST ${this.viewModel.testNumber}: Test set 1 successful.`);
                } catch (err) {
                    this.log("ERROR: " + err);
                    throw err;
                }
            }, 10);

            setTimeout(() => {
                try {
                    const wait1 = document.getElementById('waitTest1');
                    assert(!!wait1, "Waitable constructor should activate when resolve() called.");
                    const wait2 = document.getElementById('waitTest2');
                    assert(!!wait2, "Waitable then() should activate when resolve called().");
                    const wait3 = document.getElementById('waitTest3');
                    assert(!!wait3, "Deferred should not need to be resolved immediately.");

                    const error1 = document.getElementById('catchTest1');
                    assert(e_(error1).innerHTML === "CAUGHT ERROR", "Catch() should be executed on an error");
                    const error2 = document.getElementById('catchTest2');
                    assert(e_(error2).innerHTML.includes('nullReferenceException'), "Automatic throwOnUnhandledError should be thrown with the default error message text");
                    const error4 = document.getElementById('catchTest4');
                    assert(e_(error4).innerHTML === "CAUGHT ERROR IN CATCH", "throwOnUnhandledError should catch errors thrown in a catch() statement");
                    const error6 = document.getElementById('rejectTest1');
                    assert(e_(error6).innerHTML === "CAUGHT ERROR: REJECTED MANUALLY", "Reject() should force execution of catch() block");

                    const asyncawait = document.getElementById('awaitTest1');
                    assert(e_(asyncawait).innerHTML === "ASYNC/AWAIT: AWAITED", "Async/await() should act as expected (note: implementation varies by TypeScript ES version)");

                    const repeat1 = document.getElementById('repeatTest1');
                    assert(!!repeat1, 'Repeated should execute when resolved');
                    const repeat2 = document.getElementById('repeatTest2');
                    assert(!!repeat2, 'Repeated should execute again when resolved again');
                    const repeat3 = document.getElementById('repeatTest3');
                    assert(!!repeat3, 'Repeated build() should return a deferred, which should be executable');

                    const error7 = document.getElementById('catchTest7');
                    assert(e_(error7).innerHTML === "CAUGHT ERROR", "Catch() 7 should be caught by the general exception handler.");

                    this.log(`TEST ${this.viewModel.testNumber}: Test set 2 successful.`);
                } catch (err) {
                    this.log("ERROR: " + err);
                    throw err;
                }
            }, 1000);

        } catch (err) {
            this.log("ERROR: " + err);
            throw err;
        }
    }
}

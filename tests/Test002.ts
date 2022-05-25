import {
    assert,
    cartesian,
    createElement,
    e_,
    getUniqueId,
    isNone,
    kw,
    Kwarg,
    orderBy,
    range,
    span,
    traverse,
    zip,
} from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Miscellaneous Helpers',
            descriptionHtml: `<p>Various misc helper functions, such as range(), zip(), cartesian(),
            isNone(), and getUniqueId. The biggest thing on this page is the best possible implementation
            of keyword arguments, which isn't quite awful. Keyword arguments are a good compromise between
            quick entry and configurability, while JS's two options are only one or the other.</p>`
        });
    }
}

export class Test002 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            assert(isNone(null), "isNone() should return true for null.");
            assert(isNone(undefined), "isNone() should return for undefined.");
            assert(!isNone("abc"), "isNone() should return false for truthy values.");
            assert(!isNone(""), "isNone() should return false for an empty string (a falsy value).");

            // TODO: The elvis helper is no longer needed in TS (you can use ?.). Except I can't get typescript updated.
            assert(e_(null).something === undefined, "null reference should not throw");
            assert(e_(undefined).something === undefined, "undefined reference should not throw");

            const z = zip(['a', 'b', 'c'], ['d', 'e']);
            this.log(z);
            assert(z[0][0] === 'a', 'zip() should combine element 0 from both arrays');
            assert(z[0][1] === 'd', 'zip() should combine element 0 from both arrays');
            assert(z[2][0] === 'c', 'zip() should combine element 1 from both arrays');
            assert(z[2][1] === undefined, "If an array isn't long enough, undefined should be used.");

            const c = cartesian(['a', 'b', 'c'], ['d', 'e']);
            this.log(c);
            assert(c[0][0] === 'a', 'cartesian() should combine element 0 from both arrays');
            assert(c[0][1] === 'd', 'cartesian() should combine element 0 from both arrays');
            assert(c[1][0] === 'a', 'cartesian() should combine element 0 from array 1 and element 1 from array 2');
            assert(c[1][1] === 'e', 'cartesian() should combine element 0 from array 1 and element 1 from array 2');
            assert(c[2][0] === 'b', 'cartesian() should combine element 1 from array 1 and element 0 from array 2');
            assert(c[2][1] === 'd', 'cartesian() should combine element 1 from array 1 and element 0 from array 2');
            assert(c[3][0] === 'b', 'cartesian() should combine element 1 from both arrays');
            assert(c[3][1] === 'e', 'cartesian() should combine element 1 from both arrays');

            const r = range(10);
            this.log(r);
            assert(r.length === 10, 'range() should create a range with the length given');
            assert(r[0] === 0, 'range() should start at 0');
            assert(r[9] === 9, 'range() should end at length - 1');

            const t = Array.from([...traverse([0, 1, 2, [3, 4], [5, [6, 7, [8]]], 9])]);
            this.log(t);
            assert(t[0] === 0, 'traverse() should start at the first item in the nested array');
            assert(t[9] === 9, 'traverse() should end at the last item in the nested array (not the deepest)');

            // This is not an exhaustive test, but that would be impossible.
            const id1 = getUniqueId();
            const id2 = getUniqueId();
            assert(id1 !== id2, "getUniqueId() should not produce the same id twice");

            const sortMe = ['a', 'Z', 'B', 'x', 'c', 'Y'];
            sortMe.sort(orderBy(a => a.toUpperCase()));
            this.log(sortMe);
            assert(JSON.stringify(sortMe) === '["a","B","c","x","Y","Z"]', "orderBy can be used to sort an array");

            // Assertion helper for the next test
            let assertYourself: string = "";
            const log = (arg: string) => {
                // tslint:disable-next-line:no-console
                console.log(arg);
                this.testArea.appendChild(span(arg));
                this.testArea.appendChild(createElement('br'));
                assertYourself += arg;
            };

            // And now, the main event....

            // Keyword arguments in JS.
            // It isn't as clean in TS but can be made to work.

            // Functions can be called using keyword arguments using the kw() function. For instance, consider the following function:

            function parrot(voltage: number | string, state = 'a stiff', action = 'voom', type = 'Norwegian Blue'): void {
                // Three redundant items here.
                // This redundantly has to list the parameters (in JS, a simple copy/paste from above) at the start.
                // It then has to list the parameters again, on the right.
                // On the left, the default values need to be repeated.
                // This sucks but it's the cleanest I can get in JS. If the reflection were a little better, I could do more.
                ({ voltage, state = 'a stiff', action = 'voom', type = 'Norwegian Blue' } = Kwarg.parseArgs({ voltage, state, action, type }));

                assertYourself = ""; // Clear the test assertion.
                log("-- This parrot wouldn't " + action + " ");
                log("if you put " + voltage + " volts through it.");
                log("-- Lovely plumage, the " + type);
                log("-- It's " + state + "!");
                log('---------------------------------------');
            }

            // Parrot() could be called in any of the following ways:
            // (The function kw() takes an one-key object, a 2 element array, or a string and a value.)

            parrot(1000);
            assert(assertYourself.includes('put 1000 volts'), "Normal JS positional arguments work as usual");

            parrot(kw({ action: 'VOOOOOM' }), kw('voltage', 1000000));
            assert(assertYourself.includes("wouldn't VOOOOOM") && assertYourself.includes("put 1000000 volts"), "Keyword arguments can be used and can be specified as one-key objects or as two arguments");

            parrot('a thousand', kw(['state', 'pushing up the daisies']));
            assert(assertYourself.includes("It's pushing up the daisies!") && assertYourself.includes("put a thousand volts"), "Keyword arguments can be combined with positional arguments and tuple keyword arguments can be used");

            parrot('a million', 'bereft of life', 'jump');
            assert(assertYourself.includes("It's bereft of life!") && assertYourself.includes("put a million volts") && assertYourself.includes("parrot wouldn't jump"), "Multiple positional arguments can be filled");

            // The following 3 cases would be invalid:
            // parrot();                                                // required argument missing caught in Typescript
            //                                                          JS is fine with an undefined argument so don't ask it for help.
            // parrot(kw({ voltage: 110 }), kw({ voltage: 220 }));      // duplicate keyword
            // parrot(kw({ actor: 'John Cleese' }));                    // unknown keyword (control with allowUnknownKeyword)

            // The following are valid but you really shouldn't do them, as they are bad practice.
            // It's not possible to catch them as errors, though. It's based on info unknown to JavaScript (specifically, argument details).

            parrot(kw({ voltage: 5.0 }), 'dead');           // non-keyword argument following keyword
            // This works as written, but it's ugly. Code has no idea about order of arguments so cannot trap it.

            parrot(kw({ type: 'Finnish Pink' }), 'dead');   // non-keyword argument following keyword
            // This passes undefined for voltage, because that slot has a keyword in it.
            // Code has no idea about order of arguments so cannot trap it.

            parrot(110, kw({ voltage: 220 }));              // duplicate value for argument
            // The later keyword overrides the non-keyword argument.
            // If the function has defaults in the header, throwing would cause unexpected exceptions on valid code.
            // Code cannot tell if an argument's value is a default set by JS (fine) or a user value (bad), so can't trap the bad case.

            // When Kwargs.parseArgs() is called, a property named $$kw$$ receives an object containing all keyword arguments except for
            // those corresponding to a formal parameter. But if allowUnknownKeyword is false, an error is thrown instead.

            // When Kwargs.parseArgs() is called with rest parameters included in the argument list, a property named $rest$ contains the
            // non-keyword rest arguments. Note that there is no way to indicate in the function signature that keyword
            // arguments are allowed to be included in the rest paramete, so they arer.
            // In JS, rest parameters must appear last.

            function cheeseshop(kind: string, ...rest: string[]) {
                let $rest$;
                let $$kw$$;
                ({ kind, $rest$, $$kw$$ } = Kwarg.parseArgs({ kind, ...rest }, true));
                log('-- Do you have any ' + kind + '?');
                log("-- I'm sorry, we're all out of " + kind);
                for (const arg of $rest$) {
                    log(arg);
                }
                log('------');
                for (const kwvar of Object.getOwnPropertyNames($$kw$$)) {
                    log(kwvar + ' : ' + $$kw$$[kwvar]);
                }
                log('---------------------------------------');
            }

            // It could be called like this:
            cheeseshop("Limburger", "It's very runny, sir.", "It's really very, VERY runny, sir.",
                kw({ shopkeeper: "Michael Palin" }),
                kw({ client: "John Cleese" }),
                kw({ sketch: "Cheese Shop Sketch" }));

            assert(assertYourself.includes("Do you have any Limburger?") && assertYourself.includes("It's very runny, sir.") && assertYourself.includes("It's really very, VERY runny, sir.") && assertYourself.includes("sketch : Cheese Shop Sketch"), "Rest arguments ($rest$, acts like *args) and rest keyword arguments ($$kw$$, acts like **kw) can be used");

            // Arbitrary argument lists are supported in JavaScript by ...rest parameters, so do not need special handling.
            // Note that rest parameters MUST be the final argument, so while it is have keyword arguments, it isn't possible
            // to indicate in the function definition that arbitrary keyword arguments are allowed.
            // These lists can be unpacked by the ...spread operator, so again, does not need special handling.

            // In the same fashion, objects can deliver keyword arguments with the ...spread operator and the Kwarg.unpack() function:
            const dict = { action: "VOOM", voltage: "four million", state: "bleedin' demised" };

            // This kind of TypeScript coercion is needed when there is one or more required parameters. It is NOT pretty.
            // On stack overflow, there are several ways given to indicate min-length arrays. NONE are valid TS.
            // In pure JS, these two lines are just parrot(...Kwarg.unpack(dict));
            const unpacked = Kwarg.unpack(dict);
            parrot(unpacked[0], ...unpacked.slice(1));
            assert(assertYourself.includes("This parrot wouldn't VOOM") && assertYourself.includes("put four million volts") && assertYourself.includes("It's bleedin' demised!"), "Objects can be unpacked into separate keyword arguments using Kwarg.unpack");

            this.log(`TEST ${this.viewModel.testNumber}: Test successful`);

        } catch (err) {
            this.log(err.toString());
        }
    }
}

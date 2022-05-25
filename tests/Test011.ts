import {
    assert,
    BoundComponent,
    Component,
    createElement,
    createHtml,
    DeferredPromise,
    delay,
    div,
    elementType,
    ExistingLookupBindingOptions,
    InnerHtmlBindingOptions,
    IObservable,
    kw,
    ObservableProxy,
} from '../src/Api';
import { TestCaseView } from './TestCaseView';
import { TestCaseViewModel } from './TestCaseViewModel';

// tslint:disable:max-classes-per-file
class TestViewModel extends TestCaseViewModel {
    constructor() {
        super({
            name: 'Complete Bound Component Examples',
            descriptionHtml: `<p>Part two: more of the same.</p>
            <p>BoundComponents are pretty complex and have lots of options. So much that I'm splitting it up into 2 test cases. And
            to be honest, the first test case is really really long.</p>

            <p>Why are bound components so large (in terms of functionality ... the class is only 800 lines)? Why do they have so many
            options? Well, everyone has a different way of developing, and I don't want to push anyone into 'My Way' ... this isn't Angular
            or something. Especially since My Way changes depending on the project and sometimes the specific functionality. Sometimes
            (usually) a web server pushes the HTML and CSS and the JS just adds on to that. Sometimes, it's an SPA and everything is
            produced in JS. Sometimes I'm building a component that's getting injected into a completely different page.</p>

            <p>There are different ways to do each of these. Interaction with the DOM may be based on a lot of document.getElementById()
            calls. Or it may involve a lot of document.createElement. And even in the latter case, that could involve creating each
            individual elements or pushing a blob of HTML into innerHTML. It all depends.</p>

            <p>This test case implements a VERY simplistic chat component in a variety of different ways, using different features of
            the class in each case.</p>

            <p>I totally do not want to spend the time writing up a serious stylesheet for this, much less pulling in bootstrap, so this
            will look as primitive as heck.</p>

            <h2>Warning</h2>
            <p>Tests are async and will keep running. Wait for tests to complete before leaving page.</p>
            `
        });
    }
}

export class Test011 extends TestCaseView {
    constructor() {
        super(new TestViewModel());
    }

    testCase(): void {
        try {
            // Set up common tests for all these identical components, which are all the same thing, just constructed in different ways.
            // Testing this stuff asynchronously is super difficult, though. Normally with a user, you'd make a change, test it, then continue.
            const asyncAsserts = new DeferredPromise(delay(1000), true);
            function testMessage1(view: any): void {
                const fromelement = view.content.querySelector('input.chat-from')!;
                const subelement = view.content.querySelector('input.chat-subject')!;
                const msgelement = view.content.querySelector('textarea.chat-message')!;
                const btn = view.content.querySelector('button.chat-submit')!;

                fromelement.value = view.constructor.name;
                fromelement.dispatchEvent(new Event('input', { bubbles: true }));
                subelement.value = "Hello";
                subelement.dispatchEvent(new Event('input', { bubbles: true }));
                msgelement.value = "Every client is adding the same message.";
                msgelement.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(() => btn.click(), 50);
            }
            function testMessage2(view: any): void {
                const fromelement = view.content.querySelector('input.chat-from')!;
                const subelement = view.content.querySelector('input.chat-subject')!;

                fromelement.value = 'John Smith on behalf of ' + view.constructor.name;
                fromelement.dispatchEvent(new Event('input', { bubbles: true }));
                subelement.value = 'Your assistance is needed';
                subelement.dispatchEvent(new Event('input', { bubbles: true }));
            }
            function testComponent(view: any): void {
                testMessage1(view);
                setTimeout(() => testMessage2(view), 500);
            }
            function assertComponent(view: any, list: any): void {
                assert(view.content.querySelector('div.chat-closing').innerHTML.includes('John Smith'), 'From field updates closing: ' + view.constructor.name);
                assert(!view.content.querySelector('input.chat-from').classList.toString().includes('red'), 'Class switch removed when from filled: ' + view.constructor.name);

                const subelement = view.content.querySelector('div.chat-subject-display')!;
                assert(subelement.innerHTML.includes('Your assistance is needed'), 'Subject display updated by subject field: ' + view.constructor.name);
                assert(subelement.style.display !== 'none', 'i5_if allows hidden field to become visible: ' + view.constructor.name);

                assert(view.content.querySelector('textarea.chat-message').classList.toString().includes('red'), 'Class switch added when no message: ' + view.constructor.name);
                assert(view.content.querySelector('button.chat-submit').hasAttribute('disabled'), 'Disabled boolean attribute added when no message: ' + view.constructor.name);

                assert(list.chats.length === 6, 'Chats were added to the viewmodel during each chat submit');
            }

            class ChatViewModel {
                id = 1;
                created = new Date();

                fromName = 'Anonymous';
                subject = '';
                message = '';
                closing = 'I look forward to hearing from you and I remain meanwhile,';

                constructor(chat?: Partial<ChatViewModel>) {
                    if (chat) {
                        Object.assign(this, chat);
                    }
                }

                stripped(): string {
                    return `${this.message} ${this.closing} ${this.fromName}`.replace(/[\r\n]/g, '');
                }

                invalid(): boolean {
                    return !this.subject || !this.message || !this.fromName;
                }
            }

            class ChatListViewModel {
                chats = ObservableProxy.proximate<ChatViewModel[]>([]);

                constructor() {
                    this.getNewChats()
                        .then(newChats => this.chats.push(...newChats));
                }

                beginChat(): ChatViewModel & IObservable {
                    return ObservableProxy.proximate(this._newChat());
                }

                addChat(chat: ChatViewModel): Promise<ChatViewModel> {
                    return this.upload(chat)
                        .then(resp => this.getNewChats(chat))
                        .then(newChats => this.chats.push(...newChats))
                        .then(() => this._newChat());
                }

                getNewChats(chat?: ChatViewModel): Promise<ChatViewModel[]> {
                    if (chat) {
                        // It's important that we not add a reference to the working copy. If this were to be
                        // pulled down from a service, it would be a new object.
                        return Promise.resolve('Imagine a fetch request here').then(() => [new ChatViewModel(chat)]);
                    }
                    return Promise.resolve([]);
                }

                private _newChat(): ChatViewModel {
                    const maxId = (this.chats[this.chats.length - 1] || { id: 0 }).id;
                    return new ChatViewModel({
                        id: maxId,
                        created: new Date(), // tho normally created would be the date the message hit the server
                        fromName: 'Anonymous',
                        subject: '',
                        message: ''
                    });
                }
                private upload(chat: ChatViewModel): Promise<any> {
                    return Promise.resolve('Imagine a fetch request here');
                }
            }

            // For fun, we'll let all our different tests interact with the same view model.
            // But we'll arrange so that they give each component its own current working object.
            const chatlist = new ChatListViewModel();

            // This is a pretty cheap way to produce an inline stylesheet but it works and it doesn't even make dupes.
            // I don't like how scoped stylesheets got removed from the standard, though, forcing weird selectors.
            document.head.appendChild(createElement(elementType.HTMLStyleElement, {
                id: 'chat-stylesheet',
                innerHTML: `
                    .chat-example {
                        border: 3px solid black;
                        width: 75vw;
                    }
                    /* Probably wouldn't be used in a real test, but for this test, works as emphasis. */
                    .chat-example .component:hover {
                        background-color: gold;
                        transition: ease-in-out background-color 1s;
                    }
                    .chat-example .chat-subject-display {
                        background: powderblue;
                        border: 2px solid blue;
                        border-radius: 4px;
                        font-weight: bold;
                    }
                    .chat-example .chat-submit {
                        margin-right: 0;
                        margin-left: auto;
                        display: block;
                    }
                    .chat-example input,textarea {
                        width: 50vw;
                    }
                    .chat-example .red {
                        background: salmon;
                    }
            `}));

            // The first example is your traditional ES6 approach, with full HTML being provided by a web server somewhere,
            // then with logic layered on top in JS. The default BoundComponent will be used, as there's no functionality
            // to be overridden with custom logic.
            const example1html = `
                <div id="chat-example1" class="chat-example">
                    <h4>Example 1</h4> <!-- Misusing heading tags by jumping to H4-->
                    <div :loop="chats" class="component chat-list">
                        <div>
                            <div>#<i-v>id</i-v> From:<i-v>fromName</i-v> at <i-v>created</i-v>. <i-v>subject</i-v></div>
                            <div><i-v>stripped</i-v></div>
                        </div>
                    </div>
                    <br />
                    <div class="chat-editor">
                        <form :event (submit)="submit">
                            <div class="component chat-subject-display" :text="subject" :if="subject"></div>
                            <div>
                                <span>From:</span>
                                <input class="component chat-from" :input:="fromName" :switch-:red="fromName" />
                            </div>
                            <div>
                                <span>Subject:</span>
                                <input class="component chat-subject" :input:="subject" :switch-:red="subject" />
                            </div>
                            <div>
                                <textarea class="component chat-message" :input:="message" :switch-:red="message"></textarea>
                            </div>
                            <div class="component chat-closing">
                                <i-v>closing</i-v> <br />
                                <i-v>fromName</i-v>
                            </div>
                            <button class="component chat-submit" type="submit" :bool:disabled="invalid">Submit</button>
                        </form>
                    </div>
                </div>
            `;
            // This is where the "web server" returns a static page
            this.testArea.appendChild(createHtml(example1html));

            class ChatView1 extends Component<HTMLDivElement> {
                viewModel: ChatListViewModel;
                current: ChatViewModel;
                // These properties are strictly not necessary since everything is wired in the constructor but it's a good practice.
                list: BoundComponent<HTMLDivElement, ChatListViewModel>;
                editor: {
                    subjectDisplay: BoundComponent<HTMLDivElement, ChatViewModel>,
                    subject: BoundComponent<HTMLInputElement, ChatViewModel>,
                    from: BoundComponent<HTMLInputElement, ChatViewModel>,
                    message: BoundComponent<HTMLTextAreaElement, ChatViewModel>,
                    closing: BoundComponent<HTMLDivElement, ChatViewModel>,
                    button: BoundComponent<HTMLButtonElement, ChatViewModel>
                };

                constructor(viewModel: ChatListViewModel) {
                    super({ selector: '#chat-example1' });
                    this.viewModel = viewModel;
                    this.current = this.viewModel.beginChat();

                    this.list = new BoundComponent<HTMLDivElement>(this.viewModel, new ExistingLookupBindingOptions({ parent: this.content, selector: '.chat-list' }))
                        .observe(this.viewModel.chats);

                    this.editor = {
                        subjectDisplay: new BoundComponent(this.current,
                            new ExistingLookupBindingOptions({ parent: this.content, selector: '.chat-subject-display', observeViewModel: true })),
                        subject: new BoundComponent(this.current,
                            new ExistingLookupBindingOptions({ parent: this.content, selector: '.chat-subject', observeViewModel: true })),
                        from: new BoundComponent(this.current,
                            new ExistingLookupBindingOptions({ parent: this.content, selector: '.chat-from', observeViewModel: true })),
                        message: new BoundComponent(this.current,
                            new ExistingLookupBindingOptions({ parent: this.content, selector: '.chat-message', observeViewModel: true })),
                        closing: new BoundComponent(this.current,
                            new ExistingLookupBindingOptions({ parent: this.content, selector: '.chat-closing', observeViewModel: true })),
                        button: new BoundComponent(this.current,
                            new ExistingLookupBindingOptions({ parent: this.content, selector: '.chat-submit', observeViewModel: true }))
                    };

                    this.addInlineEventListeners();
                }
                submit(evt: Event): void {
                    evt.preventDefault();
                    this.viewModel.addChat(this.current)
                        .then(newchat => {
                            Object.assign(this.current, newchat);
                        })
                        // tslint:disable-next-line:no-console
                        .catch(err => console.error(err));
                }
            }

            const example1View = new ChatView1(chatlist);

            testComponent(example1View);
            asyncAsserts.then(() => assertComponent(example1View, chatlist));

            // Now that was a bit verbose, but it's a good match for the developer who wants to control everything and track
            // every component in the view, or doesn't have a lot of identical components. It does involve a workout for the control-V key.
            // But most, when faced by so much code duplication, would go with something like example 2, which uses the inject method.
            // This one can work with the same HTML provided by the web server.
            class ChatView2 extends Component<HTMLDivElement> {
                viewModel: ChatListViewModel;
                current: ChatViewModel;
                // These properties are strictly not necessary since everything is wired in the constructor but it's a good practice.
                list: BoundComponent<HTMLDivElement, ChatListViewModel>;
                components: Array<BoundComponent<HTMLElement, ChatViewModel>>;

                constructor(viewModel: ChatListViewModel) {
                    super({ selector: '#chat-example2' });
                    this.viewModel = viewModel;
                    this.current = this.viewModel.beginChat();

                    this.list = BoundComponent.inject<HTMLDivElement, ChatListViewModel>('#chat-example2 .chat-list', kw('viewModel', this.viewModel))[0]
                        .observe(this.viewModel.chats);

                    // Inject all chat entry components in one go
                    this.components = BoundComponent.inject('#chat-example2 .chat-editor .component', { observeViewModel: true }, kw('viewModel', this.current));

                    this.addInlineEventListeners();
                }
                submit(evt: Event): void {
                    evt.preventDefault();
                    this.viewModel.addChat(this.current)
                        .then(newchat => {
                            Object.assign(this.current, newchat);
                        })
                        // tslint:disable-next-line:no-console
                        .catch(err => console.error(err));
                }
            }

            const example2html = example1html.replace('example1', 'example2').replace('Example 1', 'Example 2');
            this.testArea.appendChild(createHtml(example2html));
            const example2View = new ChatView2(chatlist);

            testComponent(example2View);
            asyncAsserts.then(() => assertComponent(example2View, chatlist));

            // Some people don't like the DIV soup that makes up most HTML. It makes more sense to have custom elements that say
            // what they are. It is these people who are giving us web components (which are a neat idea if they can get them working)
            // (though in most cases it would increase my workload many times).  It is to support this style of developing that I wrote
            // the inject() method for. You can write HTML that looks like it's truly componentized.
            // It takes a LOT of classes, however, and is overkill for an example this simple.
            class ChatList3 extends BoundComponent<HTMLDivElement, ChatListViewModel> {
                // I'd like to call this inject, but TS's restrictions on override naming forces me to avoid the friendliest names.
                static add(viewModel: ChatListViewModel, parentId: string): ChatList3 {
                    // Generics are the wordiest things in typescript
                    return this.inject<HTMLDivElement, ChatListViewModel>(`${parentId} chat-list`, { replace: true }, kw('viewModel', viewModel))[0];
                }
                constructor(viewModel: ChatListViewModel) {
                    super(viewModel, {
                        outerHtml: `
                        <div :loop="chats" class="component chat-list">
                            <div>
                                <div>#<i-v>id</i-v> From:<i-v>fromName</i-v> at <i-v>created</i-v>. <i-v>subject</i-v></div>
                                <div><i-v>stripped</i-v></div>
                            </div>
                        </div>`,
                        observeTargets: [viewModel.chats]
                    });
                }
            }

            class ChatSubjectDisplay3 extends BoundComponent<HTMLDivElement, ChatViewModel> {
                static add(viewModel: ChatViewModel, parentId: string): ChatSubjectDisplay3 {
                    return this.inject<HTMLDivElement, ChatViewModel>(`${parentId} chat-subject-display`, { replace: true }, kw('viewModel', viewModel))[0];
                }
                constructor(viewModel: ChatViewModel) {
                    super(viewModel, {
                        outerHtml: `<div class="component chat-subject-display" :text="subject" :if="subject"></div>`,
                        observeViewModel: true
                    });
                }
            }

            class ChatSubject3 extends BoundComponent<HTMLInputElement, ChatViewModel> {
                static add(viewModel: ChatViewModel, parentId: string): ChatSubject3 {
                    // We can use component (not bound component) injection to fill out static text, like labels.
                    const injected = Component.inject<HTMLDivElement>(`${parentId} chat-subject`, `
                        <div>
                            <span>Subject:</span>
                            <input class="component chat-subject" :input:="subject" :switch-:red="subject" />
                        </div>
                        `)[0];
                    return new ChatSubject3(viewModel, { parent: injected.content, selector: 'input', observeViewModel: true });
                }
            }

            class ChatFrom3 extends BoundComponent<HTMLInputElement, ChatViewModel> {
                static add(viewModel: ChatViewModel, parentId: string): ChatFrom3 {
                    const injected = Component.inject<HTMLDivElement>(`${parentId} chat-from`, `
                        <div>
                            <span>From:</span>
                            <input class="component chat-from" :input:="fromName" :switch-:red="fromName" />
                        </div>
                        `)[0];
                    return new ChatFrom3(viewModel, { parent: injected.content, selector: 'input', observeViewModel: true });
                }
            }

            class ChatMessage3 extends BoundComponent<HTMLTextAreaElement, ChatViewModel> {
                static add(viewModel: ChatViewModel, parentId: string): ChatMessage3 {
                    const injected = Component.inject<HTMLDivElement>(`${parentId} chat-message`, `
                        <div>
                            <textarea class="component chat-message" :input:="message" :switch-:red="message"></textarea>
                        </div>
                        `)[0];
                    return new ChatMessage3(viewModel, { parent: injected.content, selector: 'textarea', observeViewModel: true });
                }
            }

            class ChatClosing3 extends BoundComponent<HTMLDivElement, ChatViewModel> {
                static add(viewModel: ChatViewModel, parentId: string): ChatClosing3 {
                    return this.inject<HTMLDivElement, ChatViewModel>(`${parentId} chat-closing`, { replace: true }, kw('viewModel', viewModel))[0];
                }
                constructor(viewModel: ChatViewModel) {
                    super(viewModel, {
                        outerHtml: `
                            <div class="component chat-closing">
                                <i-v>closing</i-v> <br />
                                <i-v>fromName</i-v>
                            </div>`,
                        observeViewModel: true
                    });
                }
            }

            class ChatSubmit3 extends BoundComponent<HTMLButtonElement, ChatViewModel> {
                static add(viewModel: ChatViewModel, parentId: string): ChatSubmit3 {
                    return this.inject<HTMLButtonElement, ChatViewModel>(`${parentId} chat-submit`, { replace: true }, kw('viewModel', viewModel))[0];
                }
                constructor(viewModel: ChatViewModel) {
                    super(viewModel, {
                        outerHtml: `<button class="component chat-submit" type="submit" :bool:disabled="invalid">Submit</button>`,
                        observeViewModel: true
                    });
                }
            }

            class ChatView3 extends Component<HTMLDivElement> {
                viewModel: ChatListViewModel;
                current: ChatViewModel;
                // These properties are strictly not necessary since everything is wired in the constructor but it's a good practice.
                list: ChatList3;
                editor: {
                    subjectDisplay: ChatSubjectDisplay3,
                    subject: ChatSubject3,
                    from: ChatFrom3,
                    message: ChatMessage3,
                    closing: ChatClosing3,
                    button: ChatSubmit3
                };

                constructor(viewModel: ChatListViewModel) {
                    const parentId = '#chat-example3';
                    super({ selector: parentId });

                    this.viewModel = viewModel;
                    this.current = this.viewModel.beginChat();

                    this.list = ChatList3.add(this.viewModel, parentId);
                    this.editor = {
                        subjectDisplay: ChatSubjectDisplay3.add(this.current, parentId),
                        subject: ChatSubject3.add(this.current, parentId),
                        from: ChatFrom3.add(this.current, parentId),
                        message: ChatMessage3.add(this.current, parentId),
                        closing: ChatClosing3.add(this.current, parentId),
                        button: ChatSubmit3.add(this.current, parentId)
                    };

                    this.addInlineEventListeners();
                }
                submit(evt: Event): void {
                    evt.preventDefault();
                    this.viewModel.addChat(this.current)
                        .then(newchat => {
                            Object.assign(this.current, newchat);
                        })
                        // tslint:disable-next-line:no-console
                        .catch(err => console.error(err));
                }
            }

            // This is where the "web server" returns a static page
            const example3html = `
            <div id="chat-example3" class="chat-example">
                <h4>Example 3</h4> <!-- Misusing heading tags by jumping to H4-->
                <chat-list></chat-list>
                <br />
                <div class="chat-editor">
                    <form :event (submit)="submit">
                        <chat-subject-display></chat-subject-display>
                        <chat-from></chat-from>
                        <chat-subject></chat-subject>
                        <chat-message></chat-message>
                        <chat-closing></chat-closing>
                        <chat-submit></chat-submit>
                    </form>
                </div>
            </div>
            `;
            this.testArea.appendChild(createHtml(example3html));
            const example3View = new ChatView3(chatlist);

            testComponent(example3View);
            asyncAsserts.then(() => assertComponent(example3View, chatlist));

            // It's not necessary to use custom tags. You can get similar HTML while keeping things vanilla and doing most of the work
            // on the JS side. This example will avoid using injection.  That makes things more verbose.
            class ChatList4 extends BoundComponent<HTMLDivElement, ChatListViewModel> {
                constructor(viewModel: ChatListViewModel, parent: HTMLDivElement) {
                    super(viewModel, {
                        element: parent.querySelector<HTMLDivElement>('.chat-list')!,
                        properties: {
                            innerHTML: `
                            <div>
                                <div>#<i-v>id</i-v> From:<i-v>fromName</i-v> at <i-v>created</i-v>. <i-v>subject</i-v></div>
                                <div><i-v>stripped</i-v></div>
                            </div>`
                        },
                        attributes: {
                            i5_loop: "chats"
                        },
                        observeTargets: [viewModel.chats]
                    });
                }
            }

            class ChatSubjectDisplay4 extends BoundComponent<HTMLDivElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel, parent: HTMLDivElement) {
                    super(viewModel, {
                        element: parent.querySelector<HTMLDivElement>('.chat-subject-display')!,
                        attributes: {
                            i5_text: "subject",
                            i5_if: "subject"
                        },
                        observeViewModel: true
                    });
                }
            }

            class ChatSubject4 extends BoundComponent<HTMLInputElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel, parent: HTMLDivElement) {
                    // Because this has wrapper HTML, we need to add it first.
                    // As long as we don't reference this, we can do it before the super() call.
                    const wrapper = div(`
                            <span>Subject:</span>
                            <input class="component chat-subject" :input:="subject" :switch-:red="subject" />
                    `);
                    parent.querySelector('.chat-subject')!.appendChild(wrapper);

                    super(viewModel, {
                        element: wrapper.querySelector<HTMLInputElement>('input')!,
                        observeViewModel: true
                    });
                }
            }

            class ChatFrom4 extends BoundComponent<HTMLInputElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel, parent: HTMLDivElement) {
                    // Again, wrapper HTML
                    const wrapper = div(`
                        <span>From:</span>
                        <input class="component chat-from" :input:="fromName" :switch-:red="fromName" />
                    `);
                    parent.querySelector('.chat-from')!.appendChild(wrapper);

                    super(viewModel, {
                        element: wrapper.querySelector<HTMLInputElement>('input')!,
                        observeViewModel: true
                    });
                }
            }

            class ChatMessage4 extends BoundComponent<HTMLTextAreaElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel, parent: HTMLDivElement) {
                    // Again, wrapper HTML
                    const wrapper = div(`
                        <textarea class="component chat-message" :input:="message" :switch-:red="message"></textarea>
                    `);
                    parent.querySelector('.chat-message')!.appendChild(wrapper);

                    super(viewModel, {
                        element: wrapper.querySelector<HTMLTextAreaElement>('textarea')!,
                        observeViewModel: true
                    });
                }
            }

            class ChatClosing4 extends BoundComponent<HTMLDivElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel, parent: HTMLDivElement) {
                    super(viewModel, {
                        element: parent.querySelector<HTMLDivElement>('.chat-closing')!,
                        properties: {
                            innerHTML: `
                                <i-v>closing</i-v> <br />
                                <i-v>fromName</i-v>`
                        },
                        observeViewModel: true
                    });
                }
            }

            class ChatSubmit4 extends BoundComponent<HTMLButtonElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel, parent: HTMLDivElement) {
                    super(viewModel, {
                        element: parent.querySelector<HTMLButtonElement>('.chat-submit')!,
                        attributes: {
                            type: 'submit',
                            i5_bool_disabled: 'invalid'
                        },
                        observeViewModel: true
                    });
                }
            }

            class ChatView4 extends Component<HTMLDivElement> {
                viewModel: ChatListViewModel;
                current: ChatViewModel;
                // These properties are strictly not necessary since everything is wired in the constructor but it's a good practice.
                list: ChatList4;
                editor: {
                    subjectDisplay: ChatSubjectDisplay4,
                    subject: ChatSubject4,
                    from: ChatFrom4,
                    message: ChatMessage4,
                    closing: ChatClosing4,
                    button: ChatSubmit4
                };

                constructor(viewModel: ChatListViewModel) {
                    super({ selector: '#chat-example4' });

                    this.viewModel = viewModel;
                    this.current = this.viewModel.beginChat();

                    this.list = new ChatList4(this.viewModel, this.content);

                    this.editor = {
                        subjectDisplay: new ChatSubjectDisplay4(this.current, this.content),
                        subject: new ChatSubject4(this.current, this.content),
                        from: new ChatFrom4(this.current, this.content),
                        message: new ChatMessage4(this.current, this.content),
                        closing: new ChatClosing4(this.current, this.content),
                        button: new ChatSubmit4(this.current, this.content),
                    };

                    this.addInlineEventListeners();
                }
                submit(evt: Event): void {
                    evt.preventDefault();
                    this.viewModel.addChat(this.current)
                        .then(newchat => {
                            Object.assign(this.current, newchat);
                        })
                        // tslint:disable-next-line:no-console
                        .catch(err => console.error(err));
                }
            }

            // This is where the "web server" returns a static page
            const example4html = `
            <div id="chat-example4" class="chat-example">
                <h4>Example 4</h4> <!-- Misusing heading tags by jumping to H4-->
                <div class="component chat-list"></div>
                <br />
                <div class="chat-editor">
                    <form :event (submit)="submit">
                        <div class="component chat-subject-display"></div>
                        <div class="chat-from"></div>
                        <div class="chat-subject"></div>
                        <div class="chat-message"></div>
                        <div class="component chat-closing"></div>
                        <button class="component chat-submit">Submit</button>
                    </form>
                </div>
            </div>
            `;
            this.testArea.appendChild(createHtml(example4html));
            const example4View = new ChatView4(chatlist);

            testComponent(example4View);
            asyncAsserts.then(() => assertComponent(example4View, chatlist));

            // Some developers may want to add everything in javascript using dom manipulation methods.
            // This coding style produces maximum verbosity, and probably will not be used for a large view,
            // but it might be used for small components here and there.
            class ChatList5 extends BoundComponent<HTMLDivElement, ChatListViewModel> {
                constructor(viewModel: ChatListViewModel) {
                    super(viewModel, {
                        type: elementType.HTMLDivElement,
                        properties: {
                            innerHTML: `
                            <div>
                                <div>#<i-v>id</i-v> From:<i-v>fromName</i-v> at <i-v>created</i-v>. <i-v>subject</i-v></div>
                                <div><i-v>stripped</i-v></div>
                            </div>`
                        },
                        attributes: {
                            class: 'component chat-list',
                            i5_loop: "chats"
                        },
                        observeTargets: [viewModel.chats]
                    });
                }
            }

            class ChatSubjectDisplay5 extends BoundComponent<HTMLDivElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel) {
                    super(viewModel, {
                        // Note: type is optional (DIV is default)
                        attributes: {
                            class: 'component chat-subject-display',
                            i5_text: "subject",
                            i5_if: "subject"
                        },
                        observeViewModel: true
                    });
                }
            }

            class ChatSubject5 extends Component<HTMLDivElement> {

                bound: BoundComponent<HTMLInputElement, ChatViewModel>;

                constructor(viewModel: ChatViewModel) {
                    super({ properties: { innerHTML: `<span>Subject:</span>` } });

                    // There are two possible ways to handle the wrapper DIV.
                    // One way is to pass the parent into the constructor, and the same as in example 4,
                    // create a wrapper div and insert into it. But just to be different, example 5 will
                    // make the entire div, including the label, into the component.
                    this.bound = new BoundComponent<HTMLInputElement>(viewModel, new InnerHtmlBindingOptions({
                        type: elementType.HTMLInputElement,
                        attributes: {
                            class: 'component chat-subject',
                            i5_input_value: "subject",
                            i5_switch0_red: "subject"
                        },
                        observeViewModel: true
                    })).appendToParent(this);
                }
            }

            class ChatFrom5 extends Component<HTMLInputElement> {

                bound: BoundComponent<HTMLInputElement, ChatViewModel>;

                constructor(viewModel: ChatViewModel) {
                    super({ properties: { innerHTML: `<span>From:</span>` } });

                    this.bound = new BoundComponent<HTMLInputElement>(viewModel, new InnerHtmlBindingOptions({
                        type: elementType.HTMLInputElement,
                        attributes: {
                            class: 'component chat-from',
                            i5_input_value: "fromName",
                            i5_switch0_red: "fromName"
                        },
                        observeViewModel: true
                    })).appendToParent(this);
                }
            }

            class ChatMessage5 extends Component<HTMLTextAreaElement> {

                bound: BoundComponent<HTMLTextAreaElement, ChatViewModel>;

                constructor(viewModel: ChatViewModel) {
                    super();

                    this.bound = new BoundComponent<HTMLTextAreaElement>(viewModel, new InnerHtmlBindingOptions({
                        type: elementType.HTMLTextAreaElement,
                        attributes: {
                            class: 'component chat-message',
                            i5_input_value: "message",
                            i5_switch0_red: "message"
                        },
                        observeViewModel: true
                    })).appendToParent(this);
                }
            }

            class ChatClosing5 extends BoundComponent<HTMLDivElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel) {
                    super(viewModel, {
                        properties: {
                            // Many properties in HTML can be created either as attributes or properties.
                            // But remember that names may change, as class becomes className.
                            className: 'component chat-closing',
                            innerHTML: `
                                <i-v>closing</i-v> <br />
                                <i-v>fromName</i-v>`
                        },
                        observeViewModel: true
                    });
                }
            }

            class ChatSubmit5 extends BoundComponent<HTMLButtonElement, ChatViewModel> {
                constructor(viewModel: ChatViewModel) {
                    super(viewModel, {
                        type: elementType.HTMLButtonElement,
                        properties: {
                            innerHTML: 'Submit'
                        },
                        attributes: {
                            type: 'submit',
                            class: 'component chat-submit',
                            i5_bool_disabled: 'invalid'
                        },
                        observeViewModel: true
                    });
                }
            }

            class ChatView5 extends Component<HTMLDivElement> {
                viewModel: ChatListViewModel;
                current: ChatViewModel;
                // These properties are strictly not necessary since everything is wired in the constructor but it's a good practice.
                list: ChatList5;
                editor: {
                    subjectDisplay: ChatSubjectDisplay5,
                    subject: ChatSubject5,
                    from: ChatFrom5,
                    message: ChatMessage5,
                    closing: ChatClosing5,
                    button: ChatSubmit5
                };

                constructor(viewModel: ChatListViewModel) {
                    super({
                        id: 'chat-example5',
                        properties: {
                            className: 'chat-example'
                        }
                    });

                    this.viewModel = viewModel;
                    this.current = this.viewModel.beginChat();

                    this.list = new ChatList5(this.viewModel);

                    this.editor = {
                        subjectDisplay: new ChatSubjectDisplay5(this.current),
                        subject: new ChatSubject5(this.current),
                        from: new ChatFrom5(this.current),
                        message: new ChatMessage5(this.current),
                        closing: new ChatClosing5(this.current),
                        button: new ChatSubmit5(this.current),
                    };

                    this.append(createElement(elementType.HTMLHeading4Element, { innerHTML: 'Example 5' }))
                        .append(this.list)
                        .append(createElement(elementType.HTMLBRElement));

                    const editor = div('', {
                        className: 'chat-editor'
                    });
                    const form = createElement(elementType.HTMLFormElement);
                    form.appendChild(this.editor.subjectDisplay.content);
                    form.appendChild(this.editor.from.content);
                    form.appendChild(this.editor.subject.content);
                    form.appendChild(this.editor.message.content);
                    form.appendChild(this.editor.closing.content);
                    form.appendChild(this.editor.button.content);
                    form.addEventListener('submit', this.submit.bind(this));

                    this.appendChild(editor).appendChild(form);
                }
                submit(evt: Event): void {
                    evt.preventDefault();
                    this.viewModel.addChat(this.current)
                        .then(newchat => {
                            Object.assign(this.current, newchat);
                        })
                        // tslint:disable-next-line:no-console
                        .catch(err => console.error(err));
                }
            }

            // Doing everything in javascript, however, means few assumptions about what HTML the web server returns.
            // We find a container, create the view, and drop the view into it.
            const example5View = new ChatView5(chatlist);
            this.testArea.appendChild(example5View.content);

            testComponent(example5View);
            asyncAsserts.then(() => assertComponent(example5View, chatlist));

            // I said example 5 was maximum verbosity, but THIS is maximum verbosity. Say you really liked the fluent interface
            // and wanted to use fluent methods for everything and not do anything in the constructor.
            // To make things even nastier, I'll do it all in a single view, without even encapsulating them in individual
            // component classes ... this is such a pain that no developer would ever make a whole page like this, but
            // doing it for a quick element would be no problem. In fact, VSCode's suggestions are MUCH better for methods as
            // for constructor arguments.
            class ChatView6 extends Component<HTMLDivElement> {
                viewModel: ChatListViewModel;
                current: ChatViewModel;
                // These properties are strictly not necessary since everything is wired in the constructor but it's a good practice.
                list: BoundComponent<HTMLDivElement, ChatListViewModel>;
                editor: {
                    subjectDisplay: BoundComponent<HTMLDivElement, ChatViewModel>,
                    subject: BoundComponent<HTMLInputElement, ChatViewModel>,
                    from: BoundComponent<HTMLInputElement, ChatViewModel>,
                    message: BoundComponent<HTMLTextAreaElement, ChatViewModel>,
                    closing: BoundComponent<HTMLDivElement, ChatViewModel>,
                    button: BoundComponent<HTMLButtonElement, ChatViewModel>
                };

                constructor(viewModel: ChatListViewModel) {
                    super({
                        id: 'chat-example6',
                        properties: {
                            className: 'chat-example'
                        }
                    });

                    this.viewModel = viewModel;
                    this.current = this.viewModel.beginChat();

                    this.appendChild(createElement(elementType.HTMLHeading4Element, { innerHTML: 'Example 6' }));

                    this.list = new BoundComponent<HTMLDivElement, ChatListViewModel>(this.viewModel)
                        .addClass('component chat-list')
                        .setLoop('chats', `<div>
                            <div>#<i-v>id</i-v> From:<i-v>fromName</i-v> at <i-v>created</i-v>. <i-v>subject</i-v></div>
                            <div><i-v>stripped</i-v></div>
                        </div>`)
                        .observe(this.viewModel.chats)
                        .render()
                        .appendToParent(this);

                    this.appendChild(createElement(elementType.HTMLBRElement));

                    const subjectDisplay = new BoundComponent<HTMLDivElement, ChatViewModel>(this.current)
                        .addClass('component chat-subject-display')
                        .setTextTemplate('subject')
                        .setVisibility('subject')
                        .observe()
                        .render();

                    const subject = new BoundComponent<HTMLInputElement, ChatViewModel>(this.current, { type: elementType.HTMLInputElement })
                        .addClass('component chat-subject')
                        .setValueAttribute('subject')
                        .addWriteTarget('subject')
                        .addWriteEvent()
                        .addCssClassSwitch('red', 'subject', true)
                        .observe()
                        .render();

                    const from = new BoundComponent<HTMLInputElement, ChatViewModel>(this.current, { type: elementType.HTMLInputElement })
                        .addClass('component chat-from')
                        .setValueAttribute('fromName')
                        .addWriteTarget('fromName')
                        .addWriteEvent()
                        .addCssClassSwitch('red', 'fromName', true)
                        .observe()
                        .render();

                    const message = new BoundComponent<HTMLTextAreaElement, ChatViewModel>(this.current, { type: elementType.HTMLTextAreaElement })
                        .addClass('component chat-message')
                        .setValueAttribute('message')
                        .addWriteTarget('message')
                        .addWriteEvent()
                        .addCssClassSwitch('red', 'message', true)
                        .observe()
                        .render();

                    const closing = new BoundComponent<HTMLDivElement, ChatViewModel>(this.current)
                        .addClass('component chat-closing')
                        .setTemplate(`<i-v>closing</i-v> <br /> <i-v>fromName</i-v>`)
                        .observe()
                        .render();

                    const button = new BoundComponent<HTMLButtonElement, ChatViewModel>(this.current,
                        new InnerHtmlBindingOptions({
                            type: elementType.HTMLButtonElement,
                            properties: { innerHTML: 'Submit', type: 'submit' }
                        }))
                        .addClass('component chat-submit')
                        .addBooleanAttributeMapping('disabled', 'invalid')
                        .observe()
                        .render();

                    this.editor = {
                        subjectDisplay, subject, from, message, closing, button
                    };

                    const editor = div('', {
                        className: 'chat-editor'
                    });
                    const form = createElement(elementType.HTMLFormElement);
                    form.appendChild(this.editor.subjectDisplay.content);
                    form.appendChild(div('<span>From:</span>')).appendChild(this.editor.from.content);
                    form.appendChild(div('<span>Subject:</span>')).appendChild(this.editor.subject.content);
                    form.appendChild(div()).appendChild(this.editor.message.content);
                    form.appendChild(this.editor.closing.content);
                    form.appendChild(this.editor.button.content);
                    form.addEventListener('submit', this.submit.bind(this));

                    this.appendChild(editor).appendChild(form);
                }
                submit(evt: Event): void {
                    evt.preventDefault();
                    this.viewModel.addChat(this.current)
                        .then(newchat => {
                            Object.assign(this.current, newchat);
                        })
                        // tslint:disable-next-line:no-console
                        .catch(err => console.error(err));
                }
            }

            const example6View = new ChatView6(chatlist);
            this.testArea.appendChild(example6View.content);

            testComponent(example6View);
            asyncAsserts.then(() => assertComponent(example6View, chatlist));

            this.log('Starting async tests');
            asyncAsserts.then(() => this.log(`TEST ${this.viewModel.testNumber}: Async tests succeeded`));
            asyncAsserts.catch(err => {
                this.log('ASYNC TESTS FAILED: ' + err.message);
            });
            asyncAsserts.resolve();

        } catch (err) {
            this.log(err.toString());
        }
    }
}

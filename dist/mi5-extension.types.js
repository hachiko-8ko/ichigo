// See types.d.ts.zip for function/class definitions

import { BoundComponent } from 'types/HtmlComponent/BoundComponent';
import { IContent } from 'types/HtmlComponent/Contract/IContent';
import { ObservableProperty } from 'types/Observable/ObservableProperty';

class HTMLElement {
    getComponent()
    bindComponent(viewModel);
    deleteComponent();
}
class Object {
    toObservable(name);
}
class String {
    toObservable(name);
}
class Number {
    toObservable(name);
}
class Boolean {
    toObservable(name);
}
class HTMLElement {
    appendToParent(parent);
    appendChildFluent(child);
    appendSibling(next);
    appendSiblingFluent(next);
    replaceWith(newElement);
    swap(element);
    extract();
    addEventListenerFluent(eventType, event, options);
    addStyle(property, value);
    addClass(classNames);
}
class DocumentFragment {
    createElement(tagName, properties, attributes);
    createElementFluent(tagName, properties, attributes);
    appendToParent(parent);
}
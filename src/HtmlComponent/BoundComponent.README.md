# Bound Component

The bound component is a one-way or two-way bound component view, allowing configuration of this data-binding using specially-named HTML attributes, as in Angular or Vue. This, I think, is the best compromise between friendliness (and also over-abstraction) and control (and also having to  code everything yourself). Vue is a little less stringly-typed than Angular so I'm favoring its style.

A very simple templating language is included. I do not want to go wild in templating. I really wish HTML5 template strings were actually template strings, not interpolated strings with a false name, because I really would prefer to use a built-in technology. So instead of following a {{ }} or ${} pattern, this follows an HTML-like pattern.

This avoids the enormous glut of directives in Angular, favoring subclassing BoundComponent or doing the work in the view model.

Vue has tons of shortcut attribute conventions, but they're hard to remember. According to the HTMl5 spec, attribute names can be anything other than space, null, ", ', >, =, / and control/non-unicode characters, so if I wanted to be evil...

... nah.  The only shortcut character used is the colon (:).

## Template Replacement

Simple templating is provided.  To avoid writing a parser, which is ugly (_actually, I already wrote it but I threw it away_), this uses HTML5 templates internally, which have been working fine in browsers for a couple years now. Replacements should be in the format

> `<i-v>propertyName</i-v>`

where propertyName is a property of the viewModel.

e.g.

> `<div>Hello <i-v>name</i-v></div>`

PropertyName can also be a method, in which case it is executed with no parameters. _I'm considering adding a way to set parameters but it can get pretty hairy._

The replacement value is HTML escaped.  If you want to keep the raw unescaped HTML, then include a noescape property, e.g. 
> `<i-v noescape>`

After original loading, the i-v tags will be repurposed from storing the *definition* to storing the *data*.  This allows reloading of replacement values by events without breaking references to non-replaced DOM objects (which is what would happen if you updated innerHTML using "&lt;div id='referenced'&gt;{{ name }}&lt;/div&gt;" without a lot of extra work).

I recommend that you do not nest templates inside other ones. If you do, you need to bind them in order from outermost to innermost for references to be kept. The way it works is it takes a text template, builds elements, and puts down the entire content, wiping out whatever came before. Replacements replace only those small changing sections, not the entire text, by storing references to them. References which are removed from the page if you replace all the content. If you want to update these replaces based on an event, for example, you must build the outer content first, then inner.

I *really* recommend that you do not nest templates inside i-v tags (where the value is another template). Remember, i-v tags can be reloaded if instructed, which will destroy any inside DOM objects that are referenced, and this includes the inner i-v tags.  While it's possible to, for example, have one template return the format and then have the inner template return the data ... I did it as a test and it worked ... the timing issues are ugly and it's not worth doing it just to be cute.

By default, when binding a component, it will snap up any i-v elements it sees. This could create a problem in this example of nested components:
> `<component1> <i-v>name</i-v> <component2> <i-v>childName</i-v> </component2> </component1>`

Which does childName belong with? Is the data in component 1 or 2?  In this case, it's 2. This isn't something that is a problem in, say, angular, because each component is stored in a separate file. It's clean, it's clearly delimited, and it requires a custom build process. We don't have that here. In Ichigo, you reference the id, like so (pick your favorite version) (this is a case-insensitive test):

> `<component1 id=component1> <i-v>name</i-v> <component2 id=component2> <i-v #component2>childName</i-v> </component2> </component1>`
> `<component1 id=component1> <i-v>name</i-v> <component2 id=component2> <i-v component="component2">childName</i-v> </component2> </component1>`
> `<component1 id=component1> <i-v>name</i-v> <component2 id=component2> <i-v data-component="component2">childName</i-v> </component2> </component1>`

## Custom Attributes

There are a lot of special attributes, but the list is small enough that it should be possible to remember them all.  There are only 15 unique properties that have any functionality.

Special attributes all start with i5_. This tries to not require any characters that require special handling in JS or HTML. You can so begin with a colon (:) as a shortcut for i5_. This is the only real shortcut offered by the bound component, and it is not a valid JS identifier, so you'd have to reference it like obj[':html'], but it's one of the few characters that element.setAttribute() and element.getAttribute() do not choke on.

*Even though the HTMl5 standard says that almost all unicode characters are valid attribute names, the DOM methods don't play nice with them, so the colon is the only potential shortcut character that doesn't cause pain. I wanted to use % because of its location in QWERTY but you can't have it all.*

In the following examples, "propertyName" could be a property with a string value or it could be a parameterless function, which will be executed to get the value.  If the property to be read (or set) is the viewModel itself, use "." for the property name. It is also possible to access a property of the view, using the same rules, by beginning the property name with "this."

Example: referencing viewModel name:
> `<i-v>name</i-v>`

Example: referencing viewModel itself:
> `<i-v>.</i-v>`

Example: referencing a component property:
> `<i-v>this.count</i-v>`

Even though propertyName looks like code that can be evaluated, it is just a simple name lookup.  You cannot access more complicated properties like this.callMethod().name.toLowerCase() like you can attempt in Angular.

And if you wanted an insane viewmodel where the properties have "this." in the name like { ["this.wtf"] = "WTF" }, sorry.

It is also possible to take data from another component, anywhere in the document, using the id (it fetches using document.getElementById() so it must exist, and it must be bound to a component).

Example: referencing another component (i-v tags will let you skip the "iv_" prefix for convenience)
> `<i-v :source="someId">name<i-v>`
> `<i-v iv_source="someId">name<i-v>`
> `<i-v data-iv_source="someId">name<i-v>`

All custom attributes on a item must use the same source. If you want to vary the sources, then write the code in a method and call that.

* i5_text="propertyName"  
Set innerHTML equal to the value of propertyName, escaping HTML.

* i5_html="propertyName"  
Set innerHTML equal to the value of propertyName, not escaping HTML.  

* i5_value="propertyName"  
Set the form field value (only if it is a form field) to the value of propertyName. This is used because the way to set form field properties differs for input text, checkbox, radio, and selects, for example. Differs GREATLY. i5_attr:value will not work for many form fields.

* i5_attr:attribute="propertyName" or i5_attr_attribute="propertyName"  
Set the attribute whose name is "attribute" to the value of propertyName.

* i5_bool:attribute or i5_bool_attribute="propertyName"  
Add the boolean attribute whose name is attribute if the value of propertyName is truthy. Else remove it.

* i5_bool-:attribute or i5_bool0_attribute="propertyName"  
Remove the boolean attribute whose name is attribute if the value of propertyName is truthy. Else add it.

* i5_style="propertyName"  
Add/set the style string provided by the value of propertyName.

* i5_class="propertyName"  
Set the className string equal to the value of propertyName.

* i5_class:className="propertyName" or i5_class_className="propertyName"  
If the value of propertyName is truthy, add className to classList. If falsy, remove className.

* i5_class-:className="propertyName" or i5_class0_className="propertyName"  
Negative boolean className, where truthy turns off the class and falsy turns it on.

WARNING: Browsers lowercase all attribute names, so all class names set in attributes must be lowercased.

* i5_if="propertyName"  
If the value of propertyName is falsy, CSS display: none is applied. If the value of propertyName is truthy, CSS display is reset to its previous value (if possible) or cleared. Note that this could get in an argument with classes, and if you hardcoded display: none on the element, it will always be hidden.

* i5_if-="propertyName" or i5_if0="propertyName"  
The same but negated.

* i5_loop="propertyName"  
Repeat the contents of the element once for every item in the value of propertyName. Does nothing if the value is not iterable.  
WARN: String is iterable and passing them is allowed.

After each item is added, the method loopPostProcess() is executed, taking these inputs: 
> `(row: WhateverTypeIsIterated, addedContent: Node[], allRows: Iterable<WhateverTypeIsIterated>, previousContent: DocumentFragment)`  

> The default loopPostProcess() calls inject on the added content. It executes

> `this.constructor.inject(row, nodeListSelectorAll(addedContent, '[i5_item]'), this._loopItemClass);`

To do something different, write a derived class and override loopPostProcess() with your own version.

IMPORTANT: This was just said, but bears repeating: loopPostProcess() is called *after* the looped HTML is inserted. loopPostProcess() should be used to
convert the existing HTML into a component object, not to set the HTML itself (for example, changing the tag of the i5_item element).

WARN: When the loop is rendered, the previous contents are discarded. This means that if you have references to the old item, it's gone. If you want to do something about that, write your own callback, pulling the old items out of previousContent.

* i5_loop:null="propertyName" or i5_loop_null="propertyName"  
Loop but do not call loopPostProcess() upon completion.

* i5_item  
Used to indicate a row item component in a loop. Currently used only as an optional selector by loopPostProcess() to convert it to a component. Useful in the following scenario (note that it doesn't have a single top-level item to bind to, so it needs to bind to three per loop):
```
    <div i5_loop="iterable">
        <!--- Everything inside here is repeated --->
        <span i5_item><i-v>field1</i-v></span>
        <span i5_item><i-v>field2</i-v></span>
        <span i5_item><i-v>field3</i-v></span>
    </div>
```

If i5_item is not found, loopPostProcess will grab the first element and make that the component, as in the following typical example:
```
    <div i5_loop="iterable">
        <!--- Everything inside here is repeated --->
        <div class="first_element">
            <span><i-v>field1</i-v></span>
            <span><i-v>field2</i-v></span>
            <span><i-v>field3</i-v></span>
        </div>
    </div>
```

* i5_input  
Used to indicate that input events on the component should call the BoundComponent.write() method, which writes to the properties specified in...

* i5_target="propertyName"  
Add a target for the built-in write() view method. When the write method is called, the value of the form element is written to propertyName of the view model. If propertyName is a method, the method is called with the value as an input.  
To add multiple targets, anything after the word target can be adjusted. i5_target1, i5_target2, etc.

* i5_input="propertyName"  
Shortcut for including the two properties: `i5_input i5_target="propertyName"`
Simple data-bound text field example:
> `<input id="inputfield" name="whoami" type="text" i5_input="fullName" />`

* :input: or i5_input_value="propertyName"  
A shortcut for including the two properties: `i5_input="propertyName" i5_value="propertyName"` (2-way binding)

* :event (eventName)="methodName" or i5_event (eventName)="methodName"  
This is actually part of Component and is only used if you call addInlineEventListeners(). Using it triggers a call to `component.content.addEventListener('eventName', component[methodName].bind(component))`

If you are opposed to using custom attributes, these all can also be used as data- attributes, e.g. `data-i5_if="propertyName"`
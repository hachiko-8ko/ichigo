# Observable State

The observable state is an idea stolen from React.  The interface is a bit clunky, but it solves a basic problem of all
observable objects in languages with reference data types.

The basic problem is that when you have an object that references another object, it is unable to detect changes that occur
in that other object, unless it is written in a way so that it informs the first object.  And this basic problem repeats itself
for each reference.  What if you want to reference something that has no knowledge of any event? Then you're out of luck.

With an observable state, there is just one object, the state. If you want to read the state, you must call a specific method,
which makes a deep clone of the state.  If you want to change anything in the state, you must push an update, overwriting the
previous state, even if you want to make a change to something that is deeply nested.

This is, as I said, a bit clunky when compared to, say, a proxied object, but it solves the complex event problem quite easily. If you
want to watch for changes, all you need to watch is the special update state method.

The state should be fairly simple, because deep cloning in JS is fraught with issues, and I'm using a fairly simple deep clone method.
Pretend that the state is being serialized as JSON, except that your dates will be handled correctly. Javascript objects allow
a lot of crazy logic that will break the cloning. As a simple example, methods can have internal or external closures that reference
mutable state ... I haven't tested to see how this will break, but I know 100% that it WILL break, because both cases, throwing an
exception or, worse, NOT throwing, are both failure states.

## Set State

SetState() updates the value of the observable state, raising an event on the changeHandler and returning the object 
`{oldValue, newValue, returnValue}`

Some examples of setState:

* Replace the entire object  
> `obs.setState({ name: 'Sebastian', job: 'Butler', house: 'Phantomhive', duties: ['clean', 'cook', 'destroy all enemies']}, true);`
> `obs.getState(); // { name: 'Sebastian', job: 'Butler', house: 'Phantomhive', duties: ['clean', 'cook', 'destroy all enemies']}`

* Replace only one key  
> `obs.setState({ house: 'Itoshiki' });`
> `obs.getState(); // { name: 'Sebastian', job: 'Butler', house: 'Itoshiki', duties: ['clean', 'cook', 'destroy all enemies']}`

* Change using a lambda, including deep changes to a child object  
```
obs.setState(prev => {
    prev.name = 'Not Actually Sebastian';
    return prev.duties.pop();`
  });

// returns:
    // { oldValue: { name: 'Sebastian', job: 'Butler', house: 'Itoshiki', duties: ['clean', 'cook', 'destroy all enemies']},
    // newValue: { name: 'Not Actually Sebastian', job: 'Butler', house: 'Itoshiki', duties: ['clean', 'cook']},
    // returnValue: 'destroy all enemies' }
```

* Get the state:  
> `obs.getState(); // { name: 'Not Actually Sebastian', job: 'Butler', house: 'Itoshiki', duties: ['clean', 'cook']}`

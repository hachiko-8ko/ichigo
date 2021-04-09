# Keyword Arguments

This module provides an implementation of keyword arguments, as seen in Python and C#. It makes configurable
functions so much quicker and easier than flat arguments (forcing you to put undefined manually in different
slots) or options objects (takes more time to produce, especially if you need to new it up).

It's two steps forward, one step back with JavaScript. And in this case, TypeScript doesn't help at all, so
this has to actually work around it.

Call functions having keyword arguments using this syntax:
> `callme(arg1, arg2, kw('something', kw1), kw('somethingElse', kw2))`

 To make them work, in the function itself, you need to copy and paste. For example:
 > `({ arg1, arg2, something, somethingElse } = Kwarg.parse({ arg1, arg2, something, somethingElse }));`

That's annoying and redundant but it's fairly quick. If there are default values, you must repeat them
on the left. And if it's TypeScript, you have to delete the types.

But we're working within serious constraints, because JS doesn't provide any access to the argument
keys or defaults (only the values). So the coder has to do it manually.

Control-C + 2 x Control-V (with some possible deletion) doesn't take too long. It still sucks though.

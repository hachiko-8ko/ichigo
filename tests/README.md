# Unit Tests

I really wanted to use real unit tests. Jest looked promising and supposedly had jsdom included ... I was looking for a one-stop shop. Unfortunately, ts-jest won't even install on this machine.

I could continue to fight with different unit testing libraries and try to get a setup that works, but the defining characteristic of npm is that things don't work. It's just not worth it, so I wrote my own simple unit test bench. It's pretty half-baked, I admit, but it works.

Though you do have to actually open tests_out/index.html in a browser, then click through the tests, giving each one a little time to run (some run async tests after a 1-2s delay).
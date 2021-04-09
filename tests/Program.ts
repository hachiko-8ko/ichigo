import { PageRouter, IRouteGuard, IRoute } from '../src/Api';
import { TestbenchView } from '../tests/TestbenchView';
import { Test000 } from './Test000';
import { Test001 } from './Test001';
import { Test002 } from './Test002';
import { Test003 } from './Test003';
import { Test004 } from './Test004';
import { Test005 } from './Test005';
import { Test006 } from './Test006';
import { Test007 } from './Test007';
import { Test008 } from './Test008';
import { Test009 } from './Test009';
import { Test010 } from './Test010';
import { Test011 } from './Test011';
import { Test012 } from './Test012';
import { Test013 } from './Test013';
import { Test014 } from './Test014';

/**
 * This is a very basic page that I use to see if everything is working. It's what passes for unit tests without
 * an installable unit testing framework.
 */
function main() {
    PageRouter.configure([
        { route: 'test/:id=0', payload: Test000 },
        { route: 'test/:id=1', payload: Test001 },
        { route: 'test/:id=2', payload: Test002 },
        { route: 'test/:id=3', payload: Test003 },
        { route: 'test/:id=4', payload: Test004 },
        { route: 'test/:id=5', payload: Test005 },
        { route: 'test/:id=6', payload: Test006 },
        { route: 'test/:id=7', payload: Test007 },
        { route: 'test/:id=8', payload: Test008 },
        { route: 'test/:id=9', payload: Test009 },
        { route: 'test/:id=10', payload: Test010 },
        { route: 'test/:id=11', payload: Test011 },
        { route: 'test/:id=12', payload: Test012 },
        { route: 'test/:id=13', payload: Test013 },
        { route: 'test/:id=14', payload: Test014 },
    ], TestbenchView, true, '<div>There is no page here.</div>', 'test/0');

    // TODO: How can I unit test the router itself? Can't use this test harness, obviously.
}

main();

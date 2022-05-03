import { PageRouter } from '../src/Router/PageRouter';

interface IRouter {
    PageRouter: PageRouter;
}

interface IMi5 {
    router: IRouter;
}

declare var mi5: IMi5;
declare function using(lib: any, alias: string): void;

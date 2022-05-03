import { IContent } from '../src/HtmlComponent/Contract/IContent';
import { Component } from '../src/HtmlComponent/Component';
import { BoundComponent } from '../src/HtmlComponent/BoundComponent';
import { ComponentMap } from '../src/HtmlComponent/ComponentMap';

interface IComponent {
    Component: Component;
    BoundComponent: BoundComponent;
    ComponentMap: ComponentMap;
    getComponent(element: HTMLElement): IContent<HTMLElement>;
}

interface IMi5 {
    component: IComponent;
}

declare var mi5: IMi5;
declare function using(lib: any, alias: string): void;

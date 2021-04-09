import { IContent } from './Contract/IContent';

/**
 * The question needs to be asked: if you can add a component to a page by doing element.appendChild(component.content),
 * how do you do from document.getElementById('foo') and get to component, not component.content? This is how.
 *
 * var component = ComponentMap.components.get(document.getElementById('foo'));
 *
 * This will work as long as ComponentMap.components.set(content, component) has been called at some point.
 *
 * This is the approved way of doing it. Another possible solution would be the use of expando properties,
 * for example document.getElementById('foo').relatedComponent = component. This works and it's super simple,
 * but seems to be frowned upon ... it has been known to create memory leaks in the past. WeakMap is the object
 * specifically created for this use case, so that is used here.
 *
 * If extension methods are loaded, you can use the element.getComponent() shortcut.
 */
export abstract class ComponentMap {
    static components: WeakMap<HTMLElement, IContent> = new WeakMap();
}

export function getComponent(element: HTMLElement): IContent | undefined;
export function getComponent(id: string): IContent | undefined;
export function getComponent(element: HTMLElement | string): IContent | undefined {
    if (typeof element === 'string') {
        const e = document.getElementById(element);
        if (!e) { return; }
        return ComponentMap.components.get(e);
    } else {
        return ComponentMap.components.get(element);
    }
}

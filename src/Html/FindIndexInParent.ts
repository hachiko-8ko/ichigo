import { Nullable } from "../System/Types/NoneType";

export function findIndexInParent(element: Element): Nullable<number> {
    const parent = element.parentElement;
    if (parent) {
        return Array.from(parent.children).indexOf(element);
    }
}

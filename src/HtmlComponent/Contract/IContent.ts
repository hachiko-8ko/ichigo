/**
 * IContent represents an object whose representation on the page is defined in the content property.
 *
 * This is necessary because you can't say element.appendChild(myClass) unless your class derives
 * from HTMLElement, and that's not anything anyone wants to do lightly. It's pretty heavy custom.
 * So instead, element.appendChild(myClass.content).
 *
 * The other need, var myClass = document.getElementById('foo'), can't be handled in this interface.
 * It's handled elsewhere (ComponentMap.ts).
 */
export interface IContent<TElement extends HTMLElement = HTMLElement> {
    content: TElement;
}

export interface ITreeNode {
    element: HTMLElement;
    parent?: ITreeNode;
    children: ITreeNode[];
}

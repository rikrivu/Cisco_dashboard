export interface Tree {
    name: string;
    isRoot?: boolean;
    isChild: boolean;
    firstChild: boolean;
    children: Tree[];
}

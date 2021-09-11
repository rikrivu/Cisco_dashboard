export interface ProductHierarchy {
    name: string;
    designation?: string;
    isChild: boolean;
    dashedBorder: boolean;
    children: ProductHierarchy[];
}

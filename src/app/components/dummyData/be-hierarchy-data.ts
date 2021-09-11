import { Tree } from '../tree/TreeInterface.ts/tree';

export let tree: Tree = {
    name: 'Enterprise networking',
    isRoot: true,
    isChild: false,
    firstChild: false,
    children: [
      {
        name: 'Enterprise Switching',
        isChild: true,
        firstChild: true,
        children: [
          {
            name: 'Ent. Switching - Access',
            isChild: true,
            firstChild: false,
            children: []
          }
        ]
      }
    ]
  };

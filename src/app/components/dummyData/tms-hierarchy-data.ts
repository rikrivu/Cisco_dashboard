import { Tree } from '../tree/TreeInterface.ts/tree';

export let tree: Tree = {
    name: 'Corp-LAN Switching',
    isRoot: true,
    isChild: false,
    firstChild: false,
    children: [
      {
        name: 'Corp-Modular Switching',
        isChild: true,
        firstChild: true,
        children: [
          {
            name: 'Corp-Modular 10/100/1000',
            isChild: true,
            firstChild: false,
            children: []
          }
        ]
      }
    ]
  };

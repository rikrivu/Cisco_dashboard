import { Tree } from '../tree/TreeInterface.ts/tree';

export let tree: Tree = {
    name: 'catalyst 9400',
    isRoot: true,
    isChild: false,
    firstChild: false,
    children: [
      {
        name: 'Wireless Assurance',
        isChild: true,
        firstChild: true,
        children: []
      },
      {
        name: 'Converged Wired & Wireless Policy and Management',
        isChild: true,
        firstChild: true,
        children: []
      },
      {
        name: 'Network Segmentaion',
        isChild: true,
        firstChild: true,
        children: []
      },
      {
        name: 'Day 0: Device Onboarding',
        isChild: true,
        firstChild: true,
        children: []
      },
      {
        name: 'Day 1/2: SWIM and Provisioning',
        isChild: true,
        firstChild: true,
        children: []
      }
    ]
  };

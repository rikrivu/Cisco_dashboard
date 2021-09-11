import { ProductHierarchy } from '../../Interfaces/productHierarchy';

export const employee: ProductHierarchy = {
    name: 'ENGTG',
    designation: '',
    isChild: false,
    dashedBorder: false,
    children: [
      {
        name: 'EBBU',
        designation: '',
        isChild: true,
        dashedBorder: false,
        children: []
      },
      {
        name: 'UABU',
        designation: '',
        isChild: true,
        dashedBorder: false,
        children: [
          {
            name: 'CATALYST',
            designation: '9400',
            isChild: true,
            dashedBorder: true,
            children: []
          },
          {
            name: 'CATALYST',
            designation: '9200',
            isChild: true,
            dashedBorder: true,
            children: []
          },
          {
            name: 'CATALYST',
            designation: '9300',
            isChild: true,
            dashedBorder: true,
            children: []
          }
        ]
      },
      {
        name: 'CPBU',
        designation: '',
        isChild: true,
        dashedBorder: false,
        children: []
      }
    ]
  };

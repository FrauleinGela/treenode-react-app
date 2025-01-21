import { describe, it, expect } from 'vitest';
import { sortTreeNodes } from '../../utils/sortTreeNodes';
import { TreeNodeModel } from '../../../types/treeNode';

describe('sortTreeNodes', () => {
  const data: TreeNodeModel[] = [
    {
      id: 'id3',
      type: 'image',
      name: 'C',
    },
    {
      id: 'id2',
      type: 'image',
      name: 'B',
    },
    {
      id: 'id1',
      type: 'folder',
      name: 'A',
      children: [
        {
          id: 'id24',
          type: 'image',
          name: 'z',
        },
        {
          id: 'id4',
          type: 'image',
          name: 'D',
        },
      ],
    },
  ];

  it('should sort tree nodes', () => {
    const actual: TreeNodeModel[] = sortTreeNodes(data);
    const expected = [
      {
        id: 'id1',
        type: 'folder',
        name: 'A',
        children: [
          {
            id: 'id4',
            type: 'image',
            name: 'D',
          },
          {
            id: 'id24',
            type: 'image',
            name: 'z',
          },
        ],
      },
      {
        id: 'id2',
        type: 'image',
        name: 'B',
      },
      {
        id: 'id3',
        type: 'image',
        name: 'C',
      },
    ];

    expect(actual).toEqual(expected);
  });
});

import { TreeNodeModel } from '../../types/treeNode';

export const sortTreeNodes = (data: TreeNodeModel[]): TreeNodeModel[] => {
  return data
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    .map((item) => {
      if (item.type === 'folder' && item.children) {
        return { ...item, children: sortTreeNodes(item.children) };
      }
      return item;
    });
};

import { TreeNodeModel } from '../../types/treeNode';
import { sortTreeNodes } from './sortTreeNodes';

export const mapDataToTreeNodeModel = (data: any): TreeNodeModel[] => {
  const items = data?.data;
  if (!items || !Array.isArray(items)) {
    return [];
  }

  return sortTreeNodes(mapTreeNodesModel(items));
};

const mapTreeNodesModel = (items: any[]): TreeNodeModel[] => {
  return items.map(
    (item: any) =>
      ({
        id: item.id,
        type: item.type,
        name: item.name,
        children: item.children ? mapTreeNodesModel(item.children) : undefined,
      } as TreeNodeModel)
  );
};

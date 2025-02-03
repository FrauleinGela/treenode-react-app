import { ITreeNode } from '../../types/treeNode';
import { sortTreeNodes } from './sortTreeNodes';

export const mapDataToTreeNodeModel = (data: any): ITreeNode[] => {
  const items = data?.data;
  if (!items || !Array.isArray(items)) {
    return [];
  }

  return sortTreeNodes(mapTreeNodesModel(items));
};

const mapTreeNodesModel = (
  items: any[],
  currentParentNodeId: string | null = null,
  parentNodesIds: string[] = []
): ITreeNode[] => {
  return items.map((item: any) => {
    const currentParentIds = currentParentNodeId
      ? [...parentNodesIds, currentParentNodeId]
      : parentNodesIds;

    return {
      id: item.id,
      type: item.type,
      name: item.name,
      parentNodesIds: currentParentIds,
      children: item.children
        ? mapTreeNodesModel(item.children, item.id, currentParentIds)
        : undefined,
    } as ITreeNode;
  });
};

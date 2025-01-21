export type NodeType = 'file' | 'folder' | 'image' | 'doc';

export interface TreeNodeModel {
  id: string;
  type: NodeType;
  name: string;
  children?: TreeNodeModel[];
}

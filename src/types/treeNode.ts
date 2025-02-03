export type NodeType = 'file' | 'folder' | 'image' | 'doc';

export interface ITreeNode {
  id: string;
  type: NodeType;
  name: string;
  children?: ITreeNode[];
  parentNodesIds: string[];
}

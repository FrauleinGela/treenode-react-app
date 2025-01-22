import React, { createContext, useContext, useState } from 'react';
import { TreeNodeModel } from '../types/treeNode';

interface TreeContext {
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  treeNodes: TreeNodeModel[] | [];
  setTreeNodes: React.Dispatch<React.SetStateAction<TreeNodeModel[] | []>>;
  getSelectedNode: () => TreeNodeModel | null;
}

const TreeContext = createContext<TreeContext | undefined>(undefined);

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};

export const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [treeNodes, setTreeNodes] = useState<TreeNodeModel[] | []>([]);
  const getSelectedNode = (): TreeNodeModel | null => {
    if (!treeNodes || !selectedNodeId) return null;

    const findNode = (nodes: TreeNodeModel[]): TreeNodeModel | null => {
      for (const node of nodes) {
        if (node.id === selectedNodeId) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    return findNode(treeNodes);
  };

  return (
    <TreeContext.Provider
      value={{
        selectedNodeId,
        setSelectedNodeId,
        treeNodes,
        setTreeNodes,
        getSelectedNode
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

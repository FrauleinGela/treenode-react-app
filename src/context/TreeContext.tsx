import React, { createContext, useContext, useState } from 'react';
import { TreeNodeModel } from '../types/treeNode';

interface TreeContext {
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  treeNodes: TreeNodeModel[] | [];
  setTreeNodes: React.Dispatch<React.SetStateAction<TreeNodeModel[] | []>>;
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
  const [expandedNodesIds, setExpandedNodesIds] = useState<{
    [key: string]: boolean;
  }>({});
  const [treeNodes, setTreeNodes] = useState<TreeNodeModel[] | []>([]);

  return (
    <TreeContext.Provider
      value={{
        selectedNodeId,
        setSelectedNodeId,
        treeNodes,
        setTreeNodes,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

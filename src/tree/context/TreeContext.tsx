import React, { createContext, useContext, useState } from 'react';
import { TreeNodeModel } from '../../types/treeNode';

interface TreeContext {
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
  const [treeNodes, setTreeNodes] = useState<TreeNodeModel[] | []>([]);

  const contextValue = {
    treeNodes,
    setTreeNodes,
  };

  return (
    <TreeContext.Provider value={contextValue}>{children}</TreeContext.Provider>
  );
};

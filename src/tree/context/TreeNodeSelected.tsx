import React, { createContext, useContext, useState } from 'react';
import { ITreeNode } from '../../types/treeNode';

interface INodeSelectedContext {
  nodeSelected: ITreeNode | null;
  setNodeSelected: React.Dispatch<React.SetStateAction<ITreeNode | null>>;
}

const NodeSelectedContext = createContext<INodeSelectedContext | undefined>(
  undefined
);

export const useNodeSelectedContext = () => {
  const context = useContext(NodeSelectedContext);
  if (!context) {
    throw new Error(
      'useNodeSelectedContext must be used within a TreeProvider'
    );
  }
  return context;
};

export const NodeSelectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nodeSelected, setNodeSelected] = useState<ITreeNode | null>(null);

  const contextValue = {
    nodeSelected,
    setNodeSelected,
  };

  return (
    <NodeSelectedContext.Provider value={contextValue}>
      {children}
    </NodeSelectedContext.Provider>
  );
};

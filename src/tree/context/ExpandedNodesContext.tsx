import React, { createContext, useContext, useState } from 'react';
import { TreeNodeModel } from '../../types/treeNode';

interface IExpandedNodesContext {
  expandedNodeIds: { [key: string]: boolean };
  setExpandedNodeIds: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  expandNodeAndParents: (node: TreeNodeModel) => void;
}

const ExpandedNodesContext = createContext<IExpandedNodesContext | undefined>(
  undefined
);

export const useExpandedNodesContext = () => {
  const context = useContext(ExpandedNodesContext);
  if (!context) {
    throw new Error(
      'useNodeSelectedContext must be used within a TreeProvider'
    );
  }
  return context;
};

export const ExpandedNodesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<{
    [key: string]: boolean;
  }>({});

  const expandNodeAndParents = (node: TreeNodeModel) => {
    setExpandedNodeIds((prev) => {
      const newExpandedNodeIds: { [key: string]: boolean } =
        node.parentNodesIds.reduce(
          (acc, item) => ({
            ...acc,
            [item]: true,
          }),
          { [node.id]: true }
        );

      return { ...prev, ...newExpandedNodeIds };
    });
  };

  const contextValue = {
    expandedNodeIds,
    setExpandedNodeIds,
    expandNodeAndParents,
  };

  return (
    <ExpandedNodesContext.Provider value={contextValue}>
      {children}
    </ExpandedNodesContext.Provider>
  );
};

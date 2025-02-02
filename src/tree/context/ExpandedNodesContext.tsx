import React, { createContext, useContext, useState } from 'react';

interface IExpandedNodesContext {
  expandedNodeIds: { [key: string]: boolean };
  setExpandedNodeIds: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
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

  const contextValue = {
    expandedNodeIds,
    setExpandedNodeIds,
  };

  return (
    <ExpandedNodesContext.Provider value={contextValue}>
      {children}
    </ExpandedNodesContext.Provider>
  );
};

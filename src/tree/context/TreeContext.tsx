import React, { createContext, useCallback, useContext, useState } from 'react';
import { TreeNodeModel } from '../../types/treeNode';

interface TreeContext {
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  treeNodes: TreeNodeModel[] | [];
  setTreeNodes: React.Dispatch<React.SetStateAction<TreeNodeModel[] | []>>;
  expandedNodeIds: { [key: string]: boolean };
  setExpandedNodeIds: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  expandNodeAndParents: (id: string) => void;
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
  const [expandedNodeIds, setExpandedNodeIds] = useState<{
    [key: string]: boolean;
  }>({});

  const getSelectedNode = useCallback((): TreeNodeModel | null => {
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
  }, [treeNodes, selectedNodeId]);

  const expandNodeAndParents = (nodeId: string) => {
    const findNodeAndParents = (
      nodes: TreeNodeModel[],
      treeNodeId: string
    ): string[] | null => {
      for (const node of nodes) {
        if (node.id === treeNodeId) {
          return [node.id];
        }

        if (node.children) {
          const result = findNodeAndParents(node.children, treeNodeId);
          if (result) {
            return [node.id, ...result];
          }
        }
      }
      return null;
    };

    const nodeAndParents = findNodeAndParents(treeNodes, nodeId);
    if (nodeAndParents) {
      setExpandedNodeIds((prev) => {
        const newExpandedNodeIds = { ...prev };
        nodeAndParents.forEach((id) => {
          newExpandedNodeIds[id] = true;
        });
        
        return newExpandedNodeIds;
      });
    }
  };

  return (
    <TreeContext.Provider
      value={{
        selectedNodeId,
        setSelectedNodeId,
        treeNodes,
        setTreeNodes,
        getSelectedNode,
        expandedNodeIds,
        setExpandedNodeIds,
        expandNodeAndParents,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

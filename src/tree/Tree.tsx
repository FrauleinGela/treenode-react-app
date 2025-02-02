import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { TreeNodeModel } from '../types/treeNode';
import { mapDataToTreeNodeModel } from '../tree/utils/mapTreeNodes';
import { TreeNode } from './components/TreeNode/TreeNode';
import { Sidebar } from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { TreeNodeDetails } from './components/TreeNodeDetails/TreeNodeDetails';
import { NodeSelectedProvider } from './context/TreeNodeSelected';
import { ExpandedNodesProvider } from './context/ExpandedNodesContext';

export const Tree = () => {
  const [treeNodes, setTreeNodes] = useState<TreeNodeModel[]>();
  const { data, error, isLoading } = useSWR(
    'http://localhost:8010/api/v1/tree',
    fetcher
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setTreeNodes(mapDataToTreeNodeModel(data));
  }, [data]);

  if (error) return <div>failed to load, please retry again</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <NodeSelectedProvider>
      <ExpandedNodesProvider>
        <Sidebar>
          <ul>
            {treeNodes?.map((node) => (
              <TreeNode key={node.id} node={node} />
            ))}
          </ul>
        </Sidebar>
        <div className="flex-1 p-5 overflow-auto">
          <TreeNodeDetails />
        </div>
      </ExpandedNodesProvider>
    </NodeSelectedProvider>
  );
};

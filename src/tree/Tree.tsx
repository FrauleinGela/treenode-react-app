import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { TreeNodeModel } from '../types/treeNode';
import { mapDataToTreeNodeModel } from '../tree/utils/mapTreeNodes';
import { TreeNode } from './components/TreeNode';
import { Sidebar } from '../components/Sidebar';
import { useTreeContext } from './context/TreeContext';
import { useEffect } from 'react';
import { TreeNodeDetails } from './components/TreeNodeDetails/TreeNodeDetails';

export const Tree = () => {
  const { data, error, isLoading } = useSWR(
    'http://localhost:8010/api/v1/tree',
    fetcher
  );
  const { setTreeNodes, treeNodes } = useTreeContext();

  useEffect(() => {
    const treeNodes: TreeNodeModel[] = mapDataToTreeNodeModel(data);
    setTreeNodes(treeNodes);
  }, [data, setTreeNodes]);

  if (error) return <div>failed to load, please retry again</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Sidebar>
        <ul>
          {treeNodes.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
      </Sidebar>
      <div className="flex-1 p-5 overflow-auto">
        <TreeNodeDetails />
      </div>
    </>
  );
};

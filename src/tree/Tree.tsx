import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { TreeNodeModel } from '../types/treeNode';
import { mapDataToTreeNodeModel } from '../tree/utils/mapTreeNodes';
import { TreeNode } from './components/treeNode';

export const Tree = () => {
  const { data, error, isLoading } = useSWR(
    'http://localhost:8010/api/v1/tree',
    fetcher
  );

  if (error) return <div>failed to load, please retry again</div>;
  if (isLoading) return <div>loading...</div>;

  const treeNodes: TreeNodeModel[] = mapDataToTreeNodeModel(data);

  return (
    <ul>
        {treeNodes.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
    </ul>
  );
};

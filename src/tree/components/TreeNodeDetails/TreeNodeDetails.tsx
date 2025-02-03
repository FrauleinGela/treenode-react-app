import clsx from 'clsx';
import { TreeNodeModel } from '../../../types/treeNode';
import { useNodeSelectedContext } from '../../context/TreeNodeSelected';
import { useExpandedNodesContext } from '../../context/ExpandedNodesContext';

export const TreeNodeDetails = () => {
  const { expandNodeAndParents } = useExpandedNodesContext();
  const { nodeSelected, setNodeSelected } = useNodeSelectedContext();

  const handleNodeSelected = (node: TreeNodeModel): void => {
    expandNodeAndParents(node);
    setNodeSelected(node);
  };
  if (!nodeSelected) {
    return '';
  }

  return nodeSelected.children && nodeSelected.children.length > 0 ? (
    <div className="flex-1 px-6">
      <ol className="list-none gap-4 flex flex-wrap">
        {nodeSelected.children.map((child) => (
          <li key={child.id} onClick={() => handleNodeSelected(child)}>
            <div
              className={clsx('w-32 h-32 flex items-center justify-center', {
                'bg-slate-400 text-white': child.type === 'folder',
                'border-2 border-black bg-white-400': child.type !== 'folder',
              })}
            >
              {child.type !== 'folder' && child.name[0]}
            </div>
            <div className="truncate w-32 overflow-hidden whitespace-nowrap">
              {child.type === 'folder' ? 'Folder' : ''} {child.name}
            </div>
          </li>
        ))}
      </ol>
    </div>
  ) : (
    <div>
      <div>name: {nodeSelected.name}</div>
      <div>type: {nodeSelected.type}</div>
    </div>
  );
};

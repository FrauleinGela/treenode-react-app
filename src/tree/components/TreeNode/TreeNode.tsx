import { TreeNodeModel } from '../../../types/treeNode';
import clsx from 'clsx';
import { ExpandedIcon } from './components/ExpandedIcon';
import { CollapsedIcon } from './components/CollapsedIcon';
import { useNodeSelectedContext } from '../../context/TreeNodeSelected';
import { useExpandedNodesContext } from '../../context/ExpandedNodesContext';

export const TreeNode = ({ node }: { node: TreeNodeModel }) => {
  const { expandedNodeIds, setExpandedNodeIds } = useExpandedNodesContext();
  const { nodeSelected, setNodeSelected } = useNodeSelectedContext();
  const isExpanded: boolean = expandedNodeIds[node.id] || false;

  const handleNodeClick = () => {
    setNodeSelected(node);
    if (node.type === 'folder') {
      setExpandedNodeIds((prev) => ({
        ...prev,
        [node.id]: !prev[node.id],
      }));
    }
  };

  const renderStatusIcon = () => {
    if (node.type === 'folder') {
      return isExpanded ? <ExpandedIcon /> : <CollapsedIcon />;
    }
    return <div className="w-6 h-6"></div>;
  };

  return (
    <li className="block cursor-pointer min-w-[300px] whitespace-nowrap py-2">
      <button
        className="flex"
        onClick={() => handleNodeClick()}
        style={{ cursor: 'pointer' }}
      >
        {renderStatusIcon()}
        <div
          className={clsx('mx-1 px-1', {
            'bg-slate-400': node.id === nodeSelected?.id,
          })}
        >
          {node.name}
        </div>
      </button>
      {isExpanded && node.children && (
        <ol className="pl-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ol>
      )}
    </li>
  );
};

import { TreeNodeModel } from '../../../types/treeNode';
import { useTreeContext } from '../../context/TreeContext';
import clsx from 'clsx';
import { ExpandedIcon } from './components/ExpandedIcon';
import { CollapsedIcon } from './components/CollapsedIcon';

export const TreeNode = ({ node }: { node: TreeNodeModel }) => {
  const {
    setSelectedNodeId,
    expandedNodeIds,
    setExpandedNodeIds,
    getSelectedNode,
  } = useTreeContext();
  const isExpanded: boolean = expandedNodeIds[node.id] || false;
  const selectedNode: TreeNodeModel | null = getSelectedNode();

  const handleNodeClick = () => {
    setSelectedNodeId(node.id);
    if (node.type === 'folder') {
      setExpandedNodeIds((prev) => ({
        ...prev,
        [node.id]: !isExpanded,
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
      <div
        className="flex"
        onClick={() => handleNodeClick()}
        style={{ cursor: 'pointer' }}
      >
        {renderStatusIcon()}
        <div
          className={clsx('mx-1 px-1', {
            'bg-slate-400': node.id === selectedNode?.id,
          })}
        >
          {node.name}
        </div>
      </div>
      {isExpanded && node.children && (
        <ul className="pl-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

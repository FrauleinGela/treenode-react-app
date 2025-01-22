import { TreeNodeModel } from '../../types/treeNode';
import { useTreeContext } from '../../context/TreeContext';
import clsx from 'clsx';

const ExpandedIcon = () => (
  <svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1.707 2.707 5.586 5.586a1 1 0 0 0 1.414 0l5.586-5.586A1 1 0 0 0 13.586 1H2.414a1 1 0 0 0-.707 1.707Z"
    />
  </svg>
);

const CollapsedIcon = () => (
  <svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 16"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"
    />
  </svg>
);

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

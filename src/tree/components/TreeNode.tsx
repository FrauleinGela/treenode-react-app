import { useState } from 'react';
import { TreeNodeModel } from '../../types/treeNode';
import { useTreeContext } from '../../context/TreeContext';

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
  const [expanded, setExpanded] = useState(false);
  const { selectedNodeId, setSelectedNodeId } = useTreeContext();

  const handleNodeClick = () => {
    setSelectedNodeId(node.id);
    if (node.type === 'folder') {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <li className="block cursor-pointer min-w-[300px] whitespace-nowrap py-2">
      <div
        className="flex"
        onClick={() => handleNodeClick()}
        style={{ cursor: 'pointer' }}
      >
        {node.type === 'folder' ? (
          expanded ? (
            <ExpandedIcon />
          ) : (
            <CollapsedIcon />
          )
        ) : (
          <div className="w-6 h-6"></div>
        )}
        {node.name}
      </div>
      {expanded && node.children && (
        <ul style={{ paddingLeft: 20 }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

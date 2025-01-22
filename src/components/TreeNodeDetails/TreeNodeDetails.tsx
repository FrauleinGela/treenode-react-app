import clsx from 'clsx';
import { useTreeContext } from '../../context/TreeContext';

export const TreeNodeDetails = () => {
  const { getSelectedNode } = useTreeContext();
  const selectedNode = getSelectedNode();

  if (!selectedNode) {
    return '';
  }

  return selectedNode.children && selectedNode.children.length > 0 ? (
    <div className="flex-1 px-6">
      {selectedNode.children && selectedNode.children.length > 0 && (
        <ul className="list-none gap-4 flex flex-wrap">
          {selectedNode.children.map((child) => (
            <li key={child.id}>
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
        </ul>
      )}
    </div>
  ) : (
    <div>
      <div>name: {selectedNode.name}</div>
      <div>type: {selectedNode.type}</div>
    </div>
  );
};

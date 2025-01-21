export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="p-4 flex border-r-2 border-black min-w-[300px] w-[300px] h-screen overflow-auto">
      {children}
    </aside>
    
  );
};

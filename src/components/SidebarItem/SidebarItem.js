import "./SidebarItem.css";

const SidebarItem = ({ heading, children, footing }) => {
  return (
    <div className="sidebar-item">
      <header className="sidebar-item-header">
        <h2 className="heading-white">{heading}</h2>
      </header>
      <main className="sidebar-item-main">{children}</main>
      {footing ? (
        <footer className="sidebar-item-footer">{footing}</footer>
      ) : null}
    </div>
  );
};

export default SidebarItem;

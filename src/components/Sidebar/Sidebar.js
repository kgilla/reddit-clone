import "./Sidebar.css";

const Sidebar = ({ sub }) => {
  return (
    <div id="sidebar-container">
      <div className="sidebar-item">
        <header className="sidebar-item-header">
          {" "}
          <h2>{sub.name}</h2>
        </header>
        <main className="sidebar-item-content">
          {" "}
          <p>{sub.description}</p>
        </main>
        <footer className="sidebar-item-footer">{sub.dateCreated}</footer>
      </div>
      <div className="sidebar-item">
        <button>Create Post</button>
        <button>Create Community</button>
      </div>
      <div className="sidebar-item">
        <button>Create Post</button>
        <button>Create Community</button>
      </div>
    </div>
  );
};

export default Sidebar;

import "./Flash.css";
import { useFlash } from "../../hooks/use-flash-message";

const Flash = () => {
  const flash = useFlash();

  return flash.showMessage ? (
    <div className="flash-container">
      <aside className="blue-bar"></aside>
      <span className="flash-message">{flash.message}</span>
    </div>
  ) : null;
};

export default Flash;

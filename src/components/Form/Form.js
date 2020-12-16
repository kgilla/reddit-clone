import "./Form.css";
import imageOne from "../../images/benn-mcguinness-vWbBC7G2BQQ-unsplash.jpg";
import imageTwo from "../../images/jon-tyson-OdRHKuvoa4M-unsplash (1).jpg";

const Form = ({ image, click, btn, title, children }) => {
  return (
    <div className="form-container">
      <div className="form-art" style={{ backgroundImage: imageTwo }}></div>
      <form className="form-left">
        <h2 className="form-heading">{title}</h2>
        {children}
        <button className="button-filled" onClick={click}>
          {btn}
        </button>
      </form>
    </div>
  );
};

export default Form;

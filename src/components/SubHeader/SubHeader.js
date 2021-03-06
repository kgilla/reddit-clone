import "./SubHeader.css";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";
import SubscribeButton from "../SubscribeButton";
import { Options2 } from "@styled-icons/evaicons-solid";

const SubHeader = ({ subData }) => {
  const auth = useAuth();
  return (
    <header className="sub-header-container">
      <div
        className="community-theme"
        style={subData.color ? { backgroundColor: subData.color } : null}
      ></div>
      <div className="lower-header-container">
        <div className="header-main-container">
          <div className="sub-image"></div>
          <div className="header-sub-container">
            <div className="sub-title-container">
              <h1 className="sub-title">{subData.name}</h1>
            </div>
            <div className="sub-header-buttons">
              {auth.user ? <SubscribeButton subData={subData} /> : null}
              {auth.user && subData.creator === auth.user._id ? (
                <Link
                  to={`/s/${subData._id}/update`}
                  className="button-filled nav-button"
                >
                  <Options2 className="button-icon" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SubHeader;

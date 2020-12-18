import "./SubHeader.css";
import { useAuth } from "../../hooks/use-auth";
import SubscribeButton from "../../SubscribeButton";

const SubHeader = ({ subData }) => {
  const auth = useAuth();
  return (
    <header className="sub-header-container">
      <div className="community-theme"></div>
      <div className="lower-header-container">
        <div className="header-main-container">
          <div className="sub-image"></div>
          <div className="header-sub-container">
            <div className="sub-title-container">
              <h1 className="sub-title">{subData.name}</h1>
              <span className="sub-address">{`s/${subData.name}`}</span>
            </div>
            {auth.user ? <SubscribeButton subData={subData} /> : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SubHeader;
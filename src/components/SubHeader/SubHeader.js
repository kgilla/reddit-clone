import "./SubHeader.css";

import SubscribeButton from "../SubscribeButton";

const SubHeader = ({ subData, user, updateUser, token }) => {
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
            {user ? (
              <SubscribeButton
                subData={subData}
                user={user}
                token={token}
                updateUser={updateUser}
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SubHeader;

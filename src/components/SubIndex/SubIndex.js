import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import moment from "moment";
import "./SubIndex.css";

import Loader from "../Loader";
import SubscribeButton from "../SubscribeButton";

const SubIndex = () => {
  const auth = useAuth();

  const [subs, setSubs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchGetData("http://localhost:3000/api/s/");
      setSubs(response.subs);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div id="sub-index-container">
      <header id="sub-index-header">
        <h3 className="white-heading">Browse Communities</h3>
        <Link to="create" className="button-outline nav-button">
          Create Community
        </Link>
      </header>
      <div id="sub-index">
        {isLoading ? (
          <Loader />
        ) : subs ? (
          subs.map((sub) => (
            <div className="sub-preview-large">
              <div
                className="sub-circle"
                style={sub.color ? { backgroundColor: sub.color } : null}
              ></div>
              <span className="sub-name preview-item">{sub.name}</span>
              <span className="preview-item">
                {sub.subscribers} Subscribers
              </span>
              {auth.user ? <SubscribeButton subData={sub} /> : null}
              <Link
                to={`${sub._id}`}
                key={sub._id}
                className="sub-preview-link"
              />
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default SubIndex;

import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { Link } from "react-router-dom";
import "./SubIndex.css";

import Loader from "../Loader";

const SubIndex = () => {
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
        <h1>Browse Communities</h1>
        <Link to="create" className="button-filled">
          Create Community
        </Link>
      </header>
      <div id="sub-index">
        {isLoading ? (
          <Loader />
        ) : subs ? (
          subs.map((sub) => (
            <Link to={`${sub._id}`} key={sub._id} className="sub-preview-link">
              <div className="sub-preview">{sub.name}</div>
            </Link>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default SubIndex;

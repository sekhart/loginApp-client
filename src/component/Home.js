import React, { useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

export default function Home({ data, isLoggedIn }) {
  const currentUser = data.name;
  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    console.log("New path:", pathname);
  }, [location.pathname]);

  let homeBody;
  if (isLoggedIn) {
    homeBody = <h2>Welcome {currentUser}</h2>;
  } else {
    homeBody = (
      <h2>
        Please <Link to="/login">Login</Link>
      </h2>
    );
  }

  return <div>{homeBody}</div>;
}

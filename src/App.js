import React, { useEffect, useState } from "react";
import Home from "./component/Home";
import "./index.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NotFound from "./common/NotFound";
import Login from "./component/user/login";
import Logout from "./component/user/Logout";
import { getCurrentUser } from "./api/APIService";
import { ACCESS_TOKEN } from "./util/constants";
import { useHistory, useLocation } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";

const App = () => {
  const [currentUser, setCurretnUser] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    loadCurrentUser();
  }, [location.pathname]);

  function loadCurrentUser() {
    setIsLoading(true);

    getCurrentUser()
      .then((response) => {
        setCurretnUser(response);
        setAuthenticated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    history.push("/login");
    window.location.href = "/login";
  }

  return (
    <div>
      {isAuthenticated && (
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">
              <div onClick={handleLogout}>Logout</div>
            </Link>
          </li>
        </ul>
      )}

      {!isAuthenticated && (
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}

      <hr />
      <Switch>
        <Route exact path="/">
          <Home data={currentUser} isLoggedIn={isAuthenticated} />
        </Route>
        <Route exact path="/home">
          <Home data={currentUser} isLoggedIn={isAuthenticated} />
        </Route>
        <Route exact path="/login">
          <Login data={isAuthenticated} />
        </Route>
        <PrivateRoute
          authenticated={isAuthenticated}
          path="/home"
          component={Home}
          handleLogout={handleLogout}
        ></PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

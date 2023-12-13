import React from "react";
import { Route } from "react-router-dom";
import Homepage from "./HomePage";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import PrivateRoute from "./PrivateRoute";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function MyRoutes({ login, signup }) {

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <PrivateRoute exact path="/companies">
            <CompanyList />
          </PrivateRoute>

          <PrivateRoute exact path="/jobs">
            <JobList />
          </PrivateRoute>

          <PrivateRoute exact path="/companies/:handle">
            <CompanyDetail />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <ProfileForm />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default MyRoutes;

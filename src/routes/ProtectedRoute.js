import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

export let ProtectedRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};


const mapStateToProps = (state) =>({
    authenticated: state.utils.isAuthenticated
})

ProtectedRoute = connect(mapStateToProps)(ProtectedRoute);
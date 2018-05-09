import React from "react";
import { Route } from "react-router-dom";
import Dashboard from './Dashboard'

export default function Router() {
  return (
    <React.Fragment>
      <Route path="/" component={Dashboard} />
    </React.Fragment>
  );
}

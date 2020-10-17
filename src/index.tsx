import { h } from "preact";
import { Route, Router } from "preact-router";

import "./index.css";

import Home from "./routes/home";
import NotFound from "./routes/notfound";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route default component={NotFound} />
    </Router>
  );
};

export default App;

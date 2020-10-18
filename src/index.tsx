import { h } from "preact";
import { Route, Router } from "preact-router";

import "./index.css";

import Header from "./header";
import Footer from "./footer";
import Home from "./routes/home";
import NotFound from "./routes/notfound";

const App = () => {
  return (
    <div>
      <Header />

      <Router>
        <Route path="/" component={Home} />
        <Route default component={NotFound} />
      </Router>

      <Footer />
    </div>
  );
};

export default App;

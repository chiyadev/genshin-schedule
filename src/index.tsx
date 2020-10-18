import { h } from "preact";
import { Route, Router } from "preact-router";

import "./index.css";

import Header from "./header";
import Footer from "./footer";
import Home from "./routes/home";
import Customize from "./routes/customize";
import CharacterInfo from "./routes/character";
import WeaponInfo from "./routes/weapon";
import NotFound from "./routes/notfound";

const App = () => {
  return (
    <div>
      <Header />

      <Router>
        <Route path="/" component={Home} />
        <Route path="/customize" component={Customize} />
        <Route path="/characters/:character" component={CharacterInfo} />
        <Route path="/weapons/:weapon" component={WeaponInfo} />
        <Route default component={NotFound} />
      </Router>

      <Footer />
    </div>
  );
};

export default App;

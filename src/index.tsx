import { h } from "preact";
import { Route, Router } from "preact-router";
import { useState } from "preact/hooks";

import "./index.css";

import Background from "./background";
import Header from "./header";
import Footer from "./footer";
import Home from "./routes/home";
import Map from "./routes/map";
import Customize from "./routes/customize";
import CharacterInfo from "./routes/character";
import WeaponInfo from "./routes/weapon";
import NotFound from "./routes/notfound";

const specialRoutes = ["/map"];

const App = () => {
  const [path, setPath] = useState(window.location.pathname);
  const special = specialRoutes.includes(path);

  return (
    <div>
      <Background />

      {!special && <Header />}

      <div>
        <Router url={path} onChange={({ url }) => setPath(url)}>
          <Route path="/" component={Home} />
          <Route path="/map" component={Map} />
          <Route path="/customize" component={Customize} />
          <Route path="/characters/:character" component={CharacterInfo} />
          <Route path="/weapons/:weapon" component={WeaponInfo} />
          <Route default component={NotFound} />
        </Router>
      </div>

      {!special && <Footer />}
    </div>
  );
};

export default App;

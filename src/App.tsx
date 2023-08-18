import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import ResumeTab from "./containers/Resume";
import { Welcome } from "./views/Welcome/Welcome";
// import Test from './components/Test';
import MineGame from "./containers/MineGame";
import SvgBuilder from "./containers/SvgBuilder";
import PlaygroundWrapper from "./components/PlaygroundWrapper";
import Nav from "./components/Nav/Nav";

import Footer, { FOOTER_HEIGHT } from "./components/Footer";
import Sandbox from "./views/Sandbox/Sandbox";

/* Quotes:

- Wisdom begins in Wonder -Socrates

- This is what separates artists from ordinary people: the belief, deep in our hearts,
	that if we build our castles well enough, somehow the ocean won't wash them away -Anne Lamott

- Be curious, not judgmental -Walt Whitman

- Blessed are those who give without remembering and take without forgetting -Elizabeth Bibesco

- There is neither happiness nor misery in the world; there is only the
	comparison of one state with another -Alexandre Dumas

- If you ask me what I came into this life to do, I will tell you: I came to live out loud -Emile Zola

- Whatever you are, be a good one -William Makepeace Thackeray

- If I had asked people what they wanted, they would have said faster horses - Henry Ford
*/

function App(): JSX.Element {
  return (
    <Router>
      <div className="app-root">
        <Nav />
        <Routes>
          <Route path={"/site/sandbox/:projectName?"} Component={Sandbox} />
          <Route path={"/site"} Component={Welcome} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

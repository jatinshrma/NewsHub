import React,{ useState } from "react";
import Navbar from './custom components/navbar'
import NewsContainer from './custom components/newsContainer'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

function App() {

  const [progress,setProgress] = useState(0);
  
  return (
      <Router>
        <Navbar visiblity={false}/>
        <LoadingBar
        color='#f11946'
        progress={progress}/>
        <Switch>
          <Route exact path="/"><NewsContainer setProgress={setProgress} key="home"/></Route>
          <Route exact path="/general"><NewsContainer setProgress={setProgress} key="general" category="general"/></Route>
          <Route exact path="/business"><NewsContainer setProgress={setProgress} key="business" category="business"/></Route>
          <Route exact path="/entertainment"><NewsContainer setProgress={setProgress} key="entertainment" category="entertainment"/></Route>
          <Route exact path="/health"><NewsContainer setProgress={setProgress} key="health" category="health"/></Route>
          <Route exact path="/science"><NewsContainer setProgress={setProgress} key="science" category="science"/></Route>
          <Route exact path="/sports"><NewsContainer setProgress={setProgress} key="sports" category="sports"/></Route>
          <Route exact path="/technology"><NewsContainer setProgress={setProgress} key="technology" category="technology"/></Route>
        </Switch>
      </Router>
    );
}

export default App;

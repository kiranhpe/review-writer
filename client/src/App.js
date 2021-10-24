import "./App.scss";
import {Switch, Route, HashRouter } from "react-router-dom";

import { Suspense,lazy } from "react";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
const App = () => {
  return (
    <div>
     <HashRouter>
        <Suspense fallback={()=> {return <span>Loading....</span>}}> 
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/admin' component={Admin} />
          <Route path="*" component={Home}>
          </Route>
        </Switch>
        </Suspense>
      </HashRouter>
    </div>
  );
};

export default App;

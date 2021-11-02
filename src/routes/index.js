import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../pages/home'
import Entry from "../pages/entry";

function Routes () {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/admin">
                        <Entry />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Routes;
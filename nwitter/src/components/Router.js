import react, { useState } from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({isLogedIn}) => {
    return (
        <Router>
            {isLogedIn && <Navigation />}
            <Switch>
                {isLogedIn ? ( 
                <>
                    <Route exact path="/">
                        <Home />
                    </Route> 
                    <Route exact path="/profile">
                        <Profile />
                    </Route> 
                </>
                ) : (
                  <>
                    <Route exact path="/">
                        <Auth />
                    </Route>
                  </>
                )}
            </Switch>
        </Router>
    ) 
}

export default AppRouter;
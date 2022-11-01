import react, { useState } from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLogedIn, userObj }) => {
    return (
        <Router>
            {isLogedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLogedIn ? ( 
                <>
                    <Route exact path="/">
                        <Home userObj={userObj}/>
                    </Route> 
                    <Route  exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}/>
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
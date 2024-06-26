import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotsShow from './components/SpotsShow'
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";
import { Booking } from "./components/Booking";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/">
          <SpotsIndex />
        </Route>
        <Route exact path='/spots/new'>
          <CreateSpot />
        </Route>
        <Route exact path='/spots/current'>
          <ManageSpots />
        </Route>
        <Route exact path='/spots/:id/edit'>
          <UpdateSpot />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotsShow />
        </Route>
        <Route exact path='/booking/:spotId'>
          <Booking />
        </Route>
        <Route>404 Page Not Found</Route>
        </Switch>}
    </>
  );
}

export default App;
import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';
import Appointment from './Components/Appointment/Appointment';
import Doctor from './Components/Doctor/Doctor';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Services from './Components/HomePage/Services/Services';
import Blogs from './Components/HomePage/Blogs/Blogs';
import Contact from './Components/HomePage/Contact/Contact';
import FeaturedService from './Components/HomePage/FeaturedService/FeaturedService';
import Testimonials from './Components/HomePage/Testimonials/Testimonials';

export const UserContext = createContext();

function App() {

    const [loggedInUser, setLoggedInUser] = useState({})

    return (

        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

            <div>
                <Router>
                    <Switch>

                        {/* <Route exact path="/" >
                            <HomePage></HomePage>
                        </Route> */}

                        <Route exact path="/">
                            <Header></Header>
                            <HomePage></HomePage>
                        </Route>

                        <Route path="/login" >
                            <Login></Login>
                        </Route>

                        {/*  <Route path="/doctor">
                            <Doctor></Doctor>
                        </Route> */}

                        <PrivateRoute path="/doctor">
                            <Header></Header>
                            <Doctor></Doctor>
                        </PrivateRoute>

                        <Route path="/appointment">
                            <Header></Header>
                            <Appointment></Appointment>
                        </Route>

                        <Route path="/services">
                            <Header></Header>
                            <Services></Services>
                        </Route>

                        <Route path="/blogs">
                            <Header></Header>
                            <Blogs></Blogs>
                        </Route>

                        <Route path="/contact">
                            <Header></Header>
                            <Contact></Contact>
                        </Route>

                        <Route path="/about">
                            <Header></Header>
                            <FeaturedService></FeaturedService>
                        </Route>

                        <Route path="/review">
                            <Header></Header>
                            <Testimonials></Testimonials>
                        </Route>

                    </Switch>
                </Router>
            </div>

        </UserContext.Provider>
    );
}

export default App;

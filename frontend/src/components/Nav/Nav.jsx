import "./Nav.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from '../../contexts/AppContext';
import cn from 'classnames';

function Nav() {
  const {  currentSection } = useContext(AppContext);

    let speakersEnabled = window._env_.FEATURE_SPEAKERS_ENABLED
    let ticketsEnabled = window._env_.FEATURE_TICKETS_ENABLED
    let c4pEnabled = window._env_.FEATURE_C4P_ENABLED

    return (
      <div className={  cn({
          ["Nav"]: true,
          ["--backoffice"]: currentSection === "back-office",
        })}>
        <div className="Nav__container">
          {currentSection !== "back-office" && (
            <div className="Nav__main">

              <span>
                <NavLink activeClassName='--active' to='/agenda-page' exact> Agenda</NavLink>
              </span>
              <span>
                   { speakersEnabled && (
                <NavLink activeClassName='--active' to='/speakers-page' exact> Speakers</NavLink>
                   )}
              </span>
                { ticketsEnabled && (
                  <span>
                    <NavLink activeClassName='--active' to='/tickets-page' exact> Tickets</NavLink>
                  </span>
                )}
                { c4pEnabled && (
              <span>
                <NavLink activeClassName='--active' to='/proposals-page' exact> Proposals</NavLink>
              </span>
                )}
              <span>
                <NavLink activeClassName='--active' to='/about-page' exact> About</NavLink>
              </span>
            </div>
          )}
          <div className="Nav__back-office">
            {currentSection !== "back-office" && (
              <span>
                <NavLink activeClassName='--active' to='/back-office-page' exact> -> </NavLink>
              </span>
            )}
            {currentSection === "back-office" && (
              <span>
                <NavLink activeClassName='--active' to='/' exact> Back to Site </NavLink>
              </span>
            )}
          </div>
        </div>
      </div>
    );

}
export default Nav;

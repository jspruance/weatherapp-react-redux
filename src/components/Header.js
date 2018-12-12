import React from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { logOut } from "../actions/authActions";
import { toggleTempScale } from "../actions/weatherActions";

const Header = props => {
  const handleLogOut = event => {
    event.preventDefault();
    props.logOut();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="float-left">
          <img src="/globe_b.png" alt="logo" />
          <a href="/" className="navbar-brand align-middle">
            {props.title}
          </a>
        </div>
        <div className="float-right">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                weather
              </a>
            </li>
            <li className="nav-item">
              <a href="/register" className="nav-link">
                register
              </a>
            </li>
            {props.isAuthenticated ? (
              <li className="nav-item">
                <a href="/" onClick={handleLogOut} className="nav-link">
                  log out
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a href="/login" className="nav-link">
                  log in
                </a>
              </li>
            )}
            <li className="nav-item">
              <Toggle
                defaultChecked={!props.celsius}
                icons={false}
                onChange={props.toggleTempScale}
              />
            </li>
            <li className="nav-item">
              <span className="temp-scale-label">&#8451; / &#8457;</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  celsius: state.weather.celsius
});

export default connect(
  mapStateToProps,
  { logOut, toggleTempScale }
)(Header);

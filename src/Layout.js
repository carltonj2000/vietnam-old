import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import HomeIcon from "@material-ui/icons/Home";
import CameraIcon from "@material-ui/icons/CameraAlt";
import ItineraryIcon from "@material-ui/icons/Assignment";
import clsx from "clsx";

import { Link, useLocation } from "react-router-dom";

import flag from "./images/Flag_of_Vietnam.svg";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};
const useStyles = makeStyles(theme => ({
  home: {
    flexGrow: 1,
    marginLeft: "8px"
  },
  title: {
    borderRadius: "5px",
    color: "#ff0",
    padding: "0 4px",
    "&:hover": {
      background: "rgba(218,37, 29, 0.5)"
    }
  },
  icon: {
    width: 28,
    borderRadius: "5px",
    color: "rgba(255,255, 0, 0.8)",
    marginRight: "14px",
    "&:hover": {
      background: "rgba(218,37, 29, 0.5)"
    }
  },
  active: {
    color: "rgba(255,255, 0, 1)",
    background: "rgba(218,37, 29, 1)"
  },
  flag: {
    height: 28
  }
}));

export default function HideAppBar(props) {
  const classes = useStyles();
  const location = useLocation();
  const p = location.pathname;
  const cls = pIn =>
    p === pIn ? clsx(classes.icon, classes.active) : clsx(classes.icon);
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Link to="/itinerary" style={{ textDecoration: "none" }}>
              <ItineraryIcon className={cls("/itinerary")} />
            </Link>
            <Link to="/photos" style={{ textDecoration: "none" }}>
              <CameraIcon className={cls("/photos")} />
            </Link>
            <Link to="/activities" style={{ textDecoration: "none" }}>
              <Typography variant="h6" className={classes.title}>
                Vietnam Trip
              </Typography>
            </Link>
            <a
              href="/main"
              className={classes.home}
              style={{ textDecoration: "none" }}
            >
              <HomeIcon className={cls("/main")} />
            </a>
            <Link to="/tc">
              <img src={flag} alt="Vietnam Flag" className={classes.flag} />
            </Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        <Box my={2}>{props.children}</Box>
      </Container>
    </React.Fragment>
  );
}

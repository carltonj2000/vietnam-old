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

import { Link } from "react-router-dom";

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
  title: {
    flexGrow: 1
  },
  icon: {
    width: 28,
    color: "#da251d",
    marginRight: "14px"
  },
  flag: {
    height: 28
  }
}));

export default function HideAppBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none" }}>
              <HomeIcon className={classes.icon} />
            </Link>
            <Typography variant="h6" className={classes.title}>
              Vietnam Trip
            </Typography>
            <Link to="/tc">
              <img src={flag} alt="Vietnam flag" className={classes.flag} />
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

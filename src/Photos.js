import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "./Layout";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    //minWidth: 650
  }
}));

function DenseTable(props) {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>photos go here</div>
    </Layout>
  );
}

DenseTable.defaultProps = {
  showLinks: false,
  showTimes: false
};

export default DenseTable;

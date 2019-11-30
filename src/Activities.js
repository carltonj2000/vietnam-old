import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Layout from "./Layout";

import activities from "./activities.json";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  }
}));

function DenseTable(props) {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map(({ location, attractions }, lid) => {
                return attractions.map((attraction, aid) => {
                  return (
                    <TableRow key={`${lid}${aid}`}>
                      <TableCell>{aid === 0 && location}</TableCell>
                      <TableCell>{aid !== 0 && attraction}</TableCell>
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Layout>
  );
}

DenseTable.defaultProps = {
  showLinks: false,
  showTimes: false
};

export default DenseTable;

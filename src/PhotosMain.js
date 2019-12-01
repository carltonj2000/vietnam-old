import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import Layout from "./Layout";
import tileData from "./img_cover-pictures-man.js";

const useStyles = makeStyles(theme => ({
  root: {
    background: "white",
    display: "grid",
    width: "100%",
    gridGap: "4px",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))"
  },
  card: {
    position: "relative",
    maxWidth: 345
  },
  img: {
    height: 140
  },
  overlay: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    color: "rgba(255, 255, 0, 0.8)",
    backgroundColor: "rgba(0, 0, 255, 0.3)",
    width: "100%"
  }
}));

function DenseTable() {
  const classes = useStyles();
  const tiles = tileData.length;
  console.log(tiles);
  return (
    <Layout>
      {!tiles ? (
        <Typography variant="body2" color="inherit" component="p">
          "Coming Soon"
        </Typography>
      ) : (
        <div className={classes.root}>
          {tileData.map(tile => (
            <Link key={tile.route} to={tile.route}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.img}
                    alt={tile.description}
                    image={tile.img}
                  />
                </CardActionArea>
                <CardContent className={classes.overlay}>
                  <Typography variant="body2" color="inherit" component="p">
                    {tile.description || "Desciption TBD"}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}

DenseTable.defaultProps = {
  showLinks: false,
  showTimes: false
};

export default DenseTable;

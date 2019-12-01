import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";

import Layout from "./Layout";

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
  imgModal: {
    width: "100%"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    color: "rgba(218, 37, 29, 1)",
    backgroundColor: "rgba(255, 255, 0, 1)",
    borderRadius: "12px",
    margin: "16px",
    border: "1px solid #da251d"
  }
}));

function DenseTable({ tileData }) {
  const tiles = tileData.length;

  const classes = useStyles();

  const [open, openSet] = React.useState(false);
  const [tile, tileSet] = React.useState(null);
  const [photo, photoSet] = React.useState(0);

  const next = () => {
    const nxt = (photo + 1) % tiles;
    photoSet(nxt);
    tileSet(tileData[nxt]);
  };

  const prev = () => {
    const prv = photo === 0 ? tiles - 1 : photo - 1;
    photoSet(prv);
    tileSet(tileData[prv]);
  };
  /*
   * swiping code is based on the following links
   * https://css-tricks.com/simple-swipe-with-vanilla-javascript/
   * https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
   */
  // Swipe Up / Down / Left / Right
  let initialX = null;
  let initialY = null;

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function startTouch(e) {
    initialX = unify(e).clientX;
    initialY = unify(e).clientY;
  }

  function moveTouch(e) {
    if (initialX === null) return;
    if (initialY === null) return;

    var currentX = unify(e).clientX;
    var currentY = unify(e).clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) prev();
      else next();
    } else {
      if (diffY > 0) next();
      else prev();
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
  }

  const handleOpen = i => {
    photoSet(i);
    tileSet(tileData[i]);
    openSet(true);
  };
  const handleClose = () => openSet(false);

  return (
    <Layout>
      {!tiles ? (
        <Typography variant="body2" color="inherit" component="p">
          "Coming Soon"
        </Typography>
      ) : (
        <div className={classes.root}>
          {tileData.map((tile, idx) => (
            <Card
              key={tile.filename}
              className={classes.card}
              onClick={() => handleOpen(idx)}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.img}
                  alt={tile.description || tile.filename}
                  image={tile.img}
                />
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        {!tile ? (
          <p>Loading</p>
        ) : (
          <>
            <img
              className={classes.imgModal}
              alt={tile.description || tile.filename}
              src={tile.img}
              onTouchStart={startTouch}
              onTouchEnd={moveTouch}
              onMouseDown={startTouch}
              onMouseUp={moveTouch}
            />
            <CloseIcon className={classes.icon} onClick={handleClose} />
          </>
        )}
      </Modal>
    </Layout>
  );
}

DenseTable.defaultProps = {
  showLinks: false,
  showTimes: false
};

export default DenseTable;

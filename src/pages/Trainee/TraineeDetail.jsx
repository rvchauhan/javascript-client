import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import trainees from './data/trainee';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();
  const { traineeId } = useParams();
  const found = trainees.find((element) => element.id === traineeId);
  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image="../../../public/d.webp"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h1" variant="h5">
              {found.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {found.email}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {found.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  );
}

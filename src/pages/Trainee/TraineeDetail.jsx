import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import trainees from './data/trainee';
import NoMatch from '../NoMatch/NoMatch';
import { Button } from '../../components/Button/index';

const useStyles = makeStyles(() => ({
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

function getDateFormat(date) {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss');
}

export default function MediaControlCard() {
  const classes = useStyles();
  const history = useHistory();
  const { traineeId } = useParams();
  const found = trainees.find((element) => element.id === traineeId);
  if (!found) {
    return (
      <NoMatch />
    );
  }
  return (
    <>
      <Card className={classes.root}>

        <CardMedia
          className={classes.cover}
          image="https://www.melissa.com.br/assets/img/thumbnail.png"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h1" variant="h5">
              {found.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {getDateFormat(found.createdAt)}
            </Typography>
            <Typography component="h1" variant="subtitle1">
              {found.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <br />
      <div align="center">
        <Button value="cancel" onClick={() => history.goBack()} />
      </div>
    </>
  );
}

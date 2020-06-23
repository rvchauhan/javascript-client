import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const TraineeRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:traineeId`} component={TraineeDetail} />
    </Switch>
  );
};


export default TraineeRoutes;

import { Link, Route } from "react-router-dom";
import React from 'react';

interface IProps {
  match: any
}

const Topic:React.FC<IProps> = ({ match }: { match: any }) => {
  return <h3>Requested Param: {match.params.id}</h3>;
}

const Topics:React.FC<IProps> = ({ match }: { match: any }) => {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

export default Topics
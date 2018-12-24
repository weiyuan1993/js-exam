import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';

import TabWidget from 'app/components/Widgets/TabWidget';

const PrivateRoute = ({
  component: Component,
  render: RenderComponent,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => [
      <TabWidget key="tabWidget" {...props} />,
      Component ? (
        <Component key="component" {...props} />
      ) : (
        <RenderComponent key="renderComponent" {...props} />
      )
    ]}
  />
);

export default withAuthenticator(PrivateRoute);

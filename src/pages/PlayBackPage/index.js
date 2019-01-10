import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import { getTest } from 'graphql/queries';
import { onCreateRoom } from 'graphql/subscriptions';

import CommentBox from 'components/CommentBox';
import CreateRoomView from 'containers/CreateRoomView';

const PlayBakPge = props => (
  <div>
    <div>
      {/* TODO: Room list with with lazy-loading next dataset. Here we load 1000 rooms instead. */}
      <Connect
        query={graphqlOperation(getTest, {
          id: 'a2bd44d0-30a0-481c-997e-1e05972153f6',
          limit: 1000,
        })}
      >
        {({ data: { getTest: test }, loading, error }) => {
          console.log(test, '2390ruewfihodln');
          if (error) return <h3>Error</h3>;
          if (loading || !test) return <h3>Loading...</h3>;
          return <div>2-w9ur0hgionfdkvled</div>
        }}
      </Connect>
    </div>
    <div>
      <CommentBox {...props} />
    </div>
  </div>
);

export default PlayBakPge;

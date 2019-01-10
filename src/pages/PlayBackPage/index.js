import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import Playback from 'containers/Playback';

import CommentBox from 'components/CommentBox';
import { getTest } from './queries';

const PlayBakPge = props => (
  <div>
    <div>
      {/* TODO: Room list with with lazy-loading next dataset. Here we load 1000 rooms instead. */}
      <Connect
        query={graphqlOperation(getTest, {
          id: 'd1fe7b83-c6fa-4907-a809-6a2c07ad55c5',
        })}
      >
        {({ data: { getTest: test }, loading, error }) => {
          console.log(test, '2390ruewfihodln');
          if (error) return <h3>Error</h3>;
          if (loading || !test) return <h3>Loading...</h3>;
          return <Playback testData={test} records={test.records.items} />;
        }}
      </Connect>
    </div>
    <div>
      <CommentBox {...props} />
    </div>
  </div>
);

export default PlayBakPge;

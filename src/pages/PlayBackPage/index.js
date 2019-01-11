import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import Playback from 'containers/Playback';

import CommentBox from 'components/CommentBox';
import { getTest } from './queries';

const sortRecords = records =>
  records.sort(
    (a, b) => new Date(a.timeBegin).getTime() - new Date(b.timeBegin).getTime(),
  );

const PlayBakPge = props => (
  <div>
    <div>
      <Connect
        query={graphqlOperation(getTest, {
          id: props.match.params.testId,
          limit: 50,
        })}
      >
        {({ data: { getTest: test }, loading, error }) => {
          console.log('#getTest', test);
          if (error) return <h3>Error</h3>;
          if (loading || !test) return <h3>Loading...</h3>;
          return (
            <Playback
              testData={test}
              records={sortRecords(test.records.items)}
            />
          );
        }}
      </Connect>
    </div>
    <div>
      <CommentBox {...props} />
    </div>
  </div>
);

export default PlayBakPge;

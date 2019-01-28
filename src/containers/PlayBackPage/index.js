import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import Comment from './Comment';

import { getTest } from './queries';

const sortRecords = records =>
  records.sort(
    (a, b) => new Date(a.timeBegin).getTime() - new Date(b.timeBegin).getTime(),
  );

class PlaybackPage extends React.PureComponent {
  render() {
    const { testId } = this.props.match.params;
    return (
      <div>
        <Connect
          query={graphqlOperation(getTest, {
            id: testId,
          })}
        >
          {({ data: { getTest: test }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !test) return <h3>Loading...</h3>;
            return (
              <Comment
                testData={test}
                records={sortRecords(test.records.items)}
              />
            );
          }}
        </Connect>
      </div>
    );
  }
}

export default PlaybackPage;

import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
import { Tabs } from 'antd';

import Playback from 'containers/Playback';

import { getTest } from './queries';

const TabPane = Tabs.TabPane;

class PlayBakPge extends React.PureComponent {
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
            console.log(test, '2390ruewfihodln');
            if (error) return <h3>Error</h3>;
            if (loading || !test) return <h3>Loading...</h3>;
            return (
              <Tabs tabPosition="left" size="large">
                <TabPane tab="Comment" key="1">
                  <Playback testData={test} records={test.records.items} />
                </TabPane>
                <TabPane tab="Video" key="2">Content of Tab 2</TabPane>
              </Tabs>
            );
          }}
        </Connect>
      </div>
    );
  };
};

export default PlayBakPge;

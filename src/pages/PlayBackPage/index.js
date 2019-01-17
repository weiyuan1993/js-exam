import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
import { Tabs, Select } from 'antd';

import Playback from 'containers/Playback';
import RecordVideo from 'components/RecordVideo';

import { getTest } from './queries';

const TabPane = Tabs.TabPane;
const { Option } = Select;

const sortRecords = records =>
  records.sort(
    (a, b) => new Date(a.timeBegin).getTime() - new Date(b.timeBegin).getTime(),
  );

class PlaybackPage extends React.PureComponent {
  state = {
    recordIndex: 0,
    recordList: [],
    videoUrl: '',
  };

  setRecord = records => {
    const { recordIndex } = this.state;
    this.setState({
      recordList: records,
      videoUrl: records[recordIndex].videoUrl,
    });
  };

  onChange = index => {
    const { recordList } = this.state;
    this.setState({
      videoUrl: recordList[index].videoUrl,
      recordIndex: index,
    });
  };

  render() {
    const { testId } = this.props.match.params;
    const { recordIndex, recordList, videoUrl } = this.state;
    const { setRecord, onChange } = this;
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
            setRecord(test.records.items);
            return (
              <Tabs defaultActiveKey="1" tabPosition="left" size="large">
                <TabPane tab="Comment" key="1">
                  <Playback
                    testData={test}
                    records={sortRecords(test.records.items)}
                  />
                </TabPane>
                <TabPane tab="Video" key="2" style={{ paddingTop: '10px' }}>
                  <Select
                    onChange={onChange}
                    defaultValue={recordIndex}
                    value={recordIndex}
                    style={{
                      minWidth: 200,
                      width: 350,
                      marginBottom: 20,
                      display: 'block',
                    }}
                    size="large"
                  >
                    {recordList.map(
                      (item, i) =>
                        item.videoUrl && (
                          <Option key={item.id} value={i}>
                            {item.ques ? item.ques.name : null}
                          </Option>
                        ),
                    )}
                  </Select>
                  <RecordVideo fileName={videoUrl} />
                </TabPane>
              </Tabs>
            );
          }}
        </Connect>
      </div>
    );
  }
}

export default PlaybackPage;

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphqlOperation } from 'aws-amplify';

import injectReducer from 'utils/injectReducer';

import PlaybackControlWidget from 'components/Widgets/PlaybackControlWidget';
import ReactPage from 'components/PlaybackView/React';
import JavaScriptPage from 'components/PlaybackView/JavaScript';

import { REDUCER_KEY } from './constants';
import { fetchRecordWithHistory } from './actions';
import reducer from './reducer';
const PlaybackView = args => {
  switch (args.categoryIndex) {
    case 1: {
      return <ReactPage {...args} />;
    }
    default: {
      return <JavaScriptPage {...args} />;
    }
  }
};
class Playback extends React.Component {
  state = {
    categoryIndex: 1,
    recordIndex: 0,
    code: '',
    compiledCode: '',
    tape: [],
    console: [],
    isLoading: false,
    historyIndex: 0,
  };

  async componentDidMount() {
    await this.props.actions.fetchRecordWithHistory(
      '0ba1a9d2-fa7f-4610-8bb3-37397a93b550',
    );
    this.setState({ code: this.props.record.history.items[0].code });
    console.log(this.props);
  }

  onChangeRecord = async index => {
    const { id } = this.props.recordList[index];
    await this.props.actions.fetchRecordWithHistory(id);

    this.setState({ recordIndex: index });
  };

  getNextSetHistory = async () => {
    const { id } = this.props.record;
    await this.props.actions.fetchRecordWithHistory(id);
  };

  onForward = () => {
    const { historyIndex } = this.state;
    const { items } = this.props.record.history;
    this.setState({
      code: items[historyIndex],
      historyIndex: historyIndex + 1,
    });
  };

  onBackward = () => {

    
  };

  addTape = newTape => {
    const { tape } = this.state;
    this.setState({ tape: [...tape, newTape] });
  };

  resetTape = () => {
    this.setState({ tape: [] });
  };

  render() {
    const { onChangeRecord, addTape, resetTape, onForward, onBackward } = this;
    const { recordIndex } = this.state;
    const {
      test = {},
      recordList = [
        { id: '0ba1a9d2-fa7f-4610-8bb3-37397a93b550', ques: { name: 'test' } },
      ],
    } = this.props;
    return (
      <>
        <PlaybackControlWidget
          testDate={test.timeBegin}
          interviewee={test.subjectId}
          recordIndex={recordIndex}
          onChangeRecord={onChangeRecord}
          onForward={onForward}
          onBackward={onBackward}
          recordList={recordList}
        />
        <PlaybackView
          addTape={addTape}
          resetTape={resetTape}
          {...this.props}
          {...this.state}
        />
      </>
    );
  }
}

export default connect(
  state => ({
    record: state.record,
  }),
  dispatch => ({
    actions: {
      fetchRecordWithHistory: id => dispatch(fetchRecordWithHistory(id)),
    },
  }),
)(Playback);

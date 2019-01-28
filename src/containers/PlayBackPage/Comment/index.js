import React from 'react';
import { connect } from 'react-redux';
import { transform } from '@babel/standalone';

import ReactPage from 'components/PlaybackView/React';
import JavaScriptPage from 'components/PlaybackView/JavaScript';
import { resetCurrentRecord } from 'redux/record/actions';
import Summary from '../Summary';
import ControlWidget from '../ControlWidget';
import HistorySlider from '../HistorySlider';

import { fetchRecordWithHistory } from './actions';
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
    categoryIndex: 0,
    recordIndex: 0,
    code: '',
    compiledCode: '',
    tape: [],
    isLoading: false,
    historyIndex: 0,
    summaryVisible: false,
  };

  async componentDidMount() {
    if (this.props.records.length > 0) {
      await this.onChangeRecord(0);
    }
  }

  handleCodeChange = newCode => {
    const { test } = this.props.record.ques;
    const fullCode = `${newCode} ${test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react',
        ],
        plugins: ['proposal-object-rest-spread'],
      });
      this.setState({ code: newCode, compiledCode });
    } catch (e) {
      this.setState({ code: newCode });
    }
  };

  onChangeRecord = async index => {
    this.setState({ isLoading: true });
    this.props.actions.resetCurrentRecord();
    const { id } = this.props.records[index];
    await this.props.actions.fetchRecordWithHistory(id);
    const { record } = this.props;
    if (record.history.items.length > 0) {
      this.setState({
        historyIndex: 0,
        categoryIndex: record.ques.type === 'javascript' ? 0 : 1,
        recordIndex: index,
        isLoading: false,
      });
      this.handleCodeChange(record.history.items[0].code);
    } else {
      this.setState({
        isLoading: false,
        historyIndex: 0,
        code: '',
      });
    }
  };

  getNextSetHistory = async () => {
    const { id } = this.props.record;
    await this.props.actions.fetchRecordWithHistory(id);
  };

  onForward = async () => {
    const { historyIndex } = this.state;
    const { items, nextToken } = this.props.record.history;

    if (historyIndex < items.length - 1) {
      this.setState({
        code: items[historyIndex + 1].code || '',
        historyIndex: historyIndex + 1,
      });
    }

    if (nextToken && historyIndex === items.length - 2) {
      await this.getNextSetHistory();
    }
  };

  onBackward = () => {
    const { historyIndex } = this.state;
    const { items } = this.props.record.history;
    if (historyIndex > 0) {
      this.setState({
        code: items[historyIndex].code || '',
        historyIndex: historyIndex - 1,
      });
    }
  };

  addTape = newTape => {
    const { tape } = this.state;
    this.setState({ tape: [...tape, newTape] });
  };

  resetTape = () => {
    this.setState({ tape: [] });
  };

  onClickSummary = () => {
    this.setState({ summaryVisible: true });
  };

  onCancelSummary = () => {
    this.setState({ summaryVisible: false });
  };

  onSliderChange = value => {
    console.log(value);
    const { code } = this.state;
    const { items } = this.props.record.history;
    console.log(items);
    this.setState({
      historyIndex: value,
      code: items[value].code || code,
    });
  };

  render() {
    const {
      handleCodeChange,
      onChangeRecord,
      addTape,
      resetTape,
      onForward,
      onBackward,
      onClickSummary,
      onCancelSummary,
      onSliderChange,
    } = this;
    const { recordIndex, historyIndex, summaryVisible } = this.state;
    const { testData, records, record } = this.props;
    return (
      <>
        <ControlWidget
          testDate={testData.timeBegin}
          interviewee={testData.subjectId}
          recordIndex={recordIndex}
          onChangeRecord={onChangeRecord}
          recordList={records}
          onClickSummary={onClickSummary}
        />
        <Summary
          summaryList={record.comment.items}
          visible={summaryVisible}
          onCancel={onCancelSummary}
        />
        <PlaybackView
          handleCodeChange={handleCodeChange}
          addTape={addTape}
          resetTape={resetTape}
          test={record.ques.test}
          comments={record.comment}
          {...this.state}
        />
        <HistorySlider
          onForward={onForward}
          onBackward={onBackward}
          historyIndex={historyIndex}
          historyList={record.history.items}
          onChange={onSliderChange}
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
      resetCurrentRecord: () => dispatch(resetCurrentRecord()),
    },
  }),
)(Playback);

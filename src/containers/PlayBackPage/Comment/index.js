import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { transform } from '@babel/standalone';
import { findLastIndex } from 'lodash';
import ReactPage from 'components/PlaybackView/React';
import JavaScriptPage from 'components/PlaybackView/JavaScript';
import { resetCurrentRecord } from 'redux/record/actions';
import injectReducer from 'utils/injectReducer';
import Summary from '../Summary';
import ControlWidget from '../ControlWidget';
import HistorySlider from '../HistorySlider';

import { fetchRecordWithHistory, setCurrentSnapComment } from './actions';
import snapComment from './reducer';
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
    const { items } = record.history;
    if (items.length > 0) {
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

  onForwardSnapComment = () => {
    const { snapComments } = this.props.snapComment;
    const { items } = this.props.record.history;
    const { historyIndex } = this.state;
    const nextSnapCommentIndex = snapComments.findIndex(
      item => item.historyIndex > historyIndex,
    );
    if (nextSnapCommentIndex > -1) {
      const newHistoryIndex = snapComments[nextSnapCommentIndex].historyIndex;
      this.setState({
        code: items[newHistoryIndex].code || '',
        historyIndex: newHistoryIndex,
      });
    }
  };

  onBackwardSnapComment = () => {
    const { snapComments } = this.props.snapComment;
    const { items } = this.props.record.history;
    const { historyIndex } = this.state;
    const previousSnapCommentIndex = findLastIndex(
      snapComments,
      item => item.historyIndex < historyIndex,
    );
    if (previousSnapCommentIndex > -1) {
      const newHistoryIndex =
        snapComments[previousSnapCommentIndex].historyIndex;
      this.setState({
        code: items[newHistoryIndex].code || '',
        historyIndex: newHistoryIndex,
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
      onForwardSnapComment,
      onBackwardSnapComment,
      onClickSummary,
      onCancelSummary,
      onSliderChange,
    } = this;
    const { recordIndex, historyIndex, summaryVisible } = this.state;
    const { testData, records, record, snapComment } = this.props;
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
          onForwardSnapComment={onForwardSnapComment}
          onBackwardSnapComment={onBackwardSnapComment}
          historyIndex={historyIndex}
          historyList={record.history.items}
          snapComments={snapComment.snapComments}
          onChange={onSliderChange}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchRecordWithHistory: id => dispatch(fetchRecordWithHistory(id)),
    resetCurrentRecord: () => dispatch(resetCurrentRecord()),
    setCurrentSnapComment: index => dispatch(setCurrentSnapComment(index)),
  },
});
const mapStateToProps = state => ({
  record: state.record,
  snapComment: state.snapComment,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'snapComment', reducer: snapComment });
export default compose(
  withReducer,
  withConnect,
)(Playback);

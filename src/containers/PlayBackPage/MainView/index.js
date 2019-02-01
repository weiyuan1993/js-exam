import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { transform } from '@babel/standalone';
import { findLastIndex } from 'lodash';
import ReactPage from 'components/PlaybackView/React';
import JavaScriptPage from 'components/PlaybackView/JavaScript';
import { resetCurrentRecord } from 'redux/record/actions';
import injectReducer from 'utils/injectReducer';
import { changeCode } from 'redux/code/actions';
import { addTape, resetTape } from 'redux/tape/actions';
import Summary from '../Summary';
import ControlWidget from '../ControlWidget';
import HistorySlider from '../HistorySlider';
import {
  fetchRecordWithHistory,
  setCategoryIndex,
  setRecordIndex,
  setHistoryIndex,
} from './actions';
import playbackReducer from './reducer';
import { REDUCER_KEY } from './constants';
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
    isLoading: false,
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
      this.props.changeCode({ rawCode: newCode, compiledCode });
    } catch (e) {
      this.props.changeCode({ rawCode: newCode });
    }
  };

  onChangeRecord = async index => {
    this.setState({ isLoading: true });
    this.props.resetCurrentRecord();
    const { id } = this.props.records[index];
    await this.props.fetchRecordWithHistory(id, index);
    this.setState({ isLoading: false });
  };

  getNextSetHistory = async () => {
    const { id } = this.props.record;
    await this.props.fetchRecordWithHistory(id);
  };

  onForward = async () => {
    const { historyIndex } = this.props;
    const { items, nextToken } = this.props.record.history;

    if (historyIndex < items.length - 1) {
      this.props.changeCode({ rawCode: items[historyIndex + 1].code || '' });
      this.props.setHistoryIndex(historyIndex + 1);
    }

    if (nextToken && historyIndex === items.length - 2) {
      await this.getNextSetHistory();
    }
  };

  onBackward = () => {
    const { historyIndex } = this.props;
    const { items } = this.props.record.history;
    if (historyIndex > 0) {
      this.props.changeCode({ rawCode: items[historyIndex].code || '' });
      this.props.setHistoryIndex(historyIndex - 1);
    }
  };

  onForwardSnapComment = () => {
    const { snapComments } = this.props;
    const { items } = this.props.record.history;
    const { historyIndex } = this.props;
    const nextSnapCommentIndex = snapComments.findIndex(
      item => item.historyIndex > historyIndex,
    );
    if (nextSnapCommentIndex > -1) {
      const newHistoryIndex = snapComments[nextSnapCommentIndex].historyIndex;
      this.props.changeCode({ rawCode: items[newHistoryIndex].code || '' });
      this.props.setHistoryIndex(newHistoryIndex);
    }
  };

  onBackwardSnapComment = () => {
    const { snapComments } = this.props;
    const { items } = this.props.record.history;
    const { historyIndex } = this.props;
    const previousSnapCommentIndex = findLastIndex(
      snapComments,
      item => item.historyIndex < historyIndex,
    );
    if (previousSnapCommentIndex > -1) {
      const newHistoryIndex =
        snapComments[previousSnapCommentIndex].historyIndex;
      this.props.changeCode({ rawCode: items[newHistoryIndex].code || '' });
      this.props.setHistoryIndex(newHistoryIndex);
    }
  };

  onSliderChange = value => {
    if (value >= 0) {
      const {
        code: { rawCode },
      } = this.props;
      const { items } = this.props.record.history;
      this.props.setHistoryIndex(value);
      this.props.changeCode({
        rawCode: (items[value] && items[value].code) || rawCode || '',
      });
    }
  };

  render() {
    const {
      handleCodeChange,
      onChangeRecord,
      onForward,
      onBackward,
      onForwardSnapComment,
      onBackwardSnapComment,
      onSliderChange,
    } = this;
    const { summaryVisible } = this.state;
    const {
      testData,
      records,
      record,
      code,
      tape,
      snapComments,
      categoryIndex,
      recordIndex,
      historyIndex,
      addTape,
      resetTape,
    } = this.props;
    return (
      <>
        <ControlWidget
          testDate={testData.timeBegin}
          interviewee={testData.subjectId}
          recordIndex={recordIndex}
          onChangeRecord={onChangeRecord}
          recordList={records}
          summaryDisabled={record.comment.items.length === 0}
          onClickSummary={() => {
            this.setState({ summaryVisible: true });
          }}
        />
        <Summary
          summaryList={record.comment.items}
          visible={summaryVisible}
          onCancel={() => {
            this.setState({ summaryVisible: false });
          }}
        />
        <PlaybackView
          categoryIndex={categoryIndex}
          handleCodeChange={handleCodeChange}
          addTape={addTape}
          resetTape={resetTape}
          comments={record.comment}
          code={code.rawCode}
          compiledCode={code.compiledCode}
          test={record.ques && record.ques.test}
          tape={tape}
          {...this.state}
        />
        <HistorySlider
          onForward={onForward}
          onBackward={onBackward}
          onForwardSnapComment={onForwardSnapComment}
          onBackwardSnapComment={onBackwardSnapComment}
          historyIndex={historyIndex}
          historyList={record.history.items}
          snapComments={snapComments}
          onChange={onSliderChange}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetCurrentRecord,
      changeCode,
      addTape,
      resetTape,
      fetchRecordWithHistory,
      setCategoryIndex,
      setRecordIndex,
      setHistoryIndex,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  code: state.code,
  tape: state.tape,
  record: state.record,
  categoryIndex: state.playback.categoryIndex,
  recordIndex: state.playback.recordIndex,
  historyIndex: state.playback.historyIndex,
  snapComments: state.playback.snapComments,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: REDUCER_KEY,
  reducer: playbackReducer,
});

Playback.propTypes = {
  code: PropTypes.object,
  tape: PropTypes.array,
  record: PropTypes.object,
  snapComments: PropTypes.object,
};
export default compose(
  withReducer,
  withConnect,
)(Playback);

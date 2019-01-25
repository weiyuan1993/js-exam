import React from 'react';
import { Input, Button, Icon } from 'antd';

import PageControlBar from 'components/PageControlBar';
import CategorySelector from 'components/Selectors/CategorySelector';
import QuestionSelector from 'components/Selectors/QuestionSelector';

import styles from './ControlWidget.module.scss';


const InputGroup = Input.Group;

const ControlWidget = ({
  intervieweeName,
  categoryIndex,
  questionIndex,
  onDispatchQuestion,
  onChangeCategory,
  onChangeQuestion,
  questionList,
  isHost,
  setCommentBox,
  enableComment,
}) => (
  <PageControlBar>
    <div>
      <div className={styles.roomInfoBar}>
          <Icon type="user" />
          {intervieweeName}
      </div>
      {isHost ? (
        <InputGroup compact style={{ width: 'auto', display: 'inline-block' }}>
          <CategorySelector
            onChange={onChangeCategory}
            categoryIndex={categoryIndex}
          />
          <QuestionSelector
            onChange={onChangeQuestion}
            questionIndex={questionIndex}
            list={questionList}
          />
          <Button type="primary" onClick={onDispatchQuestion}>
            Dispatch
            <Icon type="right" />
          </Button>
        </InputGroup>
      ) : (
        <></>
      )}
    </div>
    <div>
      <Button onClick={setCommentBox} disabled={enableComment}>
        Comment
      </Button>
    </div>
  </PageControlBar>
);

export default ControlWidget;

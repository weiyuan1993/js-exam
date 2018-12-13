import React from 'react';
import CategorySelector from 'app/components/Selectors/CategorySelector';
import QuestionSelector from 'app/components/Selectors/QuestionSelector';

import { Button, Icon } from 'antd';
import styles from './ControlWidget.module.scss';


const ControlWidget = ({
  categoryIndex,
  questionIndex,
  onDispatchQuestion,
  onChangeCategory,
  onChangeQuestion,
  questionList,
  setIntervieweeModal,
  intervieweeName
}) => (
  <div className={styles.control}>
    <div className={styles.interviewee}>
      <Icon type="user" />
      <p>
        Interviewee:
        <span>{ intervieweeName || 'UNSET' }</span>
      </p>
    </div>
    <div>
      <CategorySelector onChange={onChangeCategory} categoryIndex={categoryIndex} />
      <QuestionSelector onChange={onChangeQuestion} questionIndex={questionIndex} list={questionList} />
      <Button
        type="danger"
        onClick={onDispatchQuestion}
      >
      Dispatch Question
      </Button>
    </div>
    <Button
      type="primary"
      onClick={setIntervieweeModal}
    >
    Change Interviewee
    </Button>
  </div>
);

export default ControlWidget;

import React from 'react';
import CategorySelector from 'components/Selectors/CategorySelector';
import QuestionSelector from 'components/Selectors/QuestionSelector';

import { Input, Button, Icon } from 'antd';
import styles from './ControlWidget.module.scss';

const InputGroup = Input.Group;

const ControlWidget = ({
  categoryIndex,
  questionIndex,
  onDispatchQuestion,
  onChangeCategory,
  onChangeQuestion,
  questionList,
  isHost,
}) => (
  <div className={styles.control}>
    {isHost ? (
      <InputGroup compact style={{ width: 'auto' }}>
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
    <Button>Comment</Button>
  </div>
);

export default ControlWidget;

import React from 'react';
import CategorySelector from 'components/Selectors/CategorySelector';
import QuestionSelector from 'components/Selectors/QuestionSelector';

import { Button, Icon } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({
  categoryIndex,
  questionIndex,
  onDispatchQuestion,
  onChangeCategory,
  onChangeQuestion,
  questionList,
  isHost
}) => (
  <div className={styles.control}>
    {isHost ? (
      <div>
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
      </div>
    ) : (
      <></>
    )}
    <Button>
      Comment
    </Button>
  </div>
);

export default ControlWidget;

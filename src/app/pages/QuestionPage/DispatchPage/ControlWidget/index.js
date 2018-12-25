import React from 'react';
import CategorySelector from 'app/components/Selectors/CategorySelector';
import QuestionSelector from 'app/components/Selectors/QuestionSelector';

import { Button } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({
  categoryIndex,
  questionIndex,
  onDispatchQuestion,
  onChangeCategory,
  onChangeQuestion,
  questionList,
}) => (
  <div className={styles.control}>
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
        Dispatch Question
      </Button>
    </div>
  </div>
);

export default ControlWidget;

import React from 'react';

import QuestionSelector from 'components/Selectors/QuestionSelector';
import CategorySelector from 'components/Selectors/CategorySelector';

import { Button } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({
  categoryIndex,
  questionIndex,
  onReset,
  onChangeCategory,
  onChangeQuestion,
  questionList,
}) => (
  <div className={styles.control}>
    <CategorySelector onChange={onChangeCategory} index={categoryIndex} />
    <QuestionSelector
      onChange={onChangeQuestion}
      index={questionIndex}
      list={questionList}
    />
    <Button type="danger" onClick={onReset}>
      Reset
    </Button>
  </div>
);

export default ControlWidget;

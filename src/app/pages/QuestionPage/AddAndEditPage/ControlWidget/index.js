import React from 'react';
import CategorySelector from 'app/components/Selectors/CategorySelector';
import QuestionSelector from 'app/components/Selectors/QuestionSelector';

import { Button, Input } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({
  type,
  categoryIndex,
  questionIndex,
  onChangeName,
  onSubmit,
  onDelete,
  onChangeCategory,
  onChangeQuestion,
  onSync,
  questionList
}) => (
  <div className={styles.control}>
    <CategorySelector
      onChange={onChangeCategory}
      categoryIndex={categoryIndex}
    />
    {type === 'add' ? (
      <>
        <Input
          placeholder="Question name"
          onChange={e => onChangeName(e.target.value)}
          style={{ width: 200, marginRight: 5 }}
        />
        <Button type="primary" icon="check-circle" onClick={onSubmit}>
          Submit
        </Button>
      </>
    ) : (
      <>
        <QuestionSelector
          onChange={onChangeQuestion}
          questionIndex={questionIndex}
          list={questionList}
        />
        <Button type="primary" icon="check-circle" onClick={onSubmit}>
          Submit
        </Button>
        <Button type="danger" icon="delete" onClick={onDelete}>
          Delete
        </Button>
        <Button style={{ float: 'right' }} shape="circle" icon="sync" onClick={onSync} />
      </>
    )}
  </div>
);

export default ControlWidget;

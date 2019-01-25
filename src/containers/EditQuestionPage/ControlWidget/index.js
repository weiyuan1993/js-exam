import React from 'react';
import PageControlBar from 'components/PageControlBar';
import CategorySelector from 'components/Selectors/CategorySelector';
import QuestionSelector from 'components/Selectors/QuestionSelector';

import { Button, Input } from 'antd';

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
  questionList,
  disableSubmit,
}) => (
  <PageControlBar>
    <div>
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
          <Button
            type="primary"
            icon="check-circle"
            onClick={onSubmit}
            disabled={disableSubmit}
          >
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
          <Button
            style={{ float: 'right' }}
            shape="circle"
            icon="sync"
            onClick={onSync}
          />
        </>
      )}
    </div>
  </PageControlBar>
);

export default ControlWidget;

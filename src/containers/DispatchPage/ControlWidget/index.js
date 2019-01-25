import React from 'react';
import PageControlBar from 'components/PageControlBar';
import CategorySelector from 'components/Selectors/CategorySelector';
import QuestionSelector from 'components/Selectors/QuestionSelector';

import { Input, Button, Icon } from 'antd';

const InputGroup = Input.Group;

const ControlWidget = ({
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
    </div>
    <div>
      <Button onClick={setCommentBox} disabled={enableComment}>
        Comment
      </Button>
    </div>
  </PageControlBar>
);

export default ControlWidget;

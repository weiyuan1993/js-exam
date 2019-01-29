import React from 'react';
import { Input, Button, Icon, Dropdown, Menu, message } from 'antd';

import PageControlBar from 'components/PageControlBar';
import CategorySelector from 'components/Selectors/CategorySelector';
import QuestionSelector from 'components/Selectors/QuestionSelector';

import styles from './ControlWidget.module.scss';


const InputGroup = Input.Group;

const ControlWidget = ({
  intervieweeName,
  roomId,
  roomDescription,
  categoryIndex,
  questionIndex,
  onDispatchQuestion,
  onChangeCategory,
  onChangeQuestion,
  questionList,
  isHost,
  setCommentBox,
  enableComment,
  history,
  showDelConfirmModal,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="link"
        onClick={() => {
          const link = `${document.location.host}/exam/${roomId}`;
          navigator.clipboard.writeText(link).then(() => {
            message.success(`Successfully copied the link!`);
          });
        }}
      >
        <Icon type="share-alt" /> Copy Exam Link
      </Menu.Item>
      {isHost &&
        <Menu.Item
          key="delete"
          onClick={showDelConfirmModal}
        >
          <Icon type="delete" style={{ color: 'red' }} /> Delete Room
        </Menu.Item>
      }
    </Menu>
  );

  return (
    <PageControlBar>
      <div>
        <div className={styles.roomInfoBar}>
          <Dropdown overlay={menu} placement="bottomLeft">
            <span className={styles.roomInfoBar_room}>
              Room:
              <span className={styles.roomInfoBar_label}>{roomDescription}</span>
              <Icon type="down" />
            </span>
          </Dropdown>
          <span>
            Interviewee:
            <span className={styles.roomInfoBar_label}>{intervieweeName}</span>
          </span>
        </div>
        {isHost &&
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
        }
      </div>
      <div>
        <Button onClick={setCommentBox} disabled={enableComment}>
          Comment
        </Button>
      </div>
    </PageControlBar>
  );
};


export default ControlWidget;

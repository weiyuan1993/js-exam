import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import actions from 'redux-form/es/actions';
import hasSubmitSucceeded from 'redux-form/es/hasSubmitSucceeded';
import isSubmitting from 'redux-form/es/isSubmitting';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { Modal, Button, Input, message, Icon, Spin } from 'antd';
import RoomForm from 'components/RoomForm';

import { setRoomHost } from 'models/room/actions';
import { REDUCER_KEY } from './constants';
import { createRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import style from './CreateRoomView.module.scss';

const ROOM_FORM_ID = 'roomForm';

class CreateRoomView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.examLinkInput = React.createRef();
  }

  copyLink = () => {
    this.examLinkInput.current.select();
    document.execCommand('copy');
    message.success('Link has been copied.');
  };

  toRoom = () => {
    const { history, createdRoom, onSetRoomHost } = this.props;
    onSetRoomHost(true);
    history.push(`/admin/dispatch/${createdRoom.id}`);
  };

  render() {
    const {
      onCreateRoom,
      onResetRoomForm,
      roomFormSubmitting,
      createRoomFormSucceeded,
      createdRoom,
    } = this.props;
    return (
      <Spin spinning={roomFormSubmitting} size="large">
        <RoomForm form={ROOM_FORM_ID} onSubmit={onCreateRoom} />
        <Modal
          visible={createRoomFormSucceeded}
          title={`Welcome to Room - ${createdRoom.description}`}
          onCancel={onResetRoomForm}
          footer={[
            <Button key="enterRoom" type="primary" onClick={this.toRoom}>
              Enter Room
            </Button>,
          ]}
        >
          <p>Interviewee : {createdRoom.subjectId}</p>
          <div className={style.content}>
            <Input
              size="large"
              readOnly
              value={`${window.location.origin}/exam/${createdRoom.id}`}
              ref={this.examLinkInput}
            />
            <Button className={style.copyButton} onClick={this.copyLink}>
              <Icon type="copy" />
            </Button>
          </div>
        </Modal>
      </Spin>
    );
  }
}

CreateRoomView.propTypes = {
  history: PropTypes.object.isRequired,
  onCreateRoom: PropTypes.func,
  onResetRoomForm: PropTypes.func,
  onSetRoomHost: PropTypes.func,
  roomFormSubmitting: PropTypes.bool,
  createRoomFormSucceeded: PropTypes.bool,
  createdRoom: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onCreateRoom: data => dispatch(createRoom(data)),
  onResetRoomForm: () => dispatch(actions.reset(ROOM_FORM_ID)),
  onSetRoomHost: data => dispatch(setRoomHost(data)),
});

const mapStateToProps = state => ({
  createRoomFormSucceeded: hasSubmitSucceeded(ROOM_FORM_ID)(state),
  roomFormSubmitting: isSubmitting(ROOM_FORM_ID)(state),
  createdRoom: state[REDUCER_KEY].createdRoom,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: REDUCER_KEY, reducer });
const withSaga = injectSaga({ key: REDUCER_KEY, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateRoomView);

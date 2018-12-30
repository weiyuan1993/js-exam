import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import hasSubmitSucceeded from 'redux-form/es/hasSubmitSucceeded';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { Modal, Button, Input, message, Icon, Spin } from 'antd';
import RoomForm from 'components/RoomForm';
import { createRoom, createTest } from 'utils/room';
import { getRoomInfo } from 'actions/room';
// import { createRoom } from 'graphql/mutations';

import { REDUCER_KEY } from './constants';
import { changeUsername } from './actions';
import reducer from './reducer';
import saga from './saga';

class UserModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      examLink: '',
      visible: false,
      roomName: '',
      userName: '',
      intervieweeName: '',
      roomId: '',
      isLoading: false,
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  createRoom = async () => {
    if (this.state.userName === '') {
      message.warning('Please enter Name');
    } else {
      const { userName } = this.state;
      this.setState({ isLoading: true });
      const room = await createRoom(userName);
      await createTest(userName);
      this.setState({
        roomId: room.id,
        visible: true,
        examLink: `${document.location.hostname}:3000/exam/${room.id}`,
        roomName: room.description,
        intervieweeName: room.subjectId,
        isLoading: false,
      });
    }
  };

  copyLink = () => {
    const link = document.getElementById('ExamLinkCopy');
    link.select();
    document.execCommand('copy');
    message.success('Link has been copied.');
  };

  toRoom = () => {
    const { roomId } = this.state;
    const { history } = this.props;
    history.push(`/admin/dispatch/${roomId}?host=true`);
  };

  render() {
    const {
      visible,
      examLink,
      roomName,
      userName,
      intervieweeName,
      isLoading,
    } = this.state;
    return (
      <Spin spinning={isLoading} size="large">
        {/* <Input
          id="username"
          type="text"
          placeholder="mxstbr"
          value={this.props.username}
          onChange={this.props.onChangeUsername}
        /> */}
        {/* <Connect mutation={graphqlOperation(createRoom)}>
          {({ mutation }) => <RoomForm onSubmit={mutation} />}
        </Connect> */}
        <Input
          placeholder="Enter Name"
          value={userName}
          onChange={e => this.setState({ userName: e.target.value.trim() })}
        />
        <Button onClick={this.createRoom}>Create Room</Button>
        <Modal
          visible={visible}
          footer={false}
          title={`Welcome to Room - ${roomName}`}
          onCancel={this.handleCancel}
        >
          <div>
            <p>Interviewee : {intervieweeName}</p>
            <Input size="large" readOnly value={examLink} id="ExamLinkCopy" />
            <Button onClick={this.copyLink}>
              <Icon type="copy" />
            </Button>
            <Button type="primary" onClick={this.toRoom}>
              Enter Room
            </Button>
          </div>
        </Modal>
      </Spin>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    getRoomInfo: id => dispatch(getRoomInfo(id)),
  };
}

const mapStateToProps = state => ({
  createRoomFormSucceeded: hasSubmitSucceeded('roomForm')(state),
  username: state[REDUCER_KEY].username,
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
)(UserModal);

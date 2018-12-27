import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import hasSubmitSucceeded from 'redux-form/es/hasSubmitSucceeded';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { Modal, Button, Input, message, Icon } from 'antd';
import RoomForm from 'components/RoomForm';
// import { createRoom, createTest } from 'utils/room';
import { createRoom } from 'graphql/mutations';

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
      roomId: '',
      userName: '',
      intervieweeName: '',
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // createRoom = async () => {
  //   if (this.state.userName === '') {
  //     message.warning('Please enter Name');
  //   } else {
  //     const { userName } = this.state;
  //     const room = await createRoom(userName);
  //     console.log(room);
  //     const test = await createTest('WENDY');
  //     console.log(test);
  //     this.setState({
  //       visible: true,
  //       examLink: `${document.location.hostname}:3000/${room.id}`,
  //       roomId: room.description,
  //       intervieweeName: room.subjectId
  //     });
  //   }
  // };

  copyLink = () => {
    const link = document.getElementById('ExamLinkCopy');
    link.select();
    document.execCommand('copy');
    message.success('wer');
  };

  render() {
    const { visible, examLink, roomId, intervieweeName } = this.state;
    return (
      <div>
        <Input
          id="username"
          type="text"
          placeholder="mxstbr"
          value={this.props.username}
          onChange={this.props.onChangeUsername}
        />
        <Connect mutation={graphqlOperation(createRoom)}>
          {({ mutation }) => <RoomForm onSubmit={mutation} />}
        </Connect>
        <Modal
          visible={visible}
          footer={false}
          title={`WelCome to Room - ${roomId}`}
          onCancel={this.handleCancel}
        >
          <div>
            <p>Interviewee : {intervieweeName}</p>
            <Input size="large" readOnly value={examLink} id="ExamLinkCopy" />
            <Button onClick={this.copyLink}>
              <Icon type="copy" />
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
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

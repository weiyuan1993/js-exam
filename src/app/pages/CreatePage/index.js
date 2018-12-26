import React from 'react';
import { connect } from 'react-redux';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import hasSubmitSucceeded from 'redux-form/es/hasSubmitSucceeded';

import { Modal, Button, Input, message, Icon } from 'antd';
import RoomForm from 'app/components/RoomForm';
// import { createRoom, createTest } from 'app/utils/room';
import { createRoom } from 'graphql/mutations';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examLink: '',
      visible: false,
      roomId: '',
      userName: '',
      intervieweeName: ''
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false
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
    // const { examLink, visible } = this.props;
    const { visible, examLink, roomId, userName, intervieweeName } = this.state;
    // console.log(this.props.createRoomFormSucceeded);
    return (
      <div>
        {/* <Input
          placeholder="Enter Name"
          value={userName}
          onChange={e => this.setState({ userName: e.target.value.trim() })}
        />
        <Button onClick={this.createRoom}>Create Room</Button> */}
        <Connect mutation={graphqlOperation(createRoom)}>
          {({ data, errors, loading, mutation }) => {
            console.log(data, errors, loading, mutation);
            return <RoomForm onSubmit={mutation} />;
          }}
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

const mapStateToProps = state => ({
  createRoomFormSucceeded: hasSubmitSucceeded('roomForm')(state)
});

export default connect(mapStateToProps)(UserModal);

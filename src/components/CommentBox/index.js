import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import Button from 'antd/lib/button';
import { RfInput, RfTextArea } from 'components/RfInput';

class CommentBox extends React.Component {
  render() {
    const { visible, onSubmit, handleSubmit, setVisible } = this.props;
    return (
      <>
        <Modal visible={visible} footer={false} onCancel={setVisible}>
          <h1>Write a Comment</h1>
          <form onSubmit={handleSubmit(data => onSubmit({ input: data }))}>
            <Field
              name="author"
              component={RfInput}
              placeholder="Interviewee Name"
            />
            <Field
              name="content"
              component={RfTextArea}
              placeholder="Enter Comment"
            />
            <Button htmlType="submit"> Add Comment </Button>
          </form>
        </Modal>
      </>
    );
  }
}
CommentBox.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default reduxForm({
  // pass from parent for embed same form multiple times
  // https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
  form: 'InterviewerComment',
})(CommentBox);

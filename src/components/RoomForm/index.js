import React from 'react';
import PropTypes from 'prop-types';
import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import Button from 'antd/lib/button';
import { RfInput } from 'components/RfInput';

import style from './RoomForm.module.scss';

const RoomForm = ({ onSubmit, handleSubmit, pristine, submitting }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="subjectId"
        component={RfInput}
        placeholder="Interviewee Name"
      />
      <Button
        className={style.submitButton}
        htmlType="submit"
        disabled={pristine || submitting}
      >
        Create Room
      </Button>
    </form>
  );
};

RoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  // pass from parent for embed same form multiple times
  // https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
  // form: 'roomForm',
})(RoomForm);

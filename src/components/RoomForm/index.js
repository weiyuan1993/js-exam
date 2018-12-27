import React from 'react';
import PropTypes from 'prop-types';
import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import Button from 'antd/lib/button';
import RfInput from 'components/RfInput';

import style from './RoomForm.module.scss';

const RoomForm = ({ onSubmit, handleSubmit, pristine, submitting }) => {
  return (
    <form onSubmit={handleSubmit(data => onSubmit({ input: data }))}>
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
  form: 'roomForm',
})(RoomForm);

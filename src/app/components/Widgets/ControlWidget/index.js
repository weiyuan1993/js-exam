import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { resetQuestion } from 'app/actions/code';

import QuestionSelector from 'app/components/Selectors/QuestionSelector';
import CategorySelector from 'app/components/Selectors/CategorySelector';

import { Button } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({ actions, type }) => (
  <div className={styles.control}>
    <CategorySelector />
    <QuestionSelector />
    <Button type="danger" onClick={() => actions.resetQuestion(type)}>Reset</Button>
  </div>
);

export default withRouter(connect(
  () => {
    return {

    };
  },
  (dispatch) => {
    return {
      actions: {
        resetQuestion: type => dispatch(resetQuestion({ type: type.toUpperCase() }))
      }
    };
  }
)(ControlWidget));

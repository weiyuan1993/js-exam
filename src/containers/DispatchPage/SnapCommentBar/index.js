import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import actions from 'redux-form/es/actions';
import { API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from 'graphql/subscriptions';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Tag from 'antd/lib/tag';
import { RfInput } from 'components/RfInput';

import { cannedMessages } from './constants';
import style from './SnapCommentBar.module.scss';

let subscription = null;
class SnapCommentBar extends PureComponent {
  componentDidMount() {
    this.subscribeOnCreateHistory();
  }

  componentWillUnmount() {
    this.unsubscribeOnCreateHistory();
  }

  subscribeOnCreateHistory = () => {
    if (!subscription) {
      console.log('subscribeOnCreateHistory');
      subscription = API.graphql(
        graphqlOperation(subscriptions.onCreateHistory),
      ).subscribe({
        next: ({ value }) => {
          console.log(value.data.onCreateHistory);
        },
        error: error => {
          console.error(error);
        },
      });
    }
  };

  unsubscribeOnCreateHistory = () => {
    console.log('unsubscribeOnCreateHistory');
    subscription.unsubscribe();
    subscription = null;
  };

  handleClickTag = content => () => {
    if (content) this.props.onChangeSnapComment(content);
  };

  handleMenuClick = evt => {
    const comment = cannedMessages.find(
      message => Number(evt.key) === message.key,
    );
    this.props.onChangeSnapComment(comment.content);
  };

  renderCannedMessagesMenu = () => (
    <Menu onClick={this.handleMenuClick}>
      {cannedMessages.map(message => (
        <Menu.Item key={message.key}>{message.content}</Menu.Item>
      ))}
    </Menu>
  );

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className={`${style.root} ${style.card}`}
        onSubmit={handleSubmit(data => console.log(data))}
      >
        <Dropdown overlay={this.renderCannedMessagesMenu()} placement="topLeft">
          <Button className={style.dropdownBtn}>Canned Messages</Button>
        </Dropdown>
        <div className={style.actions}>
          <div className={style.tags}>
            <Tag onClick={this.handleClickTag(cannedMessages[0].content)}>
              {cannedMessages[0].content}
            </Tag>
            <Tag onClick={this.handleClickTag(cannedMessages[1].content)}>
              {cannedMessages[1].content}
            </Tag>
            <Tag onClick={this.handleClickTag(cannedMessages[2].content)}>
              {cannedMessages[2].content}
            </Tag>
          </div>
          <div className={style.commentAction}>
            <Field
              className={style.input}
              name="content"
              component={RfInput}
              placeholder="Message..."
            />
            <Button
              className={style.submitButton}
              htmlType="submit"
              disabled={pristine || submitting}
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

SnapCommentBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onChangeSnapComment: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeSnapComment: content =>
      dispatch(actions.change('SnapCommentBar', 'content', content)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReduxForm = reduxForm({
  form: 'SnapCommentBar',
});

export default compose(
  withReduxForm,
  withConnect,
)(SnapCommentBar);

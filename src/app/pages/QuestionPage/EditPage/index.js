import React, { Component } from 'react';

import { message } from 'antd';

import { updateQuestion, deleteQuestion } from 'app/utils/question';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';



const getPageComponent = (args) => {
  switch (args.index) {
    case 1: {
      return <ReactPage {...args} />;
    }
    default: {
      return <JavaScriptPage {...args} />;
    }
  }
};

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 0 };
  }

  onChangeCategory = (index) => {
    this.setState({ category: index });
  }

  onSubmit = async (data) => {
    try {
      await updateQuestion(data);
      message.success('Successfully edited!');
    } catch (e) {
      message.error(e);
    }
  }

  onDelete = async data => {
    try {
      await deleteQuestion(data);
      message.success('Successfully deleted!');
    } catch (e) {
      message.error(e);
    }
  }

  render() {
    const { category } = this.state;
    return (
      <React.Fragment>
        {
          getPageComponent({
            index: category,
            onSubmit: this.onSubmit,
            onDelete: this.onDelete,
            onChangeCategory: this.onChangeCategory,
            categoryIndex: category
          })
        }
      </React.Fragment>
    );
  }
}

export default Page;

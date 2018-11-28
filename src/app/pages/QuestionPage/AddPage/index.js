import React, { Component } from 'react';

import { createQuestion } from 'app/utils/question';

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

  componentDidMount() {
    const { state, history } = this.props;
    // if (!state.login.isLogin) {
    //   history.push('/login');
    //   return;
    // }
  }

  onChangeCategory = (index) => {
    this.setState({ category: index });
  }

  onSubmit = async (data) => {
    try {
      await createQuestion(data);
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    const { category } = this.state;
    return (
      <React.Fragment>
        { getPageComponent({ index: category, onSubmit: this.onSubmit, onChangeCategory: this.onChangeCategory }) }
      </React.Fragment>
    );
  }
}

export default Page;

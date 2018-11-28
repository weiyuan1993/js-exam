import React, { Component } from 'react';
import { Select } from 'antd';
import questions from '../../../questions';
const { Option } = Select;

class QuestionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }
  render() {
    const { handleSelected, activeIndex } = this.props;
    const options = questions.map((q, i) => {
      return <Option key={i} value={i}>{q.name}</Option>
    });
    return (
      <Select
        onChange={handleSelected} defaultValue={activeIndex}
        style={{minWidth: 200}}>
        {options}
      </Select>
    );
  }
}

export default QuestionSelector;

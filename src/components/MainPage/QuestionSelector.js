import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Select } from 'antd';
import questions from '../../questions';
const { Option } = Select;

const styles = () => ({
  button: {
    'text-transform': 'none'
  }
});

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
      <Select onChange={handleSelected} defaultValue={activeIndex}>
        {options}
      </Select>
    );
  }
}

export default  withStyles(styles)(QuestionSelector);

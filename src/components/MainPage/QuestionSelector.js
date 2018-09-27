import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import questions from '../../questions';

const styles = () => ({
  button: {
    'text-transform': 'none'
  }
});

class QuestionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
    this.handleClicked = this.handleClicked.bind(this);
  }
  handleClicked(e) {
    this.setState({ anchorEl: e.currentTarget });
  }
  render() {
    const { handleClicked } = this;
    const { handleSelected, activeIndex, classes } = this.props;
    const { anchorEl } = this.state;
    const items = questions.map((q, i) => {
      return (
        <MenuItem 
          key={i}
          value={i}
          onClick={() => {
            handleClicked(false);
            handleSelected(i);
          }}
        >
          {q.name} 
        </MenuItem>
      );
    });
  
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          className={classes.button}
          variant="outlined"
          onClick={handleClicked}
        >
          {`${questions[activeIndex].name}  ▼`}
        </Button>
        <Menu id="simple-menu" open={Boolean(anchorEl)} anchorEl={anchorEl}>
          {items}
        </Menu>
      </div>
    );
  }
}

export default  withStyles(styles)(QuestionSelector);
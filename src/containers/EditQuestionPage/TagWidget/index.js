import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';

import styles from './TagWidget.module.scss';

class TagWidget extends Component {
  state = {
    inputVisible: false,
    inputValue: '',
  };

  handleClose = removedTag => {
    const { data: tags, onTagUpdate } = this.props;
    onTagUpdate(tags.filter(tag => tag !== removedTag));
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { onTagUpdate, data: tags } = this.props;
    const { inputValue } = this.state;
    let newTags = [...tags];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...newTags, inputValue];
    }
    onTagUpdate(newTags);
    this.setState({ inputValue: '', inputVisible: false });
  };

  saveInputRef = input => {
    this.input = input;
  };

  render() {
    const { inputVisible, inputValue } = this.state;
    const { data: tags, readOnly } = this.props;
    return (
      <div className={styles['tag-widget']}>
        {tags ? tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable
              afterClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
        }) : null}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!readOnly && !inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" />
            New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default TagWidget;

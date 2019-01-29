import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Comment, Avatar, List } from 'antd';

const Summary = ({ summaryList, visible, onCancel }) => (
  <Modal
    title={`${summaryList.length} summary`}
    visible={visible}
    onCancel={onCancel}
    footer={null}
  >
    {summaryList.length > 0 && <SummaryList data={summaryList} />}
  </Modal>
);

const SummaryList = ({ data }) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <Comment
        author={item.author}
        content={item.content}
        avatar={<Avatar>{item.author[0].toUpperCase()}</Avatar>}
      />
    )}
  />
);

Summary.propTypes = {
  summaryList: PropTypes.array,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
};

SummaryList.propTypes = {
  data: PropTypes.array,
};
export default Summary;

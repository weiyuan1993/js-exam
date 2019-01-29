import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const categories = [
  {
    name: 'javascript',
  },
  {
    name: 'react',
  },
];
const { Option } = Select;

const CategorySelector = ({ categoryIndex, onChange, disabled }) => (
  <Select
    onChange={onChange}
    defaultValue={categoryIndex}
    value={categoryIndex}
    style={{ minWidth: 200 }}
    disabled={disabled}
  >
    {categories.map((q, i) => (
      <Option key={q.name} value={i}>
        {q.name}
      </Option>
    ))}
  </Select>
);

CategorySelector.propTypes = {
  categoryIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CategorySelector;

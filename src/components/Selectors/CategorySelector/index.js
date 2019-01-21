import React from 'react';
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

const CategorySelector = ({ categoryIndex, onChange }) => (
  <Select
    onChange={onChange}
    defaultValue={categoryIndex}
    value={categoryIndex}
    style={{ minWidth: 200 }}
  >
    {categories.map((q, i) => (
      <Option key={q.name} value={i}>
        {q.name}
      </Option>
    ))}
  </Select>
);

export default CategorySelector;

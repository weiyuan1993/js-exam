import React from 'react';
import { Select } from 'antd';

import { getCategories } from 'questions/index';

const categories = getCategories();
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

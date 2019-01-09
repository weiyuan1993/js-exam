import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const RecordSelector = ({ recordIndex, onChange, list }) => (
  <Select
    onChange={onChange}
    defaultValue={recordIndex}
    value={recordIndex}
    style={{ minWidth: 200 }}
  >
    {list.map((item, i) => (
      <Option key={item.id} value={i}>
        {item.ques.name}
      </Option>
    ))}
  </Select>
);

export default RecordSelector;

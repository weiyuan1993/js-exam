import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

// const QuestionSelector = ({ actions, state }) => {
//   const {
//     questionIndex,
//     type,
//     questions
//   } = getStateInformation(state);
//   return (
//     <Select
//       onChange={index => actions.changeQuestion({ index, type: type.toUpperCase() })}
//       defaultValue={questionIndex}
//       style={{ minWidth: 200 }}
//     >
//       { questions.map((q, i) => <Option key={q.name} value={i}>{q.name}</Option>)}
//     </Select>
//   );
// };

const QuestionSelector = ({ questionIndex, onChange, list, disabled }) => (
  <Select
    onChange={onChange}
    defaultValue={questionIndex}
    value={questionIndex}
    style={{ minWidth: 200 }}
    disabled={disabled}
  >
    {list.map((q, i) => (
      <Option key={q.id} value={i}>
        {q.name}
      </Option>
    ))}
  </Select>
);

QuestionSelector.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default QuestionSelector;

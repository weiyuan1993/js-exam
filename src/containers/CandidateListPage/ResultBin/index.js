import React from 'react';
import PropTypes from 'prop-types';

import { Collapse } from 'antd';

import TestList from '../TestList';

const Panel = Collapse.Panel;

const Months = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];

const byTime = ascending => (a, b) => {
  let result;

  if (a === null || b === null) {
    if (a === null) result = 1;
    else if (b === null) result = -1;
  } else {
    const A = new Date(a.timeBegin);
    const B = new Date(b.timeBegin);
    if (A.getTime() < B.getTime()) result = -1;
    else if (A.getTime() > B.getTime()) result = 1;
    else result = 0;
  }

  return ascending ? result : result * -1;
};

function getFullDate(dateOb) {
  return `${Months[dateOb.getMonth()]} 
    ${dateOb.getDate()}, 
    ${dateOb.getFullYear()}`;
}

const isValid = variable => {
  if (variable === undefined || variable === null) return false;
  return true;
};

const ResultBin = ({ tests, isLoading }) => {
  let currentD;
  let currentT;
  let nextD;
  let head;

  console.log('test: ', tests);
  if (tests) tests.sort(byTime(false));

  return tests ? (
    <Collapse accordion>
      {tests.map((test, i) => {
        if (test !== null) {
          currentT = new Date(test.timeBegin);
          currentD = getFullDate(currentT);

          if (head === undefined) head = i;

          if (isValid(tests[i + 1])) {
            nextD = getFullDate(new Date(tests[i + 1].timeBegin));
          }

          if (nextD !== currentD || !isValid(tests[i + 1])) {
            const dataOfDay = tests.slice(head, i + 1);
            head = i + 1;
            return (
              <Panel header={currentD} key={test.id}>
                <TestList data={dataOfDay} />
              </Panel>
            );
          }
        }
      })}
    </Collapse>
  ) : null;
};

ResultBin.propTypes = {
  tests: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default ResultBin;

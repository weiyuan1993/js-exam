import React from 'react';
import PropTypes from 'prop-types';

import { Collapse } from 'antd';

import TestList from 'components/TestList';

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

function compare(a, b) {
  const A = new Date(a.timeBegin);
  const B = new Date(b.timeBegin);
  if (A.getTime() < B.getTime()) return -1;
  if (A.getTime() > B.getTime()) return 1;
  return 0;
}

function getFullDate(dateOb) {
  return `${Months[dateOb.getMonth()]} 
    ${dateOb.getDate()}, 
    ${dateOb.getFullYear()}`;
}

const ResultBin = ({ tests, isLoading }) => {
  let currentD;
  let currentT;
  let nextD;
  let head = 0;

  tests.sort(compare);

  return (
    <Collapse accordion>
      {tests.map((test, i) => {
        currentT = new Date(test.timeBegin);
        currentD = getFullDate(currentT);

        if (tests[i + 1] !== undefined) {
          nextD = getFullDate(new Date(tests[i + 1].timeBegin));
        }

        if (nextD !== currentD || tests[i + 1] === undefined) {
          const dataOfDay = tests.slice(head, i + 1);
          head = i + 1;
          return (
            <Panel header={currentD}>
              <TestList data={dataOfDay} />
            </Panel>
          );
        }
      })}
    </Collapse>
  );
};

ResultBin.propTypes = {
  tests: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default ResultBin;

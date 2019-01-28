import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import { listTests } from 'graphql/queries';
import { onCreateTest } from 'graphql/subscriptions';

import { Skeleton } from 'antd';

import ResultBin from './ResultBin';

const CandidateListPage = () => (
  <Connect
    query={graphqlOperation(listTests, { limit: 1000 })}
    subscription={graphqlOperation(onCreateTest)}
    onSubscriptionMsg={(prev, { onCreateTest: createdTest }) => {
      prev.listTests.items.unshift(createdTest);
      return prev;
    }}
  >
    {({ data: { listTests: tests }, loading, error }) => {
      if (error) return <h3>Error</h3>;
      if (loading || !tests) {
        return <Skeleton avatar active paragraph={{ rows: 6 }} />;
      }
      return <ResultBin tests={tests.items} isLoading={loading} />;
    }}
  </Connect>
);

export default CandidateListPage;

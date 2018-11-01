// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTest = `query GetTest($id: ID!) {
  getTest(id: $id) {
    id
    teamId
    subjectId
    interviewerIds
    progress
    description
    testDate
    timeBegin
    timeEnd
    records {
      items {
        id
        subjectId
        interviewerId
        timeBegin
        timeEnd
        history
        result
      }
      nextToken
    }
    complete
  }
}
`;
export const listTests = `query ListTests(
  $filter: ModelTestFilterInput
  $limit: Int
  $nextToken: String
) {
  listTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      teamId
      subjectId
      interviewerIds
      progress
      description
      testDate
      timeBegin
      timeEnd
      records {
        items {
          id
          subjectId
          interviewerId
          timeBegin
          timeEnd
          history
          result
        }
        nextToken
      }
      complete
    }
    nextToken
  }
}
`;
export const getRecord = `query GetRecord($id: ID!) {
  getRecord(id: $id) {
    id
    subjectId
    interviewerId
    timeBegin
    timeEnd
    history
    result
    question {
      items {
        id
        name
        content
        test
      }
      nextToken
    }
    test {
      id
      teamId
      subjectId
      interviewerIds
      progress
      description
      testDate
      timeBegin
      timeEnd
      complete
    }
  }
}
`;
export const listRecords = `query ListRecords(
  $filter: ModelRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      subjectId
      interviewerId
      timeBegin
      timeEnd
      history
      result
      question {
        items {
          id
          name
          content
          test
        }
        nextToken
      }
      test {
        id
        teamId
        subjectId
        interviewerIds
        progress
        description
        testDate
        timeBegin
        timeEnd
        complete
      }
    }
    nextToken
  }
}
`;
export const getQuestionSnapshot = `query GetQuestionSnapshot($id: ID!) {
  getQuestionSnapshot(id: $id) {
    id
    record {
      id
      subjectId
      interviewerId
      timeBegin
      timeEnd
      history
      result
    }
    name
    content
    test
  }
}
`;
export const listQuestionSnapshots = `query ListQuestionSnapshots(
  $filter: ModelQuestionSnapshotFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestionSnapshots(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      record {
        id
        subjectId
        interviewerId
        timeBegin
        timeEnd
        history
        result
      }
      name
      content
      test
    }
    nextToken
  }
}
`;
export const getQuestionSet = `query GetQuestionSet($id: ID!) {
  getQuestionSet(id: $id) {
    id
    team {
      id
      name
      description
    }
    questions {
      items {
        id
        name
        content
        test
        created
        updated
      }
      nextToken
    }
    name
    created
    updated
  }
}
`;
export const listQuestionSets = `query ListQuestionSets(
  $filter: ModelQuestionSetFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestionSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      team {
        id
        name
        description
      }
      questions {
        items {
          id
          name
          content
          test
          created
          updated
        }
        nextToken
      }
      name
      created
      updated
    }
    nextToken
  }
}
`;
export const getQuestion = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
    id
    questionSet {
      id
      name
      created
      updated
    }
    name
    content
    test
    created
    updated
  }
}
`;
export const listQuestions = `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      questionSet {
        id
        name
        created
        updated
      }
      name
      content
      test
      created
      updated
    }
    nextToken
  }
}
`;
export const getTeam = `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    name
    description
    questionSet {
      items {
        id
        name
        created
        updated
      }
      nextToken
    }
  }
}
`;
export const listTeams = `query ListTeams(
  $filter: ModelTeamFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      questionSet {
        items {
          id
          name
          created
          updated
        }
        nextToken
      }
    }
    nextToken
  }
}
`;

// eslint-disable
// this is an auto generated file. This will be overwritten

export const getRoom = `query GetRoom($id: ID!) {
  getRoom(id: $id) {
    id
    test {
      id
      subjectId
      progress
      description
      testDate
      timeBegin
      timeEnd
      questionSource {
        id
        name
        content
        test
      }
      status
    }
    subjectId
    description
    status
    host {
      id
      userId
      name
    }
    users {
      items {
        id
        userId
        name
      }
      nextToken
    }
  }
}
`;
export const listRooms = `query ListRooms(
  $filter: ModelRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      test {
        id
        subjectId
        progress
        description
        testDate
        timeBegin
        timeEnd
        questionSource {
          id
          name
          content
          test
        }
        status
      }
      subjectId
      description
      status
      host {
        id
        userId
        name
      }
      users {
        items {
          id
          userId
          name
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    userId
    name
    rooms {
      id
      subjectId
      description
      status
    }
    teams {
      id
      name
      description
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      name
      rooms {
        id
        subjectId
        description
        status
      }
      teams {
        id
        name
        description
      }
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
    users {
      items {
        id
        userId
        name
      }
      nextToken
    }
    questionSet {
      items {
        id
        name
        description
      }
      nextToken
    }
    test {
      id
      subjectId
      progress
      description
      testDate
      timeBegin
      timeEnd
      questionSource {
        id
        name
        content
        test
      }
      status
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
      users {
        items {
          id
          userId
          name
        }
        nextToken
      }
      questionSet {
        items {
          id
          name
          description
        }
        nextToken
      }
      test {
        id
        subjectId
        progress
        description
        testDate
        timeBegin
        timeEnd
        questionSource {
          id
          name
          content
          test
        }
        status
      }
    }
    nextToken
  }
}
`;
export const getTest = `query GetTest($id: ID!) {
  getTest(id: $id) {
    id
    room {
      id
      subjectId
      description
      status
    }
    team {
      id
      name
      description
    }
    subjectId
    users {
      items {
        id
        userId
        name
      }
      nextToken
    }
    progress
    description
    testDate
    timeBegin
    timeEnd
    questionSource {
      id
      name
      content
      test
    }
    records {
      items {
        id
        subjectId
        timeBegin
        timeEnd
        history
      }
      nextToken
    }
    status
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
      room {
        id
        subjectId
        description
        status
      }
      team {
        id
        name
        description
      }
      subjectId
      users {
        items {
          id
          userId
          name
        }
        nextToken
      }
      progress
      description
      testDate
      timeBegin
      timeEnd
      questionSource {
        id
        name
        content
        test
      }
      records {
        items {
          id
          subjectId
          timeBegin
          timeEnd
          history
        }
        nextToken
      }
      status
    }
    nextToken
  }
}
`;
export const getRecord = `query GetRecord($id: ID!) {
  getRecord(id: $id) {
    id
    subjectId
    interviewer {
      id
      userId
      name
    }
    timeBegin
    timeEnd
    history
    result {
      input
      output
      testCaseResults
    }
    question {
      id
      name
      content
      test
    }
    test {
      id
      subjectId
      progress
      description
      testDate
      timeBegin
      timeEnd
      questionSource {
        id
        name
        content
        test
      }
      status
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
      interviewer {
        id
        userId
        name
      }
      timeBegin
      timeEnd
      history
      result {
        input
        output
        testCaseResults
      }
      question {
        id
        name
        content
        test
      }
      test {
        id
        subjectId
        progress
        description
        testDate
        timeBegin
        timeEnd
        questionSource {
          id
          name
          content
          test
        }
        status
      }
    }
    nextToken
  }
}
`;
export const getResult = `query GetResult($id: ID!) {
  getResult(id: $id) {
    input
    output
    testCaseResults
  }
}
`;
export const listResults = `query ListResults(
  $filter: ModelResultFilterInput
  $limit: Int
  $nextToken: String
) {
  listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      input
      output
      testCaseResults
    }
    nextToken
  }
}
`;
export const getQuestionSnapshot = `query GetQuestionSnapshot($id: ID!) {
  getQuestionSnapshot(id: $id) {
    id
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
      }
      nextToken
    }
    name
    description
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
        }
        nextToken
      }
      name
      description
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
      description
    }
    name
    content
    test
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
        description
      }
      name
      content
      test
    }
    nextToken
  }
}
`;

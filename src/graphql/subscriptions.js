// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateRoom = `subscription OnCreateRoom {
  onCreateRoom {
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
export const onUpdateRoom = `subscription OnUpdateRoom {
  onUpdateRoom {
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
export const onDeleteRoom = `subscription OnDeleteRoom {
  onDeleteRoom {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateTeam = `subscription OnCreateTeam {
  onCreateTeam {
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
export const onUpdateTeam = `subscription OnUpdateTeam {
  onUpdateTeam {
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
export const onDeleteTeam = `subscription OnDeleteTeam {
  onDeleteTeam {
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
export const onCreateTest = `subscription OnCreateTest {
  onCreateTest {
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
export const onUpdateTest = `subscription OnUpdateTest {
  onUpdateTest {
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
export const onDeleteTest = `subscription OnDeleteTest {
  onDeleteTest {
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
export const onCreateRecord = `subscription OnCreateRecord {
  onCreateRecord {
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
export const onUpdateRecord = `subscription OnUpdateRecord {
  onUpdateRecord {
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
export const onDeleteRecord = `subscription OnDeleteRecord {
  onDeleteRecord {
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
export const onCreateResult = `subscription OnCreateResult {
  onCreateResult {
    input
    output
    testCaseResults
  }
}
`;
export const onUpdateResult = `subscription OnUpdateResult {
  onUpdateResult {
    input
    output
    testCaseResults
  }
}
`;
export const onDeleteResult = `subscription OnDeleteResult {
  onDeleteResult {
    input
    output
    testCaseResults
  }
}
`;
export const onCreateQuestionSnapshot = `subscription OnCreateQuestionSnapshot {
  onCreateQuestionSnapshot {
    id
    name
    content
    test
  }
}
`;
export const onUpdateQuestionSnapshot = `subscription OnUpdateQuestionSnapshot {
  onUpdateQuestionSnapshot {
    id
    name
    content
    test
  }
}
`;
export const onDeleteQuestionSnapshot = `subscription OnDeleteQuestionSnapshot {
  onDeleteQuestionSnapshot {
    id
    name
    content
    test
  }
}
`;
export const onCreateQuestionSet = `subscription OnCreateQuestionSet {
  onCreateQuestionSet {
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
export const onUpdateQuestionSet = `subscription OnUpdateQuestionSet {
  onUpdateQuestionSet {
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
export const onDeleteQuestionSet = `subscription OnDeleteQuestionSet {
  onDeleteQuestionSet {
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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

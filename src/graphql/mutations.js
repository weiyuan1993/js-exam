// eslint-disable
// this is an auto generated file. This will be overwritten

export const createRoom = `mutation CreateRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
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
export const updateRoom = `mutation UpdateRoom($input: UpdateRoomInput!) {
  updateRoom(input: $input) {
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
export const deleteRoom = `mutation DeleteRoom($input: DeleteRoomInput!) {
  deleteRoom(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createTeam = `mutation CreateTeam($input: CreateTeamInput!) {
  createTeam(input: $input) {
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
export const updateTeam = `mutation UpdateTeam($input: UpdateTeamInput!) {
  updateTeam(input: $input) {
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
export const deleteTeam = `mutation DeleteTeam($input: DeleteTeamInput!) {
  deleteTeam(input: $input) {
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
export const createTest = `mutation CreateTest($input: CreateTestInput!) {
  createTest(input: $input) {
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
export const updateTest = `mutation UpdateTest($input: UpdateTestInput!) {
  updateTest(input: $input) {
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
export const deleteTest = `mutation DeleteTest($input: DeleteTestInput!) {
  deleteTest(input: $input) {
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
export const createRecord = `mutation CreateRecord($input: CreateRecordInput!) {
  createRecord(input: $input) {
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
export const updateRecord = `mutation UpdateRecord($input: UpdateRecordInput!) {
  updateRecord(input: $input) {
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
export const deleteRecord = `mutation DeleteRecord($input: DeleteRecordInput!) {
  deleteRecord(input: $input) {
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
export const createResult = `mutation CreateResult($input: CreateResultInput!) {
  createResult(input: $input) {
    input
    output
    testCaseResults
  }
}
`;
export const updateResult = `mutation UpdateResult($input: UpdateResultInput!) {
  updateResult(input: $input) {
    input
    output
    testCaseResults
  }
}
`;
export const deleteResult = `mutation DeleteResult($input: DeleteResultInput!) {
  deleteResult(input: $input) {
    input
    output
    testCaseResults
  }
}
`;
export const createQuestionSnapshot = `mutation CreateQuestionSnapshot($input: CreateQuestionSnapshotInput!) {
  createQuestionSnapshot(input: $input) {
    id
    name
    content
    test
  }
}
`;
export const updateQuestionSnapshot = `mutation UpdateQuestionSnapshot($input: UpdateQuestionSnapshotInput!) {
  updateQuestionSnapshot(input: $input) {
    id
    name
    content
    test
  }
}
`;
export const deleteQuestionSnapshot = `mutation DeleteQuestionSnapshot($input: DeleteQuestionSnapshotInput!) {
  deleteQuestionSnapshot(input: $input) {
    id
    name
    content
    test
  }
}
`;
export const createQuestionSet = `mutation CreateQuestionSet($input: CreateQuestionSetInput!) {
  createQuestionSet(input: $input) {
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
export const updateQuestionSet = `mutation UpdateQuestionSet($input: UpdateQuestionSetInput!) {
  updateQuestionSet(input: $input) {
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
export const deleteQuestionSet = `mutation DeleteQuestionSet($input: DeleteQuestionSetInput!) {
  deleteQuestionSet(input: $input) {
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
export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
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
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
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
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
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

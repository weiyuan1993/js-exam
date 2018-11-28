// eslint-disable
// this is an auto generated file. This will be overwritten

export const createRoom = `mutation CreateRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
    id
    test {
      id
      subjectId
      description
      timeBegin
      timeEnd
      status
      tags
    }
    subjectId
    description
    status
    host {
      id
      name
    }
    users {
      items {
        id
        name
      }
      nextToken
    }
    questionSource {
      items {
        id
        type
        name
        content
        test
      }
      nextToken
    }
    questionSourceStr
    progress
  }
}
`;
export const updateRoom = `mutation UpdateRoom($input: UpdateRoomInput!) {
  updateRoom(input: $input) {
    id
    test {
      id
      subjectId
      description
      timeBegin
      timeEnd
      status
      tags
    }
    subjectId
    description
    status
    host {
      id
      name
    }
    users {
      items {
        id
        name
      }
      nextToken
    }
    questionSource {
      items {
        id
        type
        name
        content
        test
      }
      nextToken
    }
    questionSourceStr
    progress
  }
}
`;
export const deleteRoom = `mutation DeleteRoom($input: DeleteRoomInput!) {
  deleteRoom(input: $input) {
    id
    test {
      id
      subjectId
      description
      timeBegin
      timeEnd
      status
      tags
    }
    subjectId
    description
    status
    host {
      id
      name
    }
    users {
      items {
        id
        name
      }
      nextToken
    }
    questionSource {
      items {
        id
        type
        name
        content
        test
      }
      nextToken
    }
    questionSourceStr
    progress
  }
}
`;
export const createJeUser = `mutation CreateJeUser($input: CreateJEUserInput!) {
  createJEUser(input: $input) {
    id
    name
    room {
      id
      subjectId
      description
      status
      questionSourceStr
      progress
    }
    team {
      id
      name
      description
    }
  }
}
`;
export const updateJeUser = `mutation UpdateJeUser($input: UpdateJEUserInput!) {
  updateJEUser(input: $input) {
    id
    name
    room {
      id
      subjectId
      description
      status
      questionSourceStr
      progress
    }
    team {
      id
      name
      description
    }
  }
}
`;
export const deleteJeUser = `mutation DeleteJeUser($input: DeleteJEUserInput!) {
  deleteJEUser(input: $input) {
    id
    name
    room {
      id
      subjectId
      description
      status
      questionSourceStr
      progress
    }
    team {
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
        name
      }
      nextToken
    }
    questionSet {
      items {
        id
        name
        description
        tags
      }
      nextToken
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
        name
      }
      nextToken
    }
    questionSet {
      items {
        id
        name
        description
        tags
      }
      nextToken
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
        name
      }
      nextToken
    }
    questionSet {
      items {
        id
        name
        description
        tags
      }
      nextToken
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
      questionSourceStr
      progress
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
        name
      }
      nextToken
    }
    description
    timeBegin
    timeEnd
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
    tags
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
      questionSourceStr
      progress
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
        name
      }
      nextToken
    }
    description
    timeBegin
    timeEnd
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
    tags
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
      questionSourceStr
      progress
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
        name
      }
      nextToken
    }
    description
    timeBegin
    timeEnd
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
    tags
  }
}
`;
export const createRecord = `mutation CreateRecord($input: CreateRecordInput!) {
  createRecord(input: $input) {
    id
    subjectId
    interviewer {
      id
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
      type
      name
      content
      test
    }
    test {
      id
      subjectId
      description
      timeBegin
      timeEnd
      status
      tags
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
      type
      name
      content
      test
    }
    test {
      id
      subjectId
      description
      timeBegin
      timeEnd
      status
      tags
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
      type
      name
      content
      test
    }
    test {
      id
      subjectId
      description
      timeBegin
      timeEnd
      status
      tags
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
    type
    name
    content
    test
    room {
      id
      subjectId
      description
      status
      questionSourceStr
      progress
    }
  }
}
`;
export const updateQuestionSnapshot = `mutation UpdateQuestionSnapshot($input: UpdateQuestionSnapshotInput!) {
  updateQuestionSnapshot(input: $input) {
    id
    type
    name
    content
    test
    room {
      id
      subjectId
      description
      status
      questionSourceStr
      progress
    }
  }
}
`;
export const deleteQuestionSnapshot = `mutation DeleteQuestionSnapshot($input: DeleteQuestionSnapshotInput!) {
  deleteQuestionSnapshot(input: $input) {
    id
    type
    name
    content
    test
    room {
      id
      subjectId
      description
      status
      questionSourceStr
      progress
    }
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
        type
        name
        content
        test
        tags
      }
      nextToken
    }
    name
    description
    tags
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
        type
        name
        content
        test
        tags
      }
      nextToken
    }
    name
    description
    tags
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
        type
        name
        content
        test
        tags
      }
      nextToken
    }
    name
    description
    tags
  }
}
`;
export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    type
    questionSet {
      id
      name
      description
      tags
    }
    name
    content
    test
    tags
  }
}
`;
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
    id
    type
    questionSet {
      id
      name
      description
      tags
    }
    name
    content
    test
    tags
  }
}
`;
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
    id
    type
    questionSet {
      id
      name
      description
      tags
    }
    name
    content
    test
    tags
  }
}
`;
export const createAuthedModelForOwner = `mutation CreateAuthedModelForOwner($input: CreateAuthedModelForOwnerInput!) {
  createAuthedModelForOwner(input: $input) {
    id
    content
  }
}
`;
export const updateAuthedModelForOwner = `mutation UpdateAuthedModelForOwner($input: UpdateAuthedModelForOwnerInput!) {
  updateAuthedModelForOwner(input: $input) {
    id
    content
  }
}
`;
export const deleteAuthedModelForOwner = `mutation DeleteAuthedModelForOwner($input: DeleteAuthedModelForOwnerInput!) {
  deleteAuthedModelForOwner(input: $input) {
    id
    content
  }
}
`;

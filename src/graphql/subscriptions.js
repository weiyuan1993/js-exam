// eslint-disable
// this is an auto generated file. This will be overwritten

export const onUpdateJeUserByJeUserId = `subscription OnUpdateJeUserByJeUserId($id: String) {
  onUpdateJEUserByJEUserId(id: $id) {
    id
    name
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
    team {
      id
      name
      description
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
    hostTest {
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
export const onUpdateTeamByTeamId = `subscription OnUpdateTeamByTeamId($id: String) {
  onUpdateTeamByTeamId(id: $id) {
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
export const onUpdateTestByTestId = `subscription OnUpdateTestByTestId($id: String) {
  onUpdateTestByTestId(id: $id) {
    id
    room {
      id
      subjectId
      description
      status
      createTime
      password
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
    host {
      id
      name
    }
    description
    timeBegin
    timeEnd
    records {
      items {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
      }
      nextToken
    }
    status
    tags
  }
}
`;
export const onUpdateRoomByRoomId = `subscription OnUpdateRoomByRoomId($id: String) {
  onUpdateRoomByRoomId(id: $id) {
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
    createTime
    password
    users {
      items {
        id
        name
      }
      nextToken
    }
    currentRecord {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onUpdateRecordByRecordId = `subscription OnUpdateRecordByRecordId($id: String) {
  onUpdateRecordByRecordId(id: $id) {
    id
    subjectId
    syncCode
    interviewer {
      id
      name
    }
    timeBegin
    timeEnd
    comment {
      items {
        author
        time
        content
      }
      nextToken
    }
    history {
      items {
        time
        code
      }
      nextToken
    }
    ques {
      type
      name
      content
      test
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
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
  }
}
`;
export const onCreateRoom = `subscription OnCreateRoom {
  onCreateRoom {
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
    createTime
    password
    users {
      items {
        id
        name
      }
      nextToken
    }
    currentRecord {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
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
    createTime
    password
    users {
      items {
        id
        name
      }
      nextToken
    }
    currentRecord {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
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
    createTime
    password
    users {
      items {
        id
        name
      }
      nextToken
    }
    currentRecord {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onCreateJeUser = `subscription OnCreateJeUser {
  onCreateJEUser {
    id
    name
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
    team {
      id
      name
      description
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
    hostTest {
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
export const onUpdateJeUser = `subscription OnUpdateJeUser {
  onUpdateJEUser {
    id
    name
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
    team {
      id
      name
      description
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
    hostTest {
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
export const onDeleteJeUser = `subscription OnDeleteJeUser {
  onDeleteJEUser {
    id
    name
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
    team {
      id
      name
      description
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
    hostTest {
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
export const onCreateTeam = `subscription OnCreateTeam {
  onCreateTeam {
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
export const onUpdateTeam = `subscription OnUpdateTeam {
  onUpdateTeam {
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
export const onDeleteTeam = `subscription OnDeleteTeam {
  onDeleteTeam {
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
export const onCreateTest = `subscription OnCreateTest {
  onCreateTest {
    id
    room {
      id
      subjectId
      description
      status
      createTime
      password
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
    host {
      id
      name
    }
    description
    timeBegin
    timeEnd
    records {
      items {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
      }
      nextToken
    }
    status
    tags
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
      createTime
      password
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
    host {
      id
      name
    }
    description
    timeBegin
    timeEnd
    records {
      items {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
      }
      nextToken
    }
    status
    tags
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
      createTime
      password
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
    host {
      id
      name
    }
    description
    timeBegin
    timeEnd
    records {
      items {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
      }
      nextToken
    }
    status
    tags
  }
}
`;
export const onCreateRecord = `subscription OnCreateRecord {
  onCreateRecord {
    id
    subjectId
    syncCode
    interviewer {
      id
      name
    }
    timeBegin
    timeEnd
    comment {
      items {
        author
        time
        content
      }
      nextToken
    }
    history {
      items {
        time
        code
      }
      nextToken
    }
    ques {
      type
      name
      content
      test
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
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
  }
}
`;
export const onUpdateRecord = `subscription OnUpdateRecord {
  onUpdateRecord {
    id
    subjectId
    syncCode
    interviewer {
      id
      name
    }
    timeBegin
    timeEnd
    comment {
      items {
        author
        time
        content
      }
      nextToken
    }
    history {
      items {
        time
        code
      }
      nextToken
    }
    ques {
      type
      name
      content
      test
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
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
  }
}
`;
export const onDeleteRecord = `subscription OnDeleteRecord {
  onDeleteRecord {
    id
    subjectId
    syncCode
    interviewer {
      id
      name
    }
    timeBegin
    timeEnd
    comment {
      items {
        author
        time
        content
      }
      nextToken
    }
    history {
      items {
        time
        code
      }
      nextToken
    }
    ques {
      type
      name
      content
      test
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
    room {
      id
      subjectId
      description
      status
      createTime
      password
    }
  }
}
`;
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
    author
    time
    content
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
    author
    time
    content
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
    author
    time
    content
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onCreateHistory = `subscription OnCreateHistory {
  onCreateHistory {
    time
    code
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onUpdateHistory = `subscription OnUpdateHistory {
  onUpdateHistory {
    time
    code
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onDeleteHistory = `subscription OnDeleteHistory {
  onDeleteHistory {
    time
    code
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onCreateQuestionSnapshot = `subscription OnCreateQuestionSnapshot {
  onCreateQuestionSnapshot {
    id
    type
    name
    content
    test
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onUpdateQuestionSnapshot = `subscription OnUpdateQuestionSnapshot {
  onUpdateQuestionSnapshot {
    id
    type
    name
    content
    test
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
  }
}
`;
export const onDeleteQuestionSnapshot = `subscription OnDeleteQuestionSnapshot {
  onDeleteQuestionSnapshot {
    id
    type
    name
    content
    test
    record {
      id
      subjectId
      syncCode
      timeBegin
      timeEnd
    }
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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

// eslint-disable
// this is an auto generated file. This will be overwritten

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
export const onCreateJeUser = `subscription OnCreateJeUser {
  onCreateJEUser {
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
export const onUpdateJeUser = `subscription OnUpdateJeUser {
  onUpdateJEUser {
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
export const onDeleteJeUser = `subscription OnDeleteJeUser {
  onDeleteJEUser {
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
export const onUpdateTest = `subscription OnUpdateTest {
  onUpdateTest {
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
export const onDeleteTest = `subscription OnDeleteTest {
  onDeleteTest {
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
export const onCreateRecord = `subscription OnCreateRecord {
  onCreateRecord {
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
export const onUpdateRecord = `subscription OnUpdateRecord {
  onUpdateRecord {
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
export const onDeleteRecord = `subscription OnDeleteRecord {
  onDeleteRecord {
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
export const onUpdateQuestionSnapshot = `subscription OnUpdateQuestionSnapshot {
  onUpdateQuestionSnapshot {
    id
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
export const onDeleteQuestionSnapshot = `subscription OnDeleteQuestionSnapshot {
  onDeleteQuestionSnapshot {
    id
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
export const onCreateAuthedModelForOwner = `subscription OnCreateAuthedModelForOwner {
  onCreateAuthedModelForOwner {
    id
    content
  }
}
`;
export const onUpdateAuthedModelForOwner = `subscription OnUpdateAuthedModelForOwner {
  onUpdateAuthedModelForOwner {
    id
    content
  }
}
`;
export const onDeleteAuthedModelForOwner = `subscription OnDeleteAuthedModelForOwner {
  onDeleteAuthedModelForOwner {
    id
    content
  }
}
`;

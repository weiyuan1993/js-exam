// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTest = `mutation CreateTest($input: CreateTestInput!) {
  createTest(input: $input) {
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
export const updateTest = `mutation UpdateTest($input: UpdateTestInput!) {
  updateTest(input: $input) {
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
export const deleteTest = `mutation DeleteTest($input: DeleteTestInput!) {
  deleteTest(input: $input) {
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
export const createRecord = `mutation CreateRecord($input: CreateRecordInput!) {
  createRecord(input: $input) {
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
export const updateRecord = `mutation UpdateRecord($input: UpdateRecordInput!) {
  updateRecord(input: $input) {
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
export const deleteRecord = `mutation DeleteRecord($input: DeleteRecordInput!) {
  deleteRecord(input: $input) {
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
export const createQuestionSnapshot = `mutation CreateQuestionSnapshot($input: CreateQuestionSnapshotInput!) {
  createQuestionSnapshot(input: $input) {
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
export const updateQuestionSnapshot = `mutation UpdateQuestionSnapshot($input: UpdateQuestionSnapshotInput!) {
  updateQuestionSnapshot(input: $input) {
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
export const deleteQuestionSnapshot = `mutation DeleteQuestionSnapshot($input: DeleteQuestionSnapshotInput!) {
  deleteQuestionSnapshot(input: $input) {
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
export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
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
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
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
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
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
export const createTeam = `mutation CreateTeam($input: CreateTeamInput!) {
  createTeam(input: $input) {
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
export const updateTeam = `mutation UpdateTeam($input: UpdateTeamInput!) {
  updateTeam(input: $input) {
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
export const deleteTeam = `mutation DeleteTeam($input: DeleteTeamInput!) {
  deleteTeam(input: $input) {
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

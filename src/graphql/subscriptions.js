// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateTest = `subscription OnCreateTest {
  onCreateTest {
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
export const onUpdateTest = `subscription OnUpdateTest {
  onUpdateTest {
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
export const onDeleteTest = `subscription OnDeleteTest {
  onDeleteTest {
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
export const onCreateRecord = `subscription OnCreateRecord {
  onCreateRecord {
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
export const onUpdateRecord = `subscription OnUpdateRecord {
  onUpdateRecord {
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
export const onDeleteRecord = `subscription OnDeleteRecord {
  onDeleteRecord {
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
export const onCreateQuestionSnapshot = `subscription OnCreateQuestionSnapshot {
  onCreateQuestionSnapshot {
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
export const onUpdateQuestionSnapshot = `subscription OnUpdateQuestionSnapshot {
  onUpdateQuestionSnapshot {
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
export const onDeleteQuestionSnapshot = `subscription OnDeleteQuestionSnapshot {
  onDeleteQuestionSnapshot {
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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
export const onCreateTeam = `subscription OnCreateTeam {
  onCreateTeam {
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
export const onUpdateTeam = `subscription OnUpdateTeam {
  onUpdateTeam {
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
export const onDeleteTeam = `subscription OnDeleteTeam {
  onDeleteTeam {
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

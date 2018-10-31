// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateZoom = `subscription OnCreateZoom {
  onCreateZoom {
    id
    team {
      id
      name
      description
    }
    sujectId
    interviewerIds
    description
    testDate
    records {
      items {
        id
        sujectId
        interviewerId
        index
        timeBegin
        duration
        history
        result
      }
      nextToken
    }
    active
  }
}
`;
export const onUpdateZoom = `subscription OnUpdateZoom {
  onUpdateZoom {
    id
    team {
      id
      name
      description
    }
    sujectId
    interviewerIds
    description
    testDate
    records {
      items {
        id
        sujectId
        interviewerId
        index
        timeBegin
        duration
        history
        result
      }
      nextToken
    }
    active
  }
}
`;
export const onDeleteZoom = `subscription OnDeleteZoom {
  onDeleteZoom {
    id
    team {
      id
      name
      description
    }
    sujectId
    interviewerIds
    description
    testDate
    records {
      items {
        id
        sujectId
        interviewerId
        index
        timeBegin
        duration
        history
        result
      }
      nextToken
    }
    active
  }
}
`;
export const onCreateRecord = `subscription OnCreateRecord {
  onCreateRecord {
    id
    zoom {
      id
      sujectId
      interviewerIds
      description
      testDate
      active
    }
    sujectId
    interviewerId
    index
    timeBegin
    duration
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
  }
}
`;
export const onUpdateRecord = `subscription OnUpdateRecord {
  onUpdateRecord {
    id
    zoom {
      id
      sujectId
      interviewerIds
      description
      testDate
      active
    }
    sujectId
    interviewerId
    index
    timeBegin
    duration
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
  }
}
`;
export const onDeleteRecord = `subscription OnDeleteRecord {
  onDeleteRecord {
    id
    zoom {
      id
      sujectId
      interviewerIds
      description
      testDate
      active
    }
    sujectId
    interviewerId
    index
    timeBegin
    duration
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
  }
}
`;
export const onCreateQuestionSnapshot = `subscription OnCreateQuestionSnapshot {
  onCreateQuestionSnapshot {
    id
    record {
      id
      sujectId
      interviewerId
      index
      timeBegin
      duration
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
      sujectId
      interviewerId
      index
      timeBegin
      duration
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
      sujectId
      interviewerId
      index
      timeBegin
      duration
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
    zooms {
      items {
        id
        sujectId
        interviewerIds
        description
        testDate
        active
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
    zooms {
      items {
        id
        sujectId
        interviewerIds
        description
        testDate
        active
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
    zooms {
      items {
        id
        sujectId
        interviewerIds
        description
        testDate
        active
      }
      nextToken
    }
  }
}
`;

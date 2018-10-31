// eslint-disable
// this is an auto generated file. This will be overwritten

export const getZoom = `query GetZoom($id: ID!) {
  getZoom(id: $id) {
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
export const listZooms = `query ListZooms(
  $filter: ModelZoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listZooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getRecord = `query GetRecord($id: ID!) {
  getRecord(id: $id) {
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
export const listRecords = `query ListRecords(
  $filter: ModelRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getQuestionSnapshot = `query GetQuestionSnapshot($id: ID!) {
  getQuestionSnapshot(id: $id) {
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
    nextToken
  }
}
`;

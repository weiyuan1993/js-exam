export const getTest = `query GetTest($id: ID!) {
  getTest(id: $id) {
    id
    subjectId
    timeBegin
    timeEnd
    records {
      items {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        videoUrl
        ques {
          type 
          content
          name
          test
        }
      }
      nextToken
    }
  }
}`;

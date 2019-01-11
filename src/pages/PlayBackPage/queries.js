export const getTest = `query GetTest($id: ID! $limit: Int) {
  getTest(id: $id) {
    id
    subjectId
    timeBegin
    timeEnd
    records(limit: $limit) {
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

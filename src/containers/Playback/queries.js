export const queryRecordWithHistory = (id, nextToken = null) => `
  query {
    getRecord(id: "${id}") {
      id
      subjectId
      history(limit:10 nextToken:${nextToken} sortDirection:ASC) {
        items {
          time
          code
        }
        nextToken
      }
      ques {
        type
        content
        test
        name
      }
    }
  }
  `;

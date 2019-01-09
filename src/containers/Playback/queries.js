export const queryRecordWithHistory = (id, nextToken = null) => `
  query {
    getRecord(id: "${id}") {
      id
      subjectId
      history(limit:10 nextToken:${nextToken}) {
        items {
          time
          code
        }
        nextToken
      }
    }
  }
  `;

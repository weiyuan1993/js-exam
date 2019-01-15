export const queryRecordWithHistory = `
  query  GetRecord(
    $id: ID!
    $limit: Int
    $nextToken: String
  ) {
    getRecord(id: $id) {
      id
      subjectId
      comment {
        items {
          author
          time
          content
        }
        nextToken
      }
      history(limit: $limit nextToken: $nextToken) {
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

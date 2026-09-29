export const REPOS_QUERY = /* GraphQL */ `
  query Portfolio($login: String!, $after: String) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
          }
        }
      }
      repositories(
        first: 50
        after: $after
        privacy: PUBLIC
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          name
          nameWithOwner
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          isArchived
          pushedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          repositoryTopics(first: 15) {
            nodes {
              topic {
                name
              }
            }
          }
          readme: object(expression: "HEAD:README.md") {
            ... on Blob {
              text
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  nodes {
                    messageHeadline
                    committedDate
                    oid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

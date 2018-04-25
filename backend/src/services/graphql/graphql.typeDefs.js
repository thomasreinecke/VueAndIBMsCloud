const typeDefinitions = `
  type Item {
    id: ID!
    title: String
    status: String
    created_at: String
  }
  type Query {
    Welcome: String,
    Items: [Item]
  }
  type Mutation {
    addItem(id: ID!, title: String!, status: String): Item
  }
  type Subscription {
    itemAdded: Item
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
module.exports = typeDefinitions;
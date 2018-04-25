const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const ITEM_ADDED = 'ITEM_ADDED';
module.exports = function () {
  return {
    Query: {
      Welcome (root, { id }, context) {
        return 'Welcome to VueAndIBMsCLoud example';
      },
      Items (root, { id }, context) {
        return [
          {
            id: 1,
            title: 'Item 1',
            status: 'open',
            created_at: new Date()
          },
          {
            id: 2,
            title: 'Item 2',
            status: 'closed',
            created_at: new Date()
          }
        ];
      }
    },
    Mutation: {
      addItem(root, { id, title, status }, context) {
        const item = {
          id,
          title,
          status,
          created_at: new Date()
        };
        pubsub.publish(ITEM_ADDED, { itemAdded: item });
        return item;
      },
    },
    Subscription: {
      itemAdded: {
        subscribe: () => pubsub.asyncIterator(ITEM_ADDED),
      }
    }
  };
};
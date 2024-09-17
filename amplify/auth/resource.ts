import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Product: a.model({
    id: a.string(),
    name: a.string(),
    description: a.string(), // Handle optionality in application logic
    price: a.float(),
    image: a.string(), // Handle optionality in application logic
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  }).authorization(allow => [allow.publicApiKey()]),

  OrderItem: a.model({
    id: a.string(),
    orderId: a.string(), // Refers to an Order
    productId: a.string(), // Refers to a Product
    quantity: a.float(), 
    price: a.float()
  }).authorization(allow => [allow.publicApiKey()]),

  Order: a.model({
    id: a.string(),
    userId: a.string(), // Refers to a User
    status: a.enum(['PENDING', 'IN_CART', 'PLACED', 'IN_TRANSIT', 'DELIVERED', 'RETURNED', 'REPLACED']),
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  }).authorization(allow => [allow.publicApiKey()]),

  User: a.model({
    id: a.string(),
    email: a.string(),
    password: a.string(),
    name: a.string(), // Handle optionality in application logic
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  }).authorization(allow => [allow.publicApiKey()]),

  Wishlist: a.model({
    id: a.string(),
    userId: a.string(), // Refers to a User
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  }).authorization(allow => [allow.publicApiKey()]),

  Revenue: a.model({
    id: a.string(),
    amount: a.float(),
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  }).authorization(allow => [allow.publicApiKey()]),

  Dashboard: a.model({
    pendingOrders: a.float(), // Changed from int to float
    inCartItems: a.float(), // Changed from int to float
    placedOrders: a.float(), // Changed from int to float
    inTransitOrders: a.float(), // Changed from int to float
    deliveredOrders: a.float(), // Changed from int to float
    returnedOrders: a.float(), // Changed from int to float
    replacedOrders: a.float() // Changed from int to float
  }).authorization(allow => [allow.publicApiKey()])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});

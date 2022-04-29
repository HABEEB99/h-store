export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'password', type: 'string', title: 'Password' },
    { name: 'isAdmin', type: 'boolean', title: 'Is Admin' },
  ],
};

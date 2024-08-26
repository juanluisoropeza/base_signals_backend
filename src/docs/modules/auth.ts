const authSchema = {
  auth: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
};

export { authSchema };

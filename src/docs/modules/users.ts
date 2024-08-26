const userSchema = {
  User: {
    type: 'object',
    required: ['name', 'lastname', 'email', 'phone', 'role', 'gender'],
    properties: {
      name: {
        type: 'string',
      },
      lastname: {
        type: 'string',
      },
      gender: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      active: {
        type: 'boolean',
      },
    },
  },
};

export { userSchema };

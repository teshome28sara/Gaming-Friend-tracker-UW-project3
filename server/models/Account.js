const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// ???
const accountSchema = new Schema({
  gameNote: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  gamerName: {
    type: String,
    required: true,
    trim: true,
  },
  // author: {
  //   type: String,
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  friends: [
    {
      friendNote: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      friendName: {
        type: String,
        required: true,
      },
      // author: {
      //   type: String,
      //   required: true,
      // },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Account = model('Account', accountSchema);

module.exports = Account;

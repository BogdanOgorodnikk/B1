const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    characteristic: {
      type: String
    },
    number: {
      type: Number
    },
    price: {
      type: Number
    },
    data: {
      type: Date,
      default: Date.now
    },
    pledge: {
      type: Number
    },
    debt: {
        type: Number
    },
    debts: {
      type: Number
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: false
  }
);


schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Product', schema);
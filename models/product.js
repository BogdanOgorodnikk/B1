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
      type: Number, 
      required: true
    },
    price: {
      type: Number, 
      required: true
    },
    data: {
      type: Date,
      default: Date.now
    },
    pledge: {
      type: Number
    },
    debt: {
        type: Number,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
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
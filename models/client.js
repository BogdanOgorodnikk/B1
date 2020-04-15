const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const tr = require('transliter');

const schema = new Schema(
  {
    headline: {
      type: String,
      required: true
    },
    describe: {
        type: String
    },
    productCount: {
        type: Number
    },
    productPrice: {
        type: Number
    },
    productDate: {
        type: Date
    },
    sum: {
        type: Number
    },
    debt: {
        type: Number
    },
    tableId: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  {
    timestamps: true
  }
);

schema.plugin(
  URLSlugs('headline', {
    field: 'url',
    generator: text => tr.slugify(text)
  })
);
schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Client', schema);
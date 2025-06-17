const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;

const categories = [
  'All Categories',
  'Tech & Programming',
  'Business & Finance',
  'Health & Fitness',
  'Travel & Adventure',
  'Lifestyle & Fashion',
  'Food & Cooking',
];

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return urlRegex.test(value);
      },
      message: 'Invalid image URL',
    },
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  category: {
    type: [String],              
    default: ['All Categories'], 
    enum: categories,            
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', BlogSchema);

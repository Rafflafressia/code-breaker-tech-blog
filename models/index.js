const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// Users will have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Each post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Users will have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Each comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Each comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Each post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
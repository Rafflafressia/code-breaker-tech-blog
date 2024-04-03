const {Post} = require('../models');

const postData = [
    {
        title: "Tech Blog",
        post_content: "This is a tech blog post",
        user_id: 1
    },
    {
        title: "Cooking Blog",
        post_content: "This is a cooking blog post",
        user_id: 2
    },
    {
        title: "Travel Blog",
        post_content: "This is a travel blog post",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
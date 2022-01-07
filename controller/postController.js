

exports.posts = (req, res) => {
    res.status(200).json(({ post: {title: 'About to post' , description: 'Hello trying to node with jwt'}}))
}
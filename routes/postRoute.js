const express = require('express')
const router = express.Router()
const verify = require('./verify')

const { posts } = require('../controller/postController')

router.get('/', verify , posts);

module.exports = router
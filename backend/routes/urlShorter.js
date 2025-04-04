const express = require('express');
const router = express.Router();
const UrlShorter = require('../controllers/urlShorter');

router.post('/v1/shortern', UrlShorter.generateShortUrl);
router.get('/:shortUrl', UrlShorter.redirect);

module.exports = router;
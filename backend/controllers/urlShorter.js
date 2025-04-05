const Url = require('../models/urlShorter');
const sha1 = require('sha1');

const generateShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: 'Original URL is required' });
        }

        // Check if URL already exists in DB
        let existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({ shortUrl: existingUrl.shortUrl });
        }

        const companyName = process.env.DOMAIN_NAME
        let sha1Encoded = sha1(originalUrl);
        let shortUrl = sha1Encoded.substring(0, 7);

        while (await Url.findOne({ shortUrl })) {
            sha1Encoded = sha1(shortUrl + companyName);
            shortUrl = sha1Encoded.substring(0, 7);
        }

        // Save to database
        const newUrl = new Url({ originalUrl, shortUrl });
        await newUrl.save();

        res.status(201).json({ shortUrl: shortUrl });
    } catch (err) {
        console.error("Error generating short URL:", err);
        res.status(500).json({ error: "Server error" });
    }
};

const redirect = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        // console.log(shortUrl);

        const found = await Url.findOne({ shortUrl });
        if (!found) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.redirect(found.originalUrl);
    } catch (err) {
        console.error("Error redirecting:", err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { generateShortUrl, redirect };

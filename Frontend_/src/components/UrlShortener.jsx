import React, { useState } from 'react';
import axios from 'axios';
import './UrlShortener.css';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/v1/shortern', {
        originalUrl,
      });
      setShortUrl(res.data.shortUrl); 
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="url-shortener-container">
      <h2 className="text-center mb-4">🔗 URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="url-input"
          placeholder="Paste your long URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button className="shorten-btn" type="submit">
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="short-url-box">
          Shortened Link:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;

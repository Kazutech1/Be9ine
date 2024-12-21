import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg mb-4">
          &copy; 2024 Your Platform Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_2021.svg"
              alt="Twitter"
              className="w-6 h-6"
            />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo_2023.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Contact Us: info@yourplatform.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;

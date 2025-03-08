"use client";

import { useState } from 'react';

export default function PostPreview({ post, onSendEmail }) {
  const [email, setEmail] = useState('');
  const [showPost, setShowPost] = useState(false);
  const [copied, setCopied] = useState(false);

  // Show a preview of the post (first 100 characters)
  const previewText = post.substring(0, 100) + '...';

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    onSendEmail(email, post);
    setShowPost(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="font-semibold mb-2">Your LinkedIn Post:</h2>
      
      {!showPost ? (
        <div>
          <p className="mb-4">{previewText}</p>
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-center text-sm mb-3">
              Enter your email to view the full post
            </p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="px-3 py-2 border rounded-md flex-grow"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-md"
              >
                Get Full Post
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <p className="whitespace-pre-wrap mb-4">{post}</p>
          <button
            onClick={copyToClipboard}
            className="py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}
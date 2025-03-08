// components/PostPreview.js
import { useState } from 'react';

const PostPreview = ({ post }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
    alert('Post copied to clipboard!');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/collect-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, post }),
      });
      
      // Check if the response is empty
      const text = await response.text();
      
      if (!text) {
        throw new Error('Empty response from server');
      }
      
      // Try to parse the JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse JSON:', text);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email');
      }
      
      setSubmitSuccess(true);
      setShowFullPost(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to submit your email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get a preview of the post (first 100 characters)
  const postPreview = post.substring(0, 100) + (post.length > 100 ? '...' : '');

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Your LinkedIn Post</h2>
      
      {!showFullPost ? (
        <>
          <div className="bg-white p-4 rounded-md border border-gray-300 whitespace-pre-wrap mb-6">
            {postPreview}
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded">
              <p className="font-medium">Enter your email to see the full post</p>
            </div>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Get Full Post'}
              </button>
            </div>
            
            {error && (
              <p className="mt-2 text-red-600 text-sm">{error}</p>
            )}
          </form>
        </>
      ) : (
        <>
          <div className="bg-white p-4 rounded-md border border-gray-300 whitespace-pre-wrap mb-6">
            {post}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Copy to Clipboard
            </button>
          </div>
          
          {submitSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 font-medium rounded-md">
              ✅ Success! Check your email for a copy of your post.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostPreview;
"use client";

import { useState } from 'react';
import PostForm from '@/components/PostForm';
import PostPreview from '@/components/PostPreview';

export default function Home() {
  const [generatedPost, setGeneratedPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to generate post');
      }
      
      setGeneratedPost(data.post);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to generate post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = (email, post) => {
    // In a real app, we would call an API to send the email
    console.log(`Sending post to ${email}`);
    
    // Simulate API call
    setTimeout(() => {
      setEmailSent(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen">
      <section className="bg-gray-100 py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl sm:max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-900">
                    Free LinkedIn Post Creator
                </h1>
                <p className="text-base sm:text-lg font-medium text-center text-gray-700 mb-6">
                    Create engaging LinkedIn posts in seconds
                </p>

                <PostForm onSubmit={handleFormSubmit} />

                {isLoading && (
                    <div className="mt-6 text-center text-gray-700 font-semibold">
                        <p>⏳ Generating your post...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 sm:p-4 bg-red-100 text-red-700 font-medium rounded-md text-center">
                        {error}
                    </div>
                )}

                {generatedPost && !isLoading && (
                    <PostPreview 
                        post={generatedPost} 
                        onSendEmail={handleSendEmail} 
                    />
                )}

                {emailSent && (
                    <div className="mt-4 p-3 sm:p-4 bg-green-100 text-green-700 font-medium rounded-md text-center">
                        ✅ Email sent successfully! Check your inbox.
                    </div>
                )}
            </div>
        </div>
    </section>

    <section className="bg-gray-100 py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl sm:max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-900">
                How to Use the Free LinkedIn Post Creator
            </h2>
            <p className="text-base sm:text-lg text-center text-gray-700 mb-6">
                Create an engaging LinkedIn post in seconds with these simple steps!
            </p>

            <div className="space-y-6">
                {/* Step 1 */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">1️⃣ Enter Your Topic</h3>
                    <p className="text-gray-700">Type in what your post is about.</p>
                    <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mt-2">
                        <li><strong>Leadership tips</strong></li>
                        <li><strong>Remote work productivity</strong></li>
                        <li><strong>Industry trends in AI</strong></li>
                    </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">2️⃣ Add Key Points (Optional)</h3>
                    <p className="text-gray-700">Include bullet points or ideas to guide the post. If left blank, the generator will create a structured post for you.</p>
                    <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mt-2">
                        <li>Engage with comments</li>
                        <li>Post valuable insights</li>
                        <li>Send personalized connection requests</li>
                    </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">3️⃣ Choose Your Tone</h3>
                    <p className="text-gray-700">Select the style that best fits your audience:</p>
                    <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mt-2">
                        <li><strong>Professional</strong> → Polished & business-like</li>
                        <li><strong>Conversational</strong> → Casual & friendly</li>
                        <li><strong>Enthusiastic</strong> → Energetic & engaging</li>
                        <li><strong>Educational</strong> → Informative & insightful</li>
                    </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">4️⃣ Click "Generate LinkedIn Post"</h3>
                    <p className="text-gray-700">Hit the blue button, and in seconds, you'll get a fully structured LinkedIn post that you can copy, tweak, and post! 🚀</p>
                </div>

                {/* Benefits */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Why Use This Tool?</h3>
                    <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mt-2">
                        <li><strong>✅ Saves time</strong> – No more struggling with post ideas</li>
                        <li><strong>✅ Optimized for LinkedIn</strong> – Follows best practices for engagement</li>
                        <li><strong>✅ Customizable</strong> – Add your own voice & edits</li>
                    </ul>
                </div>
            </div>

            <p className="text-center text-base sm:text-lg font-semibold text-gray-900 mt-6">
                Try it now and start posting smarter on LinkedIn! 🔥💼
            </p>
        </div>
    </section>
    <footer className="bg-gray-900 text-white py-6 text-center mt-12">
    <div className="max-w-4xl mx-auto px-6">
        <p className="text-sm">⚡ Built by <a href="https://twitter.com/JaySConfig" className="underline hover:text-gray-300">JaySConfig</a> – because writing LinkedIn posts manually is so 2023.</p>
        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} All Rights Reserved.</p>

    </div>
</footer>

    


      
    </main>
  );
}
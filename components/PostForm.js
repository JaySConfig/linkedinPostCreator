"use client";

import { useState } from 'react';

export default function PostForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    topic: '',
    keyPoints: '',
    tone: 'professional'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium">
          What's your post about?
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md text-gray-700"
          placeholder="e.g., &apos;Leadership tips&apos; or &apos;Industry trends&apos;"
        />
      </div>

      <div>
        <label htmlFor="keyPoints" className="block text-sm font-medium">
          Key Points (optional)
        </label>
        <textarea
          id="keyPoints"
          name="keyPoints"
          value={formData.keyPoints}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          placeholder="Enter bullet points or ideas you want to include"
        />
      </div>

      <div>
        <label htmlFor="tone" className="block text-sm font-medium">
          Tone
        </label>
        <select
          id="tone"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        >
          <option value="professional">Professional</option>
          <option value="conversational">Conversational</option>
          <option value="enthusiastic">Enthusiastic</option>
          <option value="educational">Educational</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 border rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Generate LinkedIn Post
        </button>
      </div>
    </form>
  );
}
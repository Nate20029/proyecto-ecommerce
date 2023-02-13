import React, { useState, useEffect } from 'react';
import mongoose from 'mongoose';

import { initMongoose } from '../lib/mongoose';

const EditDocument = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initMongoose()
      .then(() => setIsLoading(false))
      .catch((error) => setError(error));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const document = await mongoose.models.products.findOne({
        title,
        description
      });

      if (!document) {
        return setError(new Error('Document not found'));
      }

      setDocumentId(document._id);
      setTitle(document.title);
      setDescription(document.description);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mongoose.models.products.updateOne(
        { _id: documentId },
        { title, description }
      );

      setTitle('');
      setDescription('');
      setDocumentId('');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {documentId && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </>
);
};
export default EditDocument;
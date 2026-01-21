import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostItem({ title, body, isLoading }) {
  return (
    <section className="retro-container">
      {isLoading ? (
        <div className="loading">Loading amazing content...</div>
      ) : (
        <div className="retro-card">
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      )}
    </section>
  );
}

export default PostItem;

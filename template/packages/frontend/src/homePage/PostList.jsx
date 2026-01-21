import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  let data = posts;
  let isLoading = loading;
  let dataAlreadyLoaded = false;

  let preLoadedData = window.getPreLoadedData
    ? window.getPreLoadedData()
    : null;

  if (preLoadedData) {
    data = preLoadedData;
    isLoading = false;
    dataAlreadyLoaded = true;
  }

  window.EXPORT_STATIC_PAGE_DATA = data;

  useEffect(() => {
    if (!dataAlreadyLoaded) {
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [dataAlreadyLoaded]);

  return (
    <section>
      <h2>Posts</h2>
      <p className="subtitle">
        This section loads data from an external API on the client side.
        <br />
        Do right click and select view page source. Data was rendered on the
        initial paint itself
      </p>

      {isLoading ? (
        <div className="loading">Loading amazing content...</div>
      ) : (
        <div className="card-grid">
          {data.map((post) => (
            <div key={post.id} className="card">
              <h3>{post.title.substring(0, 30)}...</h3>
              <p>{post.body.substring(0, 100)}...</p>
              <div className="button-group">
                <a
                  href={`/post/${post.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  Open in new tab (See SSR in action)
                </a>
                <Link to={`/post/${post.id}`} className="btn">
                  Open (CSR is used)
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PostList;

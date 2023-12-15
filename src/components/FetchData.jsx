import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const FetchData = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } else {
        setError("Response not ok");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button disabled={limit >= posts.length} onClick={() => setLimit(limit + 10)}>
        Click to fetch
      </button>
      {error && <h2>{error}</h2>}
      {loading && <p>Loading.....</p>}
      {posts &&
        posts.slice(0, limit).map((post, index) => {
          return (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.id}</p>
              <p>{post.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default FetchData;

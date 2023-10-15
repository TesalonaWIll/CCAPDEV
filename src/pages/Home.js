import React from "react";
import { useState } from "react";

const Home = () => {
  const [posts] = useState([
    {
      postedBy: "Posted by #DLSUFW # 23446",
      message:
        "i checked my bfs phone and saw sa chat na he complimented this girl with her new look lmao is that ok?",
      comments: "comments",
      id: 1,
    },

    {
      postedBy: "Posted by #DLSUFW # 23447",
      message: "hello world",
      comments: "comments",
      id: 2,
    },

    {
      postedBy: "Posted by #DLSUFW # 23447",
      message: "hello asdlf;jasdlf",
      comments: "comments",
      id: 3,
    },

    {
      postedBy: "Posted by #DLSUFW # 23447",
      message: "asdffffhjlsadgbflksj",
      comments: "comments",
      id: 4,
    },
  ]);

  return (
    <div className="container">
      <div id="empty"></div>
      {posts.map((post) => (
        <div id="post" key={post.id}>
          <div id="content">
            <div id="postedBy">{post.postedBy}</div>
            <div id="message">{post.message}</div>
            <div id="comments">{post.comments}</div>
          </div>
        </div>
      ))}
      <div id="popular">
        <div id="content">
          <div id="postedBy">Posted by #DLSUFW # 23446</div>
          <div id="message">
            i checked my bfs phone and saw sa chat na he complimented this girl
            with her new look lmao is that ok?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

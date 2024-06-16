import React, { useState, useEffect } from "react";
import axios from "axios";
const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState("");
  const [reply, setReply] = useState("");
  const [postList, setPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [writeSectionOpen, setWriteSectionOpen] = useState(false);
  const [replyList, setReplyList] = useState([]);
  const [replySectionsOpen, setReplySectionsOpen] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const createPost = () => {
    axios
      .post(`http://localhost:4000/posting/${user?._id}`, {
        content: content,
        title: title,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/get-post`)
      .then((res) => {
        setPostList(res?.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);
  const addComment = (item) => {
    axios
      .post(`http://localhost:4000/post-comment`, {
        text: comments,
        author: user?._id,
        postId: item?._id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/get-comment`)
      .then((res) => {
        setCommentList(res?.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);
  const onReply = (item) => {
    axios
      .post(`http://localhost:4000/post-reply`, {
        reply: reply,
        author: user?._id,
        postId: item?.postId,
        commentId: item?._id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const toggleReplySection = (commentId) => {
    setReplySectionsOpen((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/get-reply`)
      .then((res) => {
        setReplyList(res?.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);
  console.log(commentList, "commentList");
  console.log(replyList, "replyList");
  return (
    <div className="container">
      <h4 className="text-center">Add Posts</h4>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Content
        </label>
        <textarea
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-danger w-100 py-2"
        onClick={createPost}
      >
        createPost
      </button>
      {postList?.map((item) => {
        return (
          <div className="post_box my-2" key={item?._id}>
            <p>{item?.title}</p>
            <h6>{item?.content}</h6>

            {writeSectionOpen && (
              <>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <p
                  className="text-primary cursor-pointer"
                  onClick={() => addComment(item)}
                >
                  post
                </p>
              </>
            )}
            <div className="d-flex justify-content-center">
              <p
                className="text-primary fw-bolder cursor-pointer"
                onClick={() => setWriteSectionOpen(!writeSectionOpen)}
              >
                Comment
              </p>
            </div>

            {item?.comments?.map((item1) => {
              return (
                <div
                  className="row align-items-center position-relative"
                  key={item1?._id}
                >
                  <div className="col-md-1">
                    <img
                      src={`http://localhost:4000/${item1?.author?.image}`}
                      className="comment_img"
                      width="100"
                      height="150"
                      alt="img not found"
                    />
                  </div>
                  <div className="col-md-11">
                    <div className="comment_wrapper ">
                      <h6 className="mb-0">{item1?.author?.name}</h6>
                      <p className="mb-0">{item1?.text}</p>
                    </div>
                    {!replySectionsOpen[item1?._id] && (
                      <p
                        className="text-primary my-0 cursor-pointer"
                        onClick={() => toggleReplySection(item1?._id)}
                      >
                        Reply
                      </p>
                    )}

                    {replySectionsOpen[item1?._id] && (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="reply"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                        />
                        <p
                          className="text-primary cursor-pointer"
                          onClick={() => onReply(item1)}
                        >
                          Post
                        </p>
                      </>
                    )}
                    {commentList?.map((data1) => {
                      return data1?.reply?.map((data2) => {
                        return (
                          data1?._id == data2?.commentId && (
                            <div
                              className="row align-items-center"
                              key={data2?._id}
                            >
                              <div className="col-md-1">
                                <img
                                  src={`http://localhost:4000/${data2?.author?.image}`}
                                  className="comment_imgg"
                                  width="100"
                                  height="150"
                                  alt="img not found"
                                />
                              </div>
                              <div className="col-md-11">
                                <div className="comment_wrapper ">
                                  <p className="mb-0">{data2?.reply}</p>
                                </div>
                              </div>
                            </div>
                          )
                        );
                      });
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
     
    </div>
  );
};

export default Post;

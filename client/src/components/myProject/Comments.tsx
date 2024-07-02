import { useDispatch, useSelector } from "react-redux";
import { getAllComments, createComment } from "../../redux/thunk/commentThunks";
import { RootState } from "../../redux/store/store";
import { useEffect, FC, useState, FormEvent } from "react";
import { CiStar } from "react-icons/ci";

interface CommentsProps {
  projectId: string;
}

const Comments: FC<CommentsProps> = ({ projectId }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state: RootState) => state.comment);
  const currentUser = useSelector((state: RootState) => state.navbar);
  const [commentContent, setCommentContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const allComments = comment.data || [];
  const allCommentsForProject = allComments.filter(
    (comment) => comment.project === projectId
  );

  const currentUserId = currentUser.data?.data?.user._id;

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentUserId) {
      dispatch(
        createComment({
          content: commentContent,
          user: currentUserId,
          project: projectId,
          rating,
        })
      );
      setCommentContent("");
      setRating(0);
    } else {
      alert("You must be logged in to post a comment");
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <form className="mb-6" onSubmit={handleCommentSubmit}>
        <textarea
          className="w-full p-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
          placeholder="Add a comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          required
        ></textarea>
        <div className="flex space-x-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <CiStar
              key={star}
              className={`w-8 h-8 cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-2 shadow-md hover:bg-indigo-600 transition"
        >
          Submit
        </button>
      </form>

      <div className="comments grid grid-cols-1 md:grid-cols-2 gap-4">
        {allCommentsForProject.length > 0 ? (
          allCommentsForProject.map((comment) => (
            <div
              key={comment._id}
              className="comment bg-gray-100 p-6 rounded-lg mb-4 shadow-md"
            >
              <div className="flex items-center mb-4">
                <img
                  src={comment.user.photo}
                  alt="User"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-800 font-semibold">
                    {comment.user.userName}
                  </p>
                  <p className="text-gray-600">{comment.rating} ★</p>
                </div>
              </div>
              <p className="text-gray-800 font-bold">"{comment.content}"</p>
              <p className="text-gray-700">
                <span className="text-gray-500 text-sm">
                  Published: {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;

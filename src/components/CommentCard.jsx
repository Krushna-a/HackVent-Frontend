import { useState,useEffect } from "react";
import axios from "axios";
const CommentCard = ({ comment }) => {
  const [commentUser, setCommentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/getCommentUser`,
        { userId: comment.userId },
        { withCredentials: true }
      );
      setCommentUser(res.data.profile);
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (comment?.userId) {
      fetchUser();
    }
  }, [comment]);

  if (loading) return <div className="p-4">Loading user...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="flex items-start gap-3">
      <img
        src={commentUser?.profileImage || "/default-avatar.png"}
        alt={commentUser?.fullName || "User"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-start items-start">
            <div>
              <h4 className="font-bold text-gray-800">
                {commentUser?.fullName || "Anonymous"}
              </h4>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard
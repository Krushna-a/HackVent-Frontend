// CommentSection.js
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import CommentCard from "./CommentCard";
import IconHeader from "./IconHeader";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommentSection = ({isRegisteredToHack}) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let params = useParams();
  let hackId = params.hackId;

  const getComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/hack/getIndividualHack/${hackId}`,
        { withCredentials: true }
      );
      setAllComments(res.data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isRegisteredToHack){
      return;
    }
    if (!comment.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/hack/addComment`,
        { hackId, comment },
        { withCredentials: true }
      );
      setComment("");
      await getComments(); // Refresh comments
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <IconHeader icon={faComment} color="blue" title={`Discussion`} />

      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add your comment..."
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={!isRegisteredToHack || !comment.trim}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {allComments.length > 0 ? (
          allComments.map((comment, index) => (
            <CommentCard key={comment._id || index} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

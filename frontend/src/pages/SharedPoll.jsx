
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Polls from "./Polls.jsx";
import API from "../../api/axios.js";

function SharedPoll() {
  const { shareToken } = useParams();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await API.get(`/p/${shareToken}`);
        if (!res.ok) {
          const data = await res.json();
          return setError(data.message);
        }
        const data = await res.json();
        console.log(data)
        setPoll(data);
      } catch (err) {
        setError("Failed to load poll");
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [shareToken]);

  if (loading) return <p>Loading poll...</p>;
  if (error)   return <p>{error}</p>;

  return <Polls/>;  
}

export default SharedPoll;
import Poll from "../models/poll.js";
import Vote from "../models/vote.js";

export default function setupPollSocket(io) {
  io.on("connection", (socket) => {
    socket.io("join-poll", async (pollId) => {
      socket.join(pollId);

      try {
        const poll = await Poll.findById(pollId);
        if (!poll) return socket.emit("vote-error", "poll not found");
        socket.emit("vote-update", poll.options);
      } catch (error) {
        socket.emit("vote-error", "poll not found");
      }
    });

    socket.io("cast-vote", async ({ pollId, optionIndex, fingerprint }) => {
      try {
        await Vote.create({ pollId, optionIndex, fingerprint });

        const updateVote = { $inc: {} };
        updateVote.$inc[`options.${optionIndex}.votes`] = 1;
        const poll = await Poll.findByIdAndUpdate(pollId, updateVote, {
          new: true,
        });

        if (!poll) return socket.emit("vote-error", "Poll not found");
        io.to(pollId).emit("vote-update", poll.options);
      } catch (error) {
        if (err.code === 11000) {
          return socket.emit("vote-error", "You already voted on this poll!");
        }
        console.error(err);
        socket.emit("vote-error", "Something went wrong");
      }
    });
    socket.on('disconnect',()=>{
        console.log('User disconnected! ')
    })
  });
}

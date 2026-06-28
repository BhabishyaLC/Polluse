import mongoose from "mongoose";
import crypto from "crypto";

const PollModel = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    shareToken: {
      type: String,
      unique: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

PollModel.pre("save", async function () {
  if (!this.shareToken) {
    this.shareToken = crypto.randomBytes(8).toString("hex");
  }
});

const Poll = mongoose.model("Polls", PollModel);

export default Poll;

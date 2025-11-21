import mongoose from "mongoose";

const clubMeetingSchema = mongoose.Schema({
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Upcoming", "Completed", "Cancelled"],
        default: "Upcoming"
    },
    notes: {
        type: String
    }
}, {timestamps: true});

const ClubMeeting = mongoose.model("ClubMeeting", clubMeetingSchema);

export default ClubMeeting;
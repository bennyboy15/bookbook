import mongoose from "mongoose";

const clubMembershipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Owner"],
        default: "User"
    }
}, { timestamps: true });

const ClubMembership = mongoose.model("ClubMembership", clubMembershipSchema);

export default ClubMembership;
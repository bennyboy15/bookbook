import Club from "../models/club.model.js";
import ClubMeeting from "../models/clubMeeting.model.js";

export async function createClubMeeting(req, res) {
    try {
        const { id } = req.params;
        const { title, date, location, description, notes } = req.body;

        if (!title || !location) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const existingClub = await Club.findById(id);
        if (!existingClub) return res.status(404).json({ message: "Club not found" });

        const newMeeting = await ClubMeeting.create({ club_id: id, title, date, location, description, created_by: req.user._id, notes });

        return res.status(201).json(newMeeting);

    } catch (error) {
        console.log("Error in createClubMeeting in clubMeeting controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateClubMeeting(req, res) {
    try {
        const { id, meetingId } = req.params;
        const { title, date, location, description, status, notes } = req.body;

        const existingClub = await Club.findById(id);
        if (!existingClub) return res.status(404).json({ message: "Club not found" });

        const updatedMeeting = await ClubMeeting.findByIdAndUpdate(
            meetingId,
            { title, date, location, description, status, notes },
            { new: true }
        );

        if (!updatedMeeting) return res.status(404).json({ message: "Meeting not found" });

        return res.status(200).json(updatedMeeting);

    } catch (error) {
        console.log("Error in updateClubMeeting in clubMeeting controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getClubMeeting(req, res) {
    try {
        const { id, meetingId } = req.params;

        const existingClub = await Club.findById(id);
        if (!existingClub) return res.status(404).json({ message: "Club not found" });

        const foundMeeting = await ClubMeeting.findOne({ club_id: id, _id: meetingId });

        return res.status(201).json(foundMeeting);

    } catch (error) {
        console.log("Error in getClubMeeting in clubMeeting controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteClubMeeting(req, res) {
    try {
        const { id, meetingId } = req.params;

        // Check club exists
        const existingClub = await Club.findById(id);
        if (!existingClub) return res.status(404).json({ message: "Club not found" });

        // Check meeting exists
        const meeting = await ClubMeeting.findById(meetingId);
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });

        // Check if meeting belongs to club
        if (meeting.club_id.toString() !== id) {
            return res.status(400).json({ message: "Meeting does not belong to this club" });
        }

        // Delete meeting
        await ClubMeeting.findByIdAndDelete(meetingId);

        return res.status(200).json({ message: "Successfully deleted meeting" });
    } catch (error) {
        console.error("Error in deleteClubMeeting controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

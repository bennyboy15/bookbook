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

        const newMeeting = await ClubMeeting.create({ club_id: id, title, date, location, description, created_by:req.user._id, notes });

        return res.status(201).json(newMeeting);

    } catch (error) {
        console.log("Error in createClubMeeting in clubMeeting controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getClubMeeting(req,res){
     try {
        const { id, meeting } = req.params;

        const existingClub = await Club.findById(id);
        if (!existingClub) return res.status(404).json({ message: "Club not found" });

        const foundMeeting = await ClubMeeting.findOne({ club_id: id, _id: meeting});

        return res.status(201).json(foundMeeting);

    } catch (error) {
        console.log("Error in getClubMeeting in clubMeeting controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
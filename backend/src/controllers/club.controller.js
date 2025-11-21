import Club from "../models/club.model.js";
import ClubMembership from "../models/clubMembership.model.js";

export async function getClubs(req, res) {
    try {
        const clubs = await Club.find();
        return res.status(200).json(clubs);
    } catch (error) {
        console.log("Error in getClubs club controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getClubMembersCount(req, res) {
    try {
        const { id } = req.params;

        // Optional: check if the club exists
        const clubExists = await Club.exists({ _id: id });
        if (!clubExists) {
            return res.status(404).json({ message: "Club not found" });
        }

        // Count without fetching docs
        const count = await ClubMembership.countDocuments({ club_id: id });

        return res.status(200).json({ count });
    } catch (error) {
        console.log("Error in getClubMembersCount controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function createClub(req, res) {
    try {

        const { name, description } = req.body;
        const normalizedName = name.trim().toUpperCase();

        if (!name) return res.status(400).json({ message: "Missing club name" });

        const existingClub = await Club.findOne({ name: normalizedName });
        if (existingClub) return res.status(400).json({ message: "Club with this name already exists" });

        const newClub = await Club.create({ name: normalizedName, description, created_by: req.user._id });

        return res.status(201).json(newClub);

    } catch (error) {
        console.log("Error in createClub club controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getSpecificClub(req, res) {
    try {
        const { id } = req.params;
        const club = await Club.findById(id);
        if (!club) return res.status(400).json({ message: "Club not found" });
        return res.status(200).json(club);
    } catch (error) {
        console.log("Error in getSpecificClub club controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateClub(req, res) {
    try {

        const { id } = req.params;
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ message: "Missing club name" });

        const club = await Club.findById(id);
        if (!club) return res.status(400).json({ message: "Club not found" });
        
        const normalizedName = name.trim().toUpperCase();

        const existingClub = await Club.findOne({ name: normalizedName, _id: { $ne: id } });
        if (existingClub) return res.status(400).json({ message: "Club with this name already exists" });

        const updatedClub = await Club.findByIdAndUpdate(id, { name: normalizedName, description }, { new: true });

        return res.status(200).json(updatedClub);

    } catch (error) {
        console.log("Error in updateClub club controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteClub(req, res) {
    try {
        const { id } = req.params;
        const club = await Club.findById(id);
        if (!club) return res.status(400).json({ message: "Club not found" });
        if (club.created_by.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorised - You are not the owner" });
        }
        await club.deleteOne();
        return res.status(200).json({ message: "Successfully deleted club" });
    } catch (error) {
        console.log("Error in deleteClub club controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
import Club from "../models/club.model.js";
import ClubMembership from "../models/clubMembership.model.js";
import User from "../models/user.model.js";

export async function getClubMembers(req, res) {
    try {
        const { id } = req.params;
        const club = await Club.findById(id);
        if (!club) return res.status(404).json({ message: "Club not found" });

        const members = await ClubMembership.find({ club_id: id }).populate("user_id", "name username profileImage");

        return res.status(200).json(members);
    } catch (error) {
        console.log("Error in getClubMembers clubMembership controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function addClubMember(req, res) {
    try {
        const { id, userId } = req.params;
        const club = await Club.findById(id);
        if (!club) return res.status(404).json({ message: "Club not found" });

        const existingUser = await User.findById(userId);
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const existingMembership = await ClubMembership.findOne({
            user_id: userId,
            club_id: id
        });
        if (existingMembership) return res.status(400).json({message: "User is already a member of this group"});

        const newMembership = await ClubMembership.create({ user_id:userId, club_id: id });

        return res.status(201).json(newMembership);
    } catch (error) {
        console.log("Error in addClubMember clubMembership controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function removeClubMember(req, res) {
    try {
        const { id } = req.params;
        const club = await Club.findById(id);
        if (!club) return res.status(404).json({ message: "Club not found" });

        const existingMembership = await ClubMembership.findOne({
            user_id: req.user._id,
            club_id: id
        });
        if (!existingMembership) return res.status(400).json({message: "User is not a member of this club"});

        await existingMembership.deleteOne();

        return res.status(200).json({message: "Successfully removed user from the club"});
    } catch (error) {
        console.log("Error in removeClubMember clubMembership controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateClubRole(req, res) {
    try {
        const { id } = req.params;
        const {role} = req.body;
        const allowed_roles = ["User", "Admin", "Owner"];
        const club = await Club.findById(id);
        if (!club) return res.status(404).json({ message: "Club not found" });

        if (!allowed_roles.includes(role)) return res.status(400).json({message: "Role does not exist must be [User, Admin, Owner]"});

        const existingMembership = await ClubMembership.findOne({
            user_id: req.user._id,
            club_id: id
        });
        if (!existingMembership) return res.status(400).json({message: "User is not a member of this club"});

        existingMembership.role = role;
        await existingMembership.save();

        return res.status(200).json(existingMembership);
    } catch (error) {
        console.log("Error in removeClubMember clubMembership controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

import mongoose from "mongoose";
import Follow from "../models/follows.model.js";
import User from "../models/user.model.js";

export async function getFollowers(req, res) {
    try {
        const { id } = req.params;

        const followers = await Follow.find({ following_id: id }).populate("follower_id", "name username profileImage");
        const followering = await Follow.find({ follower_id: id }).populate("following_id", "name username profileImage");
        //return res.status(200).json({followering:followering, followers:followers, follower_count:followers.length, followering_count:followering.length});
        return res.status(200).json({ follower_count: followers.length, followering_count: followering.length });
    } catch (error) {
        console.log("Error in getFollowers user controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function followUser(req, res) {
    try {
        const { id } = req.params;

        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const existingFollow = await Follow.findOne({
            follower_id: req.user._id,
            following_id: id
        });
        if (existingFollow) {
            return res.status(400).json({ message: "You already follow this user" });
        }

        const userToFollow = await User.findById(id);
        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }
        const newFollow = new Follow({
            follower_id: req.user._id,
            following_id: userToFollow._id
        });
        await newFollow.save();
        return res.status(200).json({ message: "Successfully followed user" });
    } catch (error) {
        console.log("Error in followUser user controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function unfollowUser(req, res) {
    try {
        const { id } = req.params;
        const existingFollow = await Follow.findOne({
            follower_id: req.user._id,
            following_id: id
        });
        if (!existingFollow) {
            return res.status(400).json({ message: "Unable to find followed connection" });
        }

        await Follow.findByIdAndDelete(existingFollow._id);
        return res.status(200).json({ message: "Successfully unfollowed user" });
    } catch (error) {
        console.log("Error in unfollowUser user controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateProfile(req, res) {
    try {
        if (!req.user) {
            return res.status(400).json({ message: "User not found" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({ message: "Email is already in use" });
        };

        const allowedUpdates = ["name", "email", "profileImage"];
        const updates = {};

        for (const key of allowedUpdates) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        const updatedProfile = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        return res.status(200).json(updatedProfile);

    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

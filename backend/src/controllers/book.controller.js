import cloudinary from "../lib/cloudinary.js"
import Book from "../models/book.model.js";

export async function createBookReview (req,res) {
     try {
        const {title, caption, image, rating } = req.body;

        if (!title || !image || !rating) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageURL = uploadResponse.secure_url;

        const book = new Book({title, caption, image:imageURL, rating, user:req.user._id});

        await book.save();

        return res.status(201).json(book);

    } catch (error) {
        console.log("Error in createBookReview bookController", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
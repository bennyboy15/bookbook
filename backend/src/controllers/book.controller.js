import cloudinary from "../lib/cloudinary.js";
import Book from "../models/book.model.js";

export async function createBookReview(req, res) {
  try {
    console.log("TEST", req.body);
    const { title, caption, rating } = req.body;

    if (!title || !rating || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload buffer to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload_stream(
      { folder: "books" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const book = new Book({
          title,
          caption,
          rating,
          image: result.secure_url,
          user: req.user._id,
        });

        await book.save();
        return res.status(201).json(book);
      }
    );

    // Multer gives us the file buffer → pass it to Cloudinary stream
    uploadResponse.end(req.file.buffer);

  } catch (error) {
    console.log("Error in createBookReview controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function getBookReviews(req, res) {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        const books = await Book.find().sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "username profileImage");

        const totalBooks = await Book.countDocuments();

        return res.status(200).json({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit)
        });

    } catch (error) {
        console.log("Error in getBookReviews bookController", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteBookReview(req, res) {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorised" });
        }

        if (book.image && book.image.includes("cloudinary")) {
            try {
                const imageId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(imageId);
            } catch (error) {
                console.log("Error deleting image from cloudinary", error)
            }
        }

        await book.deleteOne();

        return res.status(200).json({ message: "Deleted Book Review" });

    } catch (error) {
        console.log("Error in deleteBookReview bookController", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getUserBookReviews(req, res) {
    try {
        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
        return res.json(books);
    } catch (error) {
        console.log("Error in getUserBookReviews bookController", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
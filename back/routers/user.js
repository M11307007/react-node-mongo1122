const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../model/user");

// Create a new user
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let user = new User({
            name: req.body.name,
            company: req.body.company,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            zip: req.body.zip,
            state: req.body.state,
            country: req.body.country,
            phone: req.body.phone,
            photo: result.secure_url,
        });
        await user.save();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error creating user" });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error fetching user" });
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // If the user has a photo, delete it from Cloudinary
        if (user.photo) {
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }
        await user.deleteOne();
        res.json({ success: true, message: "User deleted", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
});

// Update a user
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // If the user has a photo, delete it from Cloudinary before updating
        if (user.photo && req.file) {
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }

        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            name: req.body.name || user.name,
            company: req.body.company || user.company,
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            address: req.body.address || user.address,
            zip: req.body.zip || user.zip,
            state: req.body.state || user.state,
            country: req.body.country || user.country,
            phone: req.body.phone || user.phone,
            photo: result?.secure_url || user.photo, // If there's a new photo, update it, else keep the old one
            cloudinary_id: result?.public_id || user.cloudinary_id, // If there's a new photo, update its Cloudinary ID
        };

        user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error updating user" });
    }
});

module.exports = router;

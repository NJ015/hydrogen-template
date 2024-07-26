import UserModel from "../model/User.js";

export const create = async (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new UserModel(req.body);

    try {
        const data = await user.save();
        res.send({ message: "User created successfully!!", user: data });
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while creating user" });
    }
};

export const findAll = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    try {
        const data = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).send({ message: "User not found." });
        }
        res.send({ message: "User updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const data = await UserModel.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send({ message: "User not found." });
        }
        res.send({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

import mongoose from "mongoose";
import Training from "../models/training.js";

export const saveTraining = async (req, res) => {
    const { id, training } = req.body;

    try {
        const oldTraining = await Training.findOne({id: id});
        if (oldTraining) {
            const oldTrainingArray = oldTraining.training;
            oldTrainingArray.push(training);
            const updatedTraining = await Training.findOneAndUpdate({id: id}, { training: oldTrainingArray });
            res.status(201).json(updatedTraining );
        }
        else {
            const trainingArray = [];
            trainingArray.push(training);
            const newTraining = new Training({ id, training: trainingArray});
            await newTraining.save();
            res.status(201).json(newTraining );
        }
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getTraining = async (req, res) => {
    try {
        const training = await Training.find();

        res.status(200).json(training);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteTraining = async (req, res) => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");

    await Training.findByIdAndRemove(id);

    res.json({ message: "Training deleted successfully" });
}
import mongoose from "mongoose";

const trainingSchema = mongoose.Schema({
    id: String, 
    training: [
        {
            date: String,
            am: String,
            pm: String,
            strides: String,
            workout: String,
            reflection: String
        }
    ]
});

const Training = mongoose.model("Training", trainingSchema);

export default Training;
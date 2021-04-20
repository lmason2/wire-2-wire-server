import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    public: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        state: { type: String, required: false },
        typesOfRuns: [{
            easy: {type: Boolean, default: false},
            workouts: {type: Boolean, default: false},
            longRun: {type: Boolean, default: false},
            hills: {type: Boolean, default: false},
            flat: {type: Boolean, default: false},
            trails: {type: Boolean, default: false}
        }],
        email: { type: String, required: true },
        runDuring: [{
            highSchool: {type: Boolean, default: false},
            college: {type: Boolean, default: false},
            semiPro: {type: Boolean, default: false},
            pro: {type: Boolean, default: false},
            hobby: {type: Boolean, default: false},
            other: {type: Boolean, default: false}
        }],
        id: { type: String },
        friends: [String],
        currentForm: [String]
    },
    private: {
        password: { type: String, required: false },
        primaryAddress: [{
            street: String,
            city: String,
            zip: Number
        }],
        shippingAddress: [{
            street: String,
            city: String,
            zip: Number
        }],
        gender: String,
        phone: Number,
        birthday: Date
    }
});

export default mongoose.model("User", userSchema);
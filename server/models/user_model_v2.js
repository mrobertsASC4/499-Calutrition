import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema (
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        /* 
        username: {
            type: String,
            trim: true,
            required: true,
        },

        */

        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },

        age: {
            type: Number,
            required: true,
            min: 13,
            max: 90,
        },

        height_ft: {
            type: Number,
            required: true, 
        },
        
        height_inch: {
            type: Number,
            required: true,
        },
        
        weight: {
            type: Number,
            required: true,

        },
        
        gender: {
            type: String,
            required: true,

        },
        
        activitylevel: {
            type: String,
            required: true,

        },
        
        goal: {
            type: String,
            required: true,
        },

        calories: {
            type: Number,
            required: true,
        },

        role: {
            type: String,
            default: "User",
        },

        /*
        image: {
            public_id: "",
            url: "",
        },
        */

    },

    { timestamps: true }
);

export default mongoose.model("User", userSchema);
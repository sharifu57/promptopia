import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"  //one to Many prompts
    },

    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },

    // tag: {
    //     type: String,
    //     required: [false]
    // },

    created: {
        type: Date,
        default: Date.now,
    },

    rating : {
        type: Number,
        required: [true, 'Please Enter a Number']
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt;
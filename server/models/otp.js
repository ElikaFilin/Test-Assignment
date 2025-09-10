import { Schema, model } from 'mongoose'

const otpSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    }

}, { timestamps: true })

const otpModel = model('OTP', otpSchema)

export default otpModel
import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js';

const transcriptSchema = Schema({
    employeeName: {
        type: String,
        required: false
    },
    designation: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    salaryMonth: {
        type: String,
        required: false
    },
    totalSalary: {
        type: Number,
        required: false
    },
    lateArrivals: {
        type: Number,
        required: false
    },
    halfDays: {
        type: Number,
        required: false
    },
    dayOffs: {
        type: Number,
        required: false
    },
    amountPerDayOff: {
        type: Number,
        required: false
    },
    netSalary: {
        type: Number,
        required: false
    },
    uid: {
        type: String
    }
}, { timestamps: true })

transcriptSchema.pre('save', async function (next) {
    if (!this.uid) {
        let isUnique = false;
        let generatedIdentifier;

        while (!isUnique) {
            generatedIdentifier = generateUniqueIdentifier();

            const existingDocument = await this.constructor.findOne({ uid: generatedIdentifier });

            if (!existingDocument) {
                isUnique = true; // Identifier is unique, exit the loop
            }
        }

        this.uid = generatedIdentifier;
    }
    next();
});

const transcriptModel = model('Transcript', transcriptSchema)
export default transcriptModel
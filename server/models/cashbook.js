import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const cashbookSchema = Schema({
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: false }, // to show cashbook in ledger
    type: { type: String, required: true, enum: ['in', 'out'] },
    staff: { type: String, required: true },
    clientName: { type: String, required: true },
    remarks: { type: String, required: true },
    top: { type: String, required: true },
    amount: { type: Number, required: true },
    uid: { type: String },
}, { timestamps: true })


cashbookSchema.pre('save', async function (next) {
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


const cashbookModel = model('Cashbook', cashbookSchema)
export default cashbookModel
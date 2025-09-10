import { generateUniqueIdentifier } from '../utils/utils.js'
import { Schema, model } from 'mongoose'

const notificationSchema = Schema({
    title: { type: String, required: false },
    type: { type: String, required: true, enum: ['urgent-task', 'refund-approval', 'voucher-approval', ] },
    description: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    data: { type: Object, required: false },
    uid: { type: String }
}, { timestamps: true })


notificationSchema.pre('save', async function (next) {
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


const notificationModel = model('Notification', notificationSchema)
export default notificationModel
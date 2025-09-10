import { generateUniqueIdentifier } from '../utils/utils.js'
import { Schema, model } from 'mongoose'

const projectSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: String, default: 'active', enum: ['active', 'inactive'] },
    society: { type: Schema.Types.ObjectId, ref: 'Society', required: true },
    inventories: { type: [Schema.Types.ObjectId], ref: 'Inventory', default: [] },
    isArchived: { type: Boolean, default: false },
    uid: { type: String },
}, { timestamps: true })

projectSchema.pre('save', async function (next) {
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

const projectModel = model('Project', projectSchema)
export default projectModel
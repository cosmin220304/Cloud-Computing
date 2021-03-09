const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema(
    {
        title: {
            type: String, 
            required: true,
        },
        code: {
            type: String, 
            required: true,
        }, 
        owner: {type: Schema.Types.ObjectId, ref: 'users'}
    },
    {
        timestamps: true,
    }
);

const ProjectModel = new model('projects', ProjectSchema, 'projects')

module.exports = {
    ProjectModel,
}
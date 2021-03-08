const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true,
        },
        code: {
            type: String,
            unique: true,
            required: true,
        }, 
        // owner: [
        //     {type: Schema.Types.ObjectId, ref: 'users'}
        // ]
    },
    {
        timestamps: true,
    }
);

const ProjectModel = new model('projects', ProjectSchema);;

module.exports = {
    ProjectModel,
};
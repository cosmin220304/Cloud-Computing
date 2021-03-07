const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        }, 
        projects: [
            {type: Schema.Types.ObjectId, ref: 'projects'}
        ]
    },
    {
        timestamps: true,
    }
);

const UserModel = new model('users', UserSchema, 'users');

module.exports = {
    UserModel,
};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpEnums = ["Yes", "No", "Maybe"]
const rsvpSchema = new Schema({
    status: {type: String, 
        required: [true, 'Status Name is required'],
        enum: {
            values: rsvpEnums,
            message: 'Invalid RSVP Status'
        }
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    event: {type: Schema.Types.ObjectId, ref: 'Events'}
});
module.exports = mongoose.model('RSVP', rsvpSchema);
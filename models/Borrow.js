const {Schema,model, default: mongoose} = require('mongoose');

const borrowSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    borrowedAt : {
        type: Date,
        default: Date.now,
    },
    dueDate : Date,
    returned: {
        type: Boolean,
        default: false,
    }
})

module.exports = model('Borrow',borrowSchema);
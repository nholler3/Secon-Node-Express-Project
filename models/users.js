'use strict';

const mongoose = require('mongoose'),
    {Schema} = mongoose

var contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

contactSchema.methods.getInfo = function () {
    return `Name: ${this.name} Gender: ${this.gender}`;
};

module.exports = mongoose.model( 'Contact', contactSchema, 'contacts' );
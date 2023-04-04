const mongoose = require('mongoose');

const aqiShema = mongoose.Schema({
    datetime: {
        type: Date
    },
    city: {
        type: String
    },
    result: {
        type: mongoose.Schema({
            ts: {
                type: Date,
                required: true,
            },
            aqius: {
                type: Number,
                required: true,
                min: 0,
            },
            mainus: {
                type: String,
                required: true,
            },
            aqicn: {
                type: Number,
                required: true,
                min: 0,
            },
            maincn: {
                type: String,
                required: true,
            }
        })
    }
});

const Iqair = mongoose.model('Iqair', aqiShema);

exports.Iqair = Iqair;
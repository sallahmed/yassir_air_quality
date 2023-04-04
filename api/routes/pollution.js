const express = require('express');
const Joi = require('joi');
const route = express.Router();
const axios = require('axios');

route.get('/', async (req, res) => {
    const { error } = validate(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const response = await axios.get(
            'http://api.airvisual.com/v2/nearest_city',
            {
                params: {
                    lat :req.query.lat,
                    lon: req.query.lon,
                    key: '5ba13fb4-035e-48bc-be59-f47e315ff145'
                }
            }
        );
        const body = response.data;
        res.send({
            "Result": {
                "pollution": body.data.current.pollution
            }
        });
    } catch (err) {
        if (err.response){
            if (err.response.data.data.message == "city_not_found"){
                res.status(400).send({
                    "message": "city_not_found"
                });
            }else if (err.response.data.data.message == "Too Many Requests"){
                res.status(400).send({
                    "message": "Too Many Requests"
                });
            }else{
                console.log("WARNNING: ", err.response.data);
                res.status(500).send({
                    "message": "Somthing faild on the server."
                });
            }
        }else{
            console.log("WARNNING: ", err.message);
            res.status(500).send({
                "message": "Somthing faild on the server."
            });
        }
    }
});

function validate(req){
    const schema= Joi.object({
        lat: Joi.number().min(-90).max(90).required(),
        lon: Joi.number().min(-180).max(180).required()
    });
    return schema.validate(req);
}

exports.pollution = route;
exports.validate = validate;
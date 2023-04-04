const _ = require('lodash');
const axios = require('axios');
const {Iqair} = require('../models/iqair');

module.exports =  async (req, res) =>  {
    try {
        const response = await axios.get(
            "http://127.0.0.1:3000/api/pollution",
            {
                params: {
                    "lon": "2.352222",
                    "lat": "48.856613"
                }
            }
        );
        let iqair = new Iqair({
            datetime: Date.now(),
            city: 'paris',
            result: _.pick(response.data.Result.pollution, ["ts", "aqius", "mainus", "aqicn", "maincn"])
        });
        iqair = await iqair.save();
        console.log(iqair);
    }
    catch (error) {
        if (error.response) {
            console.log("WARNNING: Error air quality cron, air quality not saved / ErrorCode: "+error.response.status);
        } else{
            console.log("WARNNING: Request Error air quality cron");
        }
    }
};
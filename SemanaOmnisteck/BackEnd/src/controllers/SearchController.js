const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');

module.exports={

    async index(request, response){
        const{ latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);   

        const devs = await Dev.find({
            techs: {
                $in:techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latidude, longitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return response.json({devs: [] });
    },

}
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');
const findeConnections = require('../websocket');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response){
        const {github_username, techs, latitude, longitude} = request.body;
        
        let dev = await Dev.findOne({ github_username });
        if(!dev){
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            }
        
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })

            const sendSocketMessageTo = findeConnections(
                {latitude, longitude}, 
                techsArray
            )
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        
        return response.json(dev);
    },
};
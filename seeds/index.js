const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        let price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62af7ff99b78b89ba1f63f56',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eveniet modi rerum dolor labore ipsaomnis distinctio officia, odit similique tempore maxime neque ratione, sapiente libero sit dignissimos. Dolore, enim.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dshx2smdy/image/upload/v1656565146/YelpCamp/cb9qbn2fudgpsxdzueym.jpg',
                    filename: 'YelpCamp/cb9qbn2fudgpsxdzueym',
                },
                {
                    url: 'https://res.cloudinary.com/dshx2smdy/image/upload/v1656565147/YelpCamp/qksfvpr8aku1bbcioklg.jpg',
                    filename: 'YelpCamp/qksfvpr8aku1bbcioklg',
                }
            ]
        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
})
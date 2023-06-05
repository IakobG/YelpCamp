const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp') //, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  .then(() => console.log('Connected!!!'));


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
             author: '647c52f9d2ea5b1ba8eb13b7',
             location: `${cities[random1000].city}, ${cities[random1000].state}`,
             title: `${sample(descriptors)} ${sample(places)}`,
             description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro unde aliquam tempore recusandae animi placeat corrupti vero, odit minima incidunt obcaecati voluptatibus voluptatum maiores sunt! Inventore aut quidem voluptate debitis?',
             price,
             geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
             },
             images: [
                {
                  url: 'https://res.cloudinary.com/dnlj1oahx/image/upload/v1685888261/YelpCamp/z962gpfjal54eoyaa6v3.jpg',
                  filename: 'YelpCamp/z962gpfjal54eoyaa6v3',
                },
                {
                  url: 'https://res.cloudinary.com/dnlj1oahx/image/upload/v1685888261/YelpCamp/d7xtbuc5margc15u6wmv.jpg',
                  filename: 'YelpCamp/d7xtbuc5margc15u6wmv',
                }
              ],
            
        })
        await camp.save();
    }
}



seedDB().then(()=>{
    mongoose.connection.close();
})
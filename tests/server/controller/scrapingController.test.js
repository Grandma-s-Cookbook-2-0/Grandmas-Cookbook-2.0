const { describe } = require('node:test')
const request = require('supertest')
const app = require("../../../server/server.js")


describe('Scraping Integration', () => {
   // correctly routes to the right scraper
   describe('no url is provided', () => {
      it('responds back a 406 with no url provided', () => {
          request(app)
         .get('/recipe/scrapeurl')
         .expect(406)
      })
      });
   describe('URL is not from epicurious or foodnetwork', ()=> {
      it('responds back a 406 from a foodnetwork url', () => {
         request(app)
         .get('recipe/scrapeurl')
         .query({url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chicken-and-rice-8133711' })
         .expect(406)
      })
      })
         // .query({url: 'http://www.simplyrecipes.com/recipes/banana_bread/'})
         // .expect(406, done)

      })
   // correctly grabs the title
   // correctly grabs the ingredient list
   // correctly grabs the directions
   // throws an error if incorrect url is passed
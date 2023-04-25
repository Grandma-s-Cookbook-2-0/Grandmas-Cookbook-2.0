const { describe, it, beforeEach, test } = require('node:test')
const request = require('supertest')
const app = require("../../../server/server.js")
const server = 'http://localhost:3000';

describe('Scraping Integration', () => {
   // correctly routes to the right scraper
   describe('no url is provided', () => {
      test('responds back a 406 with no url provided', () => {
         request(server)
         .get('/recipe/scrapeurl')
         .query({url: '/'})
         .expect(406)
      })
      });
   describe('URL is not from epicurious or foodnetwork', () => {
      test('responds back a 406 from a foodnetwork url', () => {
         request(server)
         .get('recipe/scrapeurl')
         .query({url: 'https://www.simplyrecipes.com/recipes/banana_bread/' })
         .expect(406)
      })
      })
   // describe('foodnetwork url', () => {
   //    // beforeAll(() => {
   //    //    request(app)
   //    //    .get('recipe/scrapeurl')
   //    //    .query({url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chicken-and-rice-8133711'})
   //    //    })
   //    test('should grab the title', () => {
   //       request(server)
   //       .get('recipe/scrapeurl')
   //       .query({url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chicken-and-rice-8133711'})
   //       .then((res) => {
   //          expect(res).toBe('something')
   //       })
   //    }
   // )
   // describe('epicurious url', () => {

   // })

})
   // correctly grabs the title
   // correctly grabs the ingredient list
   // correctly grabs the directions
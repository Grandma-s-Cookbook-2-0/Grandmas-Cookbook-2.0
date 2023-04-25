const request = require('supertest')
const app = require("../../../server/server.js")


describe('Scraping Integration', () => {

   // correctly routes to the right scraper
   describe('no url is provided', () => {
      test('responds back a 406 with no url provided', () => request(app)
         .get('/recipe/scrapeurl')
         .query('url="yum"')
         .expect(406));
   })

   describe('URL is not from epicurious or foodnetwork', () => {
      test('responds back a 406 from a simply recipers url', () => request(app)
         .get(`/recipe/scrapeurl`)
         .query('url="https://www.simplyrecipes.com/recipes/banana_bread/"')
         .expect(406))
      })

   describe('foodnetwork url', () => {
      const url = "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chicken-and-rice-8133711"

      // 
      // beforeAll(() => {
      //    request(app)
      //    .get('recipe/scrapeurl')
      //    .query({url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chicken-and-rice-8133711'})
      //    })

      test('should respond with a 200 status', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .expect(200))


      test('should retrieve the title', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .then((res) => {
            const response = res.body.title;
            expect(response).toBe('The Best Chicken and Rice')
            })
         )
      test('ingredients should be returned in an array', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .then((res) => {
            const response = res.body.ingredientList;
            expect(Array.isArray(response)).toBeTruthy()
            expect(response.length).toBeGreaterThan(0)
         }))

      test('directions should be returned in an array', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .then((res) => {
            const response = res.body.directions;
            expect(Array.isArray(response)).toBeTruthy()
            expect(response.length).toBeGreaterThan(0)
         }))
      })

      describe('epicurious url', () => {
         const url = "https://www.epicurious.com/recipes/food/views/pasta-al-pomodoro-365186"

         test('should respond with a 200 status', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .expect(200))

      test('should retrieve the title', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .then((res) => {
            const response = res.body.title;
            expect(response).toBe('Pasta al Pomodoro')
            })
         )
      test('ingredients should be returned in an array', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .then((res) => {
            const response = res.body.ingredientList;
            expect(Array.isArray(response)).toBeTruthy()
            expect(response.length).toBeGreaterThan(0)
         }))

      test('directions should be returned in an array', () => request(app)
         .get('/recipe/scrapeurl')
         .query(`url=${url}`)
         .then((res) => {
            const response = res.body.directions;
            expect(Array.isArray(response)).toBeTruthy()
            expect(response.length).toBeGreaterThan(0)
         }))
      })
   })
      
      
   // // describe('epicurious url', () => {

   
   // correctly grabs the title
   // correctly grabs the ingredient list
   // correctly grabs the directions

   
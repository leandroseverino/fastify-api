// Require external modules
const mongoose = require('mongoose')
const routes = require('./routes')

// Connect to DB
mongoose.connect('mongodb://admin:admin01@ds135704.mlab.com:35704/mycargarage')
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))

// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// Import Swagger Options
const swagger = require('./config/swagger')
// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)
  
// Declare a route for the start entry point
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

// Routes for the API
routes.forEach((route, index) => {
    fastify.route(route)
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
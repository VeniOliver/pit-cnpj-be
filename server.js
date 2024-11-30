/**
 * Starts the server for the CNPJ API.
 * 
 * This script imports the `app` module (which contains the application logic) and starts a server 
 * that listens on a specified port. The port is determined by the environment variable `PORT` or 
 * defaults to `3000` if the environment variable is not set.
 * 
 * When the server is successfully running, a message is logged to the console indicating the port 
 * on which the server is listening.
 * 
 * @module server
 * @requires app
 */
import app from './app.js'

const port   = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log('CNPJ API - PIT Software Engineering 2024.2 listening on port ' + port)
})

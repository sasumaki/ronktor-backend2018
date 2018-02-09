'use strict'
const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    })
  }
  module.exports.getObs = (event, context, callback) => {
    //fetch all observations from db
    dynamoDb.scan(params, (error, result) => {
      if (error) {
        console.error(error)
        callback(null, {
          statusCode: error.statusCode,
          headers: { 'Content-Type': 'text/plain' },
          body: "Couldn't fetch"
        })
        return
      }
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items)
      }
      callback(null, response)
    })
  }

  callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}

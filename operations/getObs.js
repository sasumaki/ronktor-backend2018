'use strict'
const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: process.env.TableName
}

module.exports.getObs = (event, context, callback) => {
  //fetch all observations from db
  console.log(dynamoDb)
  console.log(params)
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode,
        headers: {
          'Content-Type': 'text/plain'
        },
        body: "Couldn't fetch"
      })
      return
    }
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.Items)
    }
    callback(null, response)
  })
}

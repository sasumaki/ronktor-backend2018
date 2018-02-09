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
}

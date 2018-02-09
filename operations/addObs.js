'use strict'
const uuid = require('uuid/v1')

const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: process.env.TableName
}

module.exports.addObs = (event, context, callback) => {
  //add an observation to table
  console.log(JSON.parse(event.body))
  let request = JSON.parse(event.body)
  if (
    !event.body ||
    request.location === undefined ||
    request.temperature === undefined
  ) {
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: "Couldn't create the todo item."
    })
    return
  }
  const params = {
    TableName: process.env.TableName,
    Item: {
      id: uuid(),
      temperature: Number(request.temperature),
      location: request.location,
      date: new Date().toISOString()
    }
  }

  // write the todo to the database
  dynamoDb.put(params, error => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't create the todo item."
      })
      return
    }
    console.log(params)
    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}

import AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient()

async function updateItem(id, data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: { id, data },
    ReturnValues: 'ALL_NEW',
  }
  try {
    const updatedItem = await db.put(params).promise()
    return updatedItem
  } catch (err) {
    return err
  }
}

export default async (event) => {
  try {
    const pathId = event.pathParameters.id
    const eventData = JSON.parse(event.body)
    const returnedData = await updateItem(pathId, eventData)
    return returnedData
  } catch (err) {
    return { error: err }
  }
}

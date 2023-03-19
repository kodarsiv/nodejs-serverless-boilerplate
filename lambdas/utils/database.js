const AWS = require('aws-sdk');
const uuid = require('uuid');

let options = {}
if ( process.env.IS_OFFLINE ){
    options = {
        region: "localhost",
        endpoint: "http://localhost:8000"
    }
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async getById(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        }

        const data = await documentClient
            .get(params)
            .promise()

        if ( !data || !data.Item){
            throw Error(`There is no data for ${ID} from ${TableName}`);
        }

        return data.Item;
    },
    async getBy(key, value, TableName) {
        const params = {
          TableName,
          IndexName: `${key}-index`,
          KeyConditionExpression: `${key} = :value`,
          ExpressionAttributeValues: {
            ":value": value
          }
        }
      
        const data = await documentClient.query(params).promise()
      
        if (!data || !data.Items || data.Items.length === 0) {
          throw Error(`There is no data for ${key}: ${value} from ${TableName}`);
        }
      
        return data.Items[0];
    },
    async getAll(TableName) {
        const params = {
            TableName,
        };

        const data = await documentClient.scan(params).promise();

        if (!data || !data.Items) {
            throw Error(`There was an error fetching all data from ${TableName}`);
        }

        return data.Items;
    },
    async write(data, TableName) {
      
      data.ID = uuid.v4();
      const params = {
          TableName,
          Item: data,
      };

      const res = await documentClient.put(params).promise();

      if (!res) {
          throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
      }

      return data;
  },
    async update(ID, updateValues, TableName) {
        const updateExpression = Object.keys(updateValues)
            .map(key => `#${key} = :${key}`)
            .join(', ');

        const expressionAttributeNames = Object.keys(updateValues)
            .reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});

        const expressionAttributeValues = Object.entries(updateValues)
            .reduce((acc, [key, value]) => ({ ...acc, [`:${key}`]: value }), {});

        const params = {
            TableName,
            Key: { ID },
            UpdateExpression: `SET ${updateExpression}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        };

        const data = await documentClient.update(params).promise().catch(error => {
            console.error('Error in Dynamo.update:', error);
            throw Error(`There was an error updating ID of ${ID} in table ${TableName}`);
        });

        if (!data || !data.Attributes) {
            throw Error(`There was an error updating ID of ${ID} in table ${TableName}`);
        }

        return data.Attributes;
    },
}

module.exports = Dynamo;
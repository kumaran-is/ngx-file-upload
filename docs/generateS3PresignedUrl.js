'use strict';
//import * as AWS from 'aws-sdk';
const AWS = require('aws-sdk')
//import * as mime from 'mime-types';
/*
Lambda layer should be created for  external libraries, since `mime-types` are external libraries we need to create a zip of this node module
(lambda layer for node_modules nodejs/node12/node_modules) and create a layer by uploading it.
*/
const mime = require('mime-types')
//import { parse } from 'path';
const path = require('path')

const awsOpts = {
    region: process.env.region,
    signatureVersion: 'v4',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
};
const s3Client = new AWS.S3(awsOpts);

exports.handler = async (event) => {
     // TODO: You could get path, parameter, headers, body value from this
    const { pathParameters, queryStringParameters, headers, body } = event;
    console.log('event:'+ JSON.stringify(event));
    const bucketName = process.env.S3_BUCKET_NAME;
    const key = pathParameters.fileName;
    const signedUrlExpireSeconds = Number(process.env.EXPIRATION);
    const fileExtension = path.parse(key).ext.replace(/\./g, '');
    const contentType = mime.lookup(fileExtension);
    const bodyReq = JSON.parse(body);

    const params = {
      Bucket: bucketName,
      Key:  key,
      ContentType: contentType,
     // Body: body,
      Expires: signedUrlExpireSeconds
    };

    console.log(`Generate SignedURL from s3 sdk:${bucketName}/${key}/${contentType}`);

    const url = s3Client.getSignedUrl('putObject', params);

    console.log('presigned url: ', url);
    // TODO implement
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({ fileName: key, contentType: contentType, presignedUrl: url}),
    };
    return response;
};

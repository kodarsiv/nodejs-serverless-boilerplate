const Response = {
    _200(data = {}, message ='Successfully') {
        return {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 200,
            body: JSON.stringify({
                'flag': 'success',
                'code' : 200,
                'message' : message,
                'content': data
            })
        }
    },
    _400(data = {}, message ='Bad request') {
        return {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 400,
            body: JSON.stringify({
                'flag': 'error',
                'code' : 400,
                'message' : message,
                'content': data
            })
        }
    },
    _401(data = {}, message ='Unauthorized') {
        return {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 401,
            body: JSON.stringify({
                'flag': 'error',
                'code' : 401,
                'message' : message,
                'content': data
            })
        }
    },
    _404(data = {}, message ='Not Found') {
        return {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 404,
            body: JSON.stringify({
                'flag': 'error',
                'code' : 404,
                'message' : message,
                'content': data
            })
        }
    },
    _500(data = {}, message ='Internal Server Error') {
        return {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 500,
            body: JSON.stringify({
                'flag': 'error',
                'code' : 500,
                'message' : message,
                'content': data
            })
        }
    }
}

module.exports = Response

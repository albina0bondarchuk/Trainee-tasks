function options(response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.end()
}

module.exports = options
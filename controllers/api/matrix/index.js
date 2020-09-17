'use strict';

var MatrixService = require('../../../services/matrix/index');

function generateClouds(matrix, rows, cols, items = []) {
    var result = MatrixService.generateClouds(matrix);
    items.push(JSON.stringify({ rows: rows, columns: cols, matrix: result.matrix }));
    if (!result.cloudOverAirport) return generateClouds(result.matrix, rows, cols, items);
    return items;
}

module.exports = function (router) {

    router.post('/', function (req, res) {
        var params = req.body;
        var matrix = MatrixService.initalizeMatrix(params.lines, params.columns);
        var items = [];

        matrix = MatrixService.generateRandomPointsByType(matrix, params.airports, 'airport');
        matrix = MatrixService.generateRandomPointsByType(matrix, params.clouds, 'cloud');

        var firstMatrix = JSON.stringify({ rows: params.lines, columns: params.columns, matrix: matrix });
        var jsonItems = generateClouds(matrix, params.lines, params.columns);
        var response = jsonItems.map(function(value) {
            return JSON.parse(value);
        });
        response.unshift(JSON.parse(firstMatrix));

        res.json(response);
    });

};

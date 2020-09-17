'use strict';

var MatrixService = require('../../../services/matrix/index');

module.exports = function (router) {

  router.post('/', function (req, res) {
    var params = req.body;
    var matrix = MatrixService.initalizeMatrix(params.lines, params.columns);
    matrix = MatrixService.generateRandomPointsByType(matrix, params.airports, 'airport');
    matrix = MatrixService.generateRandomPointsByType(matrix, params.clouds, 'cloud');

    res.json(matrix);
  });

};

'use strict';

module.exports = function (router) {

  router.post('/', function (req, res) {
    var query = req.body;

    res.json(query);
  });

};

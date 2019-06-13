var express = require('express');
var router = express.Router();
var { getGraphMock } = require('../mocks/graph')
const { createGraphSvg } = require('../utils/graphHelper')

/* GET graph listing. */
router.get('/', function (req, res, next) {
  // createGraphSvg()
  const data = getGraphMock()
  if (data) {
    res.send({
      data,
      code: 0,
      message: 'success'
    });
  } else {
    res.status(502)
    res.send({
      code: 1,
      message: '502 服务器内部错误'
    })
  }
});

module.exports = router;

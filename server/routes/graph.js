var express = require('express');
var router = express.Router();
var Mock = require('mockjs')

var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'nodes|100-200': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
      }],
      'links|100-200': [{
        'id|+1': 1
    }]
})

/* GET graph listing. */
router.get('/', function(req, res, next) {
  if(data) {
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

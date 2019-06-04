const Mock = require('mockjs')

const getGraphMock = () => {
  const data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'nodes|200': [{
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 0,
          'name': () => Mock.mock('@name'),
          'label|1': [
            'Person',
            'Teacher',
            'Coder',
            'Doctor',
            'Bitch'
          ]
        }],
        'links|200': [{
          'source|0-199': 1,
          'target|0-199': 1,
          'type|1': [
            'LOVE',
            'HATE',
            'FRIEND_OF',
            'FATHER_OF',
            'MATHER_OF'
          ]
      }]
  })
  return data
} 

module.exports = {
  getGraphMock
}
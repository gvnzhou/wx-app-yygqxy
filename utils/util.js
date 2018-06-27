const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// input数据绑定
const bindValueInput = function (e) {
  this.setData({
    [e.target.dataset.name]: e.detail.value
  })
}

module.exports = {
  formatTime: formatTime,
  bindValueInput: bindValueInput
}

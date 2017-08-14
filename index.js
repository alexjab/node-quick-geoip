const ips = require('./ips')
const { ipToNum } = require('./util')

function find (ip) {
  const num = ipToNum(ip)

  let min = 0
  let max = ips.length - 1
  let n

  while (Math.abs(max - min) > 2) {
    const m = min + Math.floor((max - min)/2)
    n = ips[m]

    if (num < n[0]) {
      max = m
    } else {
      min = m
    }
  }

  return n[1]
}

module.exports = {
  find
}

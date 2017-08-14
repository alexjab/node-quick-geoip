const ips = require('./ips')
const { ipToNum } = require('./util')

function find (ip) {
  const num = ipToNum(ip)
  if (num < ips[0][0] || num > ips[ips.length-1][0]) {
    return null
  }

  let min = 0
  let max = ips.length - 1
  let n

  while ((max - min) > 1) {
    const m = min + Math.ceil((max - min)/2)
    n = ips[m]

    if (num >= n[0]) {
      min = m
    } else {
      max = m
    }
  }

  return n[1]
}

module.exports = {
  find
}

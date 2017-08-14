function ipToNum (ip) {
  const ipList = ip.replace(/\/[0-9]{2}/, '').split('.')
  return ipList[0] * Math.pow(256, 3) +
    ipList[1] * Math.pow(256, 2) +
    ipList[2] * Math.pow(256, 1) +
    ipList[3] * Math.pow(256, 0)
}

module.exports = {
  ipToNum
}

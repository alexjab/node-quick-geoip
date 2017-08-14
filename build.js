const fs = require('fs')

const { ipToNum } = require('./util')

const missingFilesError = new Error(
  `Missing files GeoLite2-Country-Locations-en.csv and/or GeoLite2-Country-Blocks-IPv4.csv
You can download them from http://dev.maxmind.com/geoip/geoip2/geolite2/

`
)

function indexCountry () {
  let countries
  try {
    countries = fs.readFileSync('./GeoLite2-Country-Locations-en.csv', 'utf8')
  } catch (e) {
    throw missingFilesError
  }

  const countryList = countries.split('\n')
    .filter((line, index) => line && index)
    .map(line => line.split(','))
  const countryByNum = {}
  for (const country of countryList) {
    const num = country[0]
    const iso = country[4]
    if (num && iso) {
      countryByNum[num] = iso.toLowerCase()
    }
  }
  return countryByNum
}

function indexIp (countryByNum) {
  let ips
  try {
    ips = fs.readFileSync('./GeoLite2-Country-Blocks-IPv4.csv', 'utf8')
  } catch(e) {
    throw missingFilesError
  }

  const ipList = ips.split('\n')
    .filter((line, index) => line && index)
    .map(line => line.split(','))
    .map(line => {
      return [
        ipToNum(line[0]),
        countryByNum[line[1]]
      ]
    })
    .sort((a, b) => a[0] - b[0])

  return ipList
}

const countryByNum = indexCountry()
const sortedIps = indexIp(countryByNum)

console.log('-> Generating file...')

const fileContent = `// DO NOT MANUALLY MODIFY THIS FILE
// TO GENERATE IT, RUN \`npm run build\`
module.exports = ${JSON.stringify(sortedIps)}`
fs.writeFileSync('./ips.js', fileContent)

console.log('-> Done.')

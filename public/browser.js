import {
  generateBatteryReport,
  getHtmlFromFile,
  scrape,
  writeDataToFile,
} from './app/scrape'
import { get } from 'axios'
const broadcastUrl =
  'https://gist.github.com/SlapBot/4b093f88d97522e22205ae9c9d0dea02/raw/'

function getBatteryReport() {
  return generateBatteryReport(
    'powercfg batteryreport output "public/battery-report.html" duration 5'
  )
    .catch((error) => console.log('error', error))
    .then((_) => getHtmlFromFile('public/battery-report.html'))
    .catch((error) => console.log(error))
    .then((html) => scrape(html))
    .catch((error) => console.log(error))
}

function getUpdates(url) {
  return get(url)
}

getBatteryReport()
  .then((data) =>
    writeDataToFile(JSON.stringify(data, null, 4), 'public/output.json')
  )
  .catch((error) => console.log(error))
  .then((_) => console.log('Done!'))

getUpdates(broadcastUrl)
  .then((response) =>
    writeDataToFile(
      JSON.stringify(response.data, null, 4),
      'public/update.json'
    )
  )
  .catch((error) => console.log(error))
  .then((_) => console.log('Done!'))

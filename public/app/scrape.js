import { exec } from 'child_process'
import { readFile, writeFile } from 'fs'
import { parseUsageInfo, parseHistoryInfo } from './parse.js'
import { parse } from 'node-html-parser'

function generateBatteryReport(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (stdout) {
        resolve(stdout)
      }
      if (stderr) {
        reject(new Error(stderr))
      }
      reject(err)
    })
  })
}

function getHtmlFromFile(path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (data) {
        resolve(data)
      }
      reject(err)
    })
  })
}

function readDataFromFile(path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (data) {
        resolve(JSON.parse(data))
      }
      reject(err)
    })
  })
}

function writeDataToFile(data, path) {
  return new Promise((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

function getHtmlRoot(html) {
  return parse(html)
}

function getTables(root) {
  // noinspection JSUnresolvedFunction
  return root.getElementsByTagName('table')
}

function cleanNewlineText(text) {
  return text
    .replace(/\r?\n|\r/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getNote(root, index) {
  switch (index) {
    // Don't want to scrape this part in case Windows changes the DOM and hence increasing stability
    case 0:
      return 'Information about your system'
    case 1:
      return 'Information about each currently installed battery'
    case 2:
      return 'Power states over the last few days'
    case 3:
      return 'Battery drains over the last few days'
    case 4:
      return 'History of system usage on AC and battery'
    case 5:
      return "Charge capacity history of the system's batteries"
    case 6:
      return 'Battery life estimates based on observed drains'
    case 7:
      return 'Current estimate of battery life based on all observed drains since OS install'
    default:
      return cleanNewlineText(root[index].previousSibling.textContent)
  }
}

function getKeyValueInfo(data, rInfo) {
  // noinspection JSUnresolvedFunction
  let colElements = rInfo.getElementsByTagName('td')
  if (colElements.length > 1 && cleanNewlineText(colElements[0].textContent)) {
    data[0].push(cleanNewlineText(colElements[0].textContent))
    data[1].push(cleanNewlineText(colElements[1].textContent))
  }
  return data
}

function getTabulatedKeys(data, rawInfo, index) {
  // noinspection JSUnresolvedFunction
  let colElements = rawInfo[index]
    .getElementsByTagName('td')
    .reduce((data, element) => {
      let formattedElement = cleanNewlineText(element.textContent)
      if (formattedElement) {
        data.push(formattedElement)
      }
      return data
    }, [])
  if (colElements.length === 0) {
    return colElements
  }
  switch (data.name) {
    case 'powerUsageInfo':
    case 'batteryUsageInfo':
      return colElements
        .splice(0, colElements.length - 1)
        .concat([
          colElements[colElements.length - 1] + ' (PERCENTAGE)',
          colElements[colElements.length - 1] + ' (VALUE)',
        ])
    case 'powerUsageHistoryInfo':
    case 'batteryLifeHistory': {
      // noinspection JSUnresolvedFunction
      let colSubElements = rawInfo[0]
        .getElementsByTagName('td')
        .reduce((data, element) => {
          let formattedElement = cleanNewlineText(element.textContent)
          if (formattedElement) {
            data.push(formattedElement)
          }
          return data
        }, [])
      if (colSubElements.length < 2) {
        return colElements
      }
      return colElements.map((colElement, index) => {
        if (index > 0 && index < 3) {
          return colElement + ' (' + colSubElements[0] + ')'
        }
        if (index > 2 && index < 5) {
          return colElement + ' (' + colSubElements[1] + ')'
        }
        return colElement
      })
    }
    default:
      return colElements
  }
}

function getTabulatedData(data, rInfo) {
  // noinspection JSUnresolvedFunction
  let colElements = rInfo.getElementsByTagName('td')
  let result = {}
  if (colElements.length > 2) {
    switch (data.name) {
      case 'powerUsageInfo':
      case 'batteryUsageInfo':
        result = parseUsageInfo(
          data.data,
          colElements.filter((colElement) => colElement.textContent),
          cleanNewlineText
        )
        break
      case 'powerUsageHistoryInfo':
      case 'batteryCapacityHistory':
      case 'batteryLifeHistory':
        result = parseHistoryInfo(
          data.data,
          colElements.filter((colElement) => colElement.textContent),
          cleanNewlineText
        )
        break
      case 'batteryLifeOverallHistory':
        result = colElements
          .map((colElement) => {
            let resultElement = cleanNewlineText(colElement.textContent)
            if (resultElement === '-') {
              return '0:00:00'
            }
            return resultElement
          })
          .filter((colElement) => colElement)
        break
      default:
        result = colElements
          .filter((colElement) => colElement)
          .map((colElement) => cleanNewlineText(colElement.textContent))
        break
    }
    data.data.push(result)
  }
  return data
}

function computeInfo(root, infoName, index, filterType) {
  let info = {
    name: infoName,
    note: '',
    keys: [],
    data: [],
  }
  // console.log(root[index])
  info.note = getNote(root, index)
  let rawInfo = root[index].getElementsByTagName('tr')
  switch (filterType) {
    case 'KEY_VALUE':
      ;[info.keys, info.data] = rawInfo.reduce(getKeyValueInfo, [[], []])
      break
    case 'TABULATED_SIMPLE':
      info.keys = getTabulatedKeys({ name: infoName }, rawInfo, 0)
      info.data = rawInfo
        .slice(1)
        .reduce(getTabulatedData, { name: infoName, data: [] }).data
      break
    case 'TABULATED_COMPLEX':
      info.keys = getTabulatedKeys({ name: infoName }, rawInfo, 1)
      info.data = rawInfo
        .slice(2)
        .reduce(getTabulatedData, { name: infoName, data: [] }).data
      break
    case 'TABULATED_OVERALL':
      // hardcoded keys to ensure no dependency over each table scrape to ensure concurrency.
      info.keys = [
        'PERIOD',
        'ACTIVE (AT FULL CHARGE)',
        'CONNECTED STANDBY (AT FULL CHARGE)',
        'ACTIVE (AT DESIGN CAPACITY)',
        'CONNECTED STANDBY (AT DESIGN CAPACITY)',
      ]
      info.data = rawInfo.reduce(getTabulatedData, {
        name: infoName,
        data: [],
      }).data
      break
    default:
      return info
  }
  if (index === 1) {
    //Attempt to compute Battery health percentage
    computeBatteryHealth(info)
  }
  return info
}

function computeBatteryHealth(info) {
  info.keys.push('BATTERY HEALTH')
  let design = info.data[4].split(' mWh')[0].replace(',', '')
  let full = info.data[5].split(' mWh')[0].replace(',', '')
  let health = full / design
  health = Math.round(health * 10 * 10) / 1
  info.data.push(health + ' %')
}

function getInfo(root, infoName, index, filterType) {
  return new Promise((resolve, reject) => {
    // noinspection JSUnresolvedFunction
    try {
      let info = computeInfo(root, infoName, index, filterType)
      resolve(info)
    } catch (e) {
      resolve({
        name: infoName,
        note: getNote(root, index),
        keys: [],
        data: [],
      })
    }
  })
}

async function scrape(html) {
  let root = getHtmlRoot(html)
  let tables = getTables(root)
  let values = [
    { tables: tables, name: 'systemInfo', index: 0, filterType: 'KEY_VALUE' },
    { tables: tables, name: 'batteryInfo', index: 1, filterType: 'KEY_VALUE' },
    {
      tables: tables,
      name: 'powerUsageInfo',
      index: 2,
      filterType: 'TABULATED_SIMPLE',
    },
    {
      tables: tables,
      name: 'batteryUsageInfo',
      index: 3,
      filterType: 'TABULATED_SIMPLE',
    },
    {
      tables: tables,
      name: 'powerUsageHistoryInfo',
      index: 4,
      filterType: 'TABULATED_COMPLEX',
    },
    {
      tables: tables,
      name: 'batteryCapacityHistory',
      index: 5,
      filterType: 'TABULATED_SIMPLE',
    },
    {
      tables: tables,
      name: 'batteryLifeHistory',
      index: 6,
      filterType: 'TABULATED_COMPLEX',
    },
    {
      tables: tables,
      name: 'batteryLifeOverallHistory',
      index: 7,
      filterType: 'TABULATED_OVERALL',
    },
  ]
  return Promise.all(
    values.map((info) =>
      getInfo(info.tables, info.name, info.index, info.filterType)
    )
  )
}

export {
  generateBatteryReport,
  getHtmlFromFile,
  scrape,
  readDataFromFile,
  writeDataToFile,
}

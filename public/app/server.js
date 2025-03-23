import { BrowserWindow, dialog, shell } from 'electron';
import { join } from 'path';
import isDev from 'electron-is-dev';
import { generateBatteryReport, getHtmlFromFile, scrape, writeDataToFile } from './scrape.js';
import  get  from 'axios';
import { log as _log } from 'electron-log';


function getBatteryReport() {
    return generateBatteryReport(
        'powercfg batteryreport output "battery-report.html" duration 5'
    )
        .catch(error => log('error', error))
        .then(_ => getHtmlFromFile('battery-report.html'))
        .catch(error => log(error))
        .then(html => scrape(html))
        .catch(error => log(error))
}

let batteryReport = getBatteryReport()

function sendBatteryReport(event, _) {
    batteryReport.then(data => {
        event.reply('battery-report', data)
    }).catch(error => log('error', error))
}

function showOriginalReport() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadURL(
        isDev ? `file://${join(__dirname, '../../battery-report.html')}`
            : `file://${join(__dirname, '../../../../battery-report.html')}`
    ).catch(error => log('error', error))
}

function showAuthorPage() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
    })
    win.maximize()
    win.show()
    win.loadURL(`https://slapbot.me`).catch(error => log('error', error))
}

function exportJSONData() {
    let options = {
        title: "Export Data: JSON format",
        defaultPath : __dirname + '/powir-data.json',
        buttonLabel : "Save JSON",
        filters :[
            {name: 'JSON', extensions: ['json']},
            {name: 'All Files', extensions: ['*']}
        ]
    }
    dialog.showSaveDialog(null, options).then(result => {
        batteryReport.then(data => writeDataToFile(JSON.stringify(data, null, 4), result.filePath))
            .catch(error => log('error', error))
            .then(_ => log('JSON saved!'))
            .catch(error => log('error', error))
    }).catch(error => log('error', error))
}

function exportPDFReport() {
    function pdfSettings() {
        return {
            landscape: false,
            marginsType: 0,
            printBackground: false,
            printSelectionOnly: false,
            pageSize: 'A4',
            scaleFactor: 100
        };
    }

    let currentWindow = BrowserWindow.getAllWindows().filter(window => window.isVisible())[0]
    let options = {
        title: "Export Report: PDF format",
        defaultPath : __dirname + '/powir-report.pdf',
        buttonLabel : "Save PDF",
        filters :[
            {name: 'PDF', extensions: ['pdf']},
            {name: 'All Files', extensions: ['*']}
        ]
    }
    currentWindow.webContents.printToPDF(pdfSettings()).then(data => {
        dialog.showSaveDialog(null, options).then(result => {
            writeDataToFile(data, result.filePath).then(_ => log('PDF saved!'))
                .catch(error => log('error', error))
        }).catch(err => log(err))
    }).catch(err => log(err))
}

function openLink(url) {
    return shell.openExternal(url)
}

function makeGetRequest(url) {
    return get(url)
}

function getUpdates(event, data) {
    makeGetRequest(data.url).then(response => {
        event.reply('receive-updates', response.data)
    }).catch(error => log('error', error))
}

export default function log(type, message) {
    console.log(type, message)
    _log(message)
}

export {
    sendBatteryReport,
    showOriginalReport,
    exportJSONData,
    exportPDFReport,
    openLink,
    showAuthorPage,
    getUpdates,
    log
}

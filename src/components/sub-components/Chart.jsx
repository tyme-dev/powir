import { Bar, Line, Pie } from 'react-chartjs-2'
import React from 'react'
import Charts from 'chart.js/auto' //Import to auto shake
import { createData } from './ChartData'

function Chart(props) {
  function renderChart(info, type, metaData) {
    try {
      return getChart(info, type, metaData)
    } catch (e) {
      console.log(e)
    }
  }
  function getChart(info, type, metaData) {
    let data = createData(info, type, metaData)
    const pieOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: props.darkMode ? 'white' : 'black',
          },
        },
      },
    }
    const options = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: props.darkMode ? 'white' : 'black',
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: metaData.xLabel,
            color: props.darkMode ? 'white' : 'black',
          },
          ticks: {
            color: props.darkMode ? 'white' : 'black',
          },
          grid: {
            color: !props.darkMode
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
          },
        },
        y: {
          title: {
            display: true,
            text: metaData.yLabel,
            color: props.darkMode ? 'white' : 'black',
          },
          ticks: {
            color: props.darkMode ? 'white' : 'black',
          },
          grid: {
            color: !props.darkMode
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    }
    switch (type) {
      case 'batteryCapacityHistory':
      case 'batteryLifeHistory':
        return <Line data={data} options={options} />
      case 'powerUsageInfo':
        if (metaData.type === 'cumulativePie') {
          return <Pie data={data} options={pieOptions} />
        } else if (metaData.type === 'cumulativeActiveSuspended') {
          return <Pie data={data} options={pieOptions} />
        } else if (metaData.type === 'dailyBar') {
          return <Bar data={data} options={options} />
        } else if (metaData.type === 'dailyLine') {
          return <Line data={data} options={options} />
        }
        return <Pie data={data} />
      default:
        return <Line data={data} options={options} />
    }
  }

  return (
    <div>
      <div className='content-center'>
        <div>
          <h3>{props.heading}</h3>
          <span className='text-xs content-center'>{props.info.note}</span>
        </div>
      </div>
      {renderChart(props.info, props.info.name, props.metaData)}
    </div>
  )
}

export default Chart

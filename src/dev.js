import svgCharts from '@/svgCharts.js'
window.svgCharts = svgCharts

const dev = {}

dev.init = () => {
  const options = {
    width: 400,
    height: 300,
    margin: 1
  }
  const data = [{
    y: [1, 2, 3, 2, 0, 5, 4, 3, 4, 2, 0, 1],
    labels: ['Start', '', '', '', '', '', '', '', '', '', '', 'End'],
    color: '#74D7BF'
  }, {
    y: [2, 5, 1, 0, 2, 2, 3, 2, 1, 0, 2, 3],
    labels: ['Start', '', '', '', '', '', '', '', '', '', '', 'End'],
    color: '#CA3837'
  }]
  const guideLines = [1, 2, 3, 4, 5, 6]

  // Bar
  const barContainer = dev.createWrapper({
    height: options.height,
    width: options.width
  })

  barContainer.innerHTML = svgCharts.bar({
    data: data[0],
    options,
    guideLines
  })

  // Line
  const lineContainer = dev.createWrapper({
    height: options.height,
    width: options.width
  })

  lineContainer.innerHTML = svgCharts.line({
    data, options, guideLines
  })

  const liveLineContainer = dev.createWrapper({
    height: options.height,
    width: options.width
  })

  const mouseData = [{
    y: [],
    color: '#74D7BF'
  }, {
    y: [],
    color: '#F5A623'
  }]

  window.addEventListener('mousemove', ev => {
    mouseData[0].y.push(ev.clientX)
    mouseData[1].y.push(ev.clientY)

    liveLineContainer.innerHTML = svgCharts.line({
      data: mouseData, options
    })
  })
}

dev.createWrapper = ({ height, width }) => {
  const container = document.createElement('div')
  container.style.height = `${height}px`
  container.style.width = `${width}px`
  container.style.border = '1px solid #eeeeee'
  container.style.boxSizing = 'content-box'
  document.body.appendChild(container)

  return container
}

export default dev

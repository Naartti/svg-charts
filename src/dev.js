import svgCharts from '@/svgCharts.js'
window.svgCharts = svgCharts

const dev = {}

dev.init = () => {
  const options = {
    width: 400,
    height: 300,
    margin: 1
  }
  const data = {
    y: [1, 2, 3, 2, 0, 5, 4, 3, 4, 2, 0, 1],
    labels: ['Start', '', '', '', '', '', '', '', '', '', '', 'End'],
    color: '#74D7BF'
  }
  const guideLines = [1, 2, 3, 4, 5, 6]

  // Bar
  const barContainer = dev.createWrapper({
    height: options.height,
    width: options.width
  })

  barContainer.innerHTML = svgCharts.bar({
    data,
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

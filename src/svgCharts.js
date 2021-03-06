import svg from '@/svg.js'
const svgCharts = {
  defaultOptions: {
    height: 100,
    width: 100
  },
  settings: {
    axisHeight: 30
  }
}

svgCharts.bar = function ({ data, options, guideLines = [] }) {
  let content = ''
  const y = data.y
  const labels = data.labels
  const maxValue = Math.max(...y, ...guideLines)
  const minValue = Math.min(...y, ...guideLines)
  let fill = []
  const width = options.width / y.length - options.margin

  const axisHeight = this.settings.axisHeight
  const canvasHeight = options.height - axisHeight

  y.forEach((value, index) => {
    if (typeof data.color === 'string') {
      fill.push(data.color)
    } else if (data.color[index]) {
      fill.push(data.color[index])
    } else {
      fill.push(fill[0])
    }

    const x = (width + options.margin) * index + options.margin / 2
    const height = value * canvasHeight / maxValue
    const y = canvasHeight - height

    content += svg.rect({ height, width, x, y, fill: fill[index] }) +
      svg.text(labels[index], { x, y: y + height, fill: '#cacaca' })
  })

  content += this.guideLines(guideLines, {
    height: canvasHeight,
    width: options.width,
    maxValue,
    minValue
  })

  content += this.xAxis({ data, options }, { axisHeight })

  return svg.plot(content, options)
}

svgCharts.line = function ({
  data = [],
  options = {
    height: svgCharts.defaultOptions.height,
    width: svgCharts.defaultOptions.width
  },
  guideLines = []
}) {
  let content = ''

  let maxYValue = Math.max(...guideLines) || 0
  let minYValue = Math.min(...guideLines) || 0

  if (!data) {
    return ''
  }

  data.forEach(d => {
    let localMax = Math.max(...d.y)
    let localMin = Math.min(...d.y)

    if (localMax > maxYValue) {
      maxYValue = localMax
    }
    if (localMin < minYValue) {
      minYValue = localMin
    }
  })

  const axisHeight = this.settings.axisHeight
  const canvasHeight = options.height - axisHeight

  content += this.guideLines(guideLines, {
    height: canvasHeight,
    width: options.width,
    maxValue: maxYValue,
    minValue: minYValue
  })

  data.forEach(d => {
    content += svgCharts.polyline({ data: d, options, guideLines })
  })

  content += this.xAxis({ data, options }, { axisHeight })

  return svg.plot(content, options)
}

svgCharts.polyline = function ({ data, options, guideLines = [] }) {
  let content = ''

  if (!data || data.y.length < 2) {
    return ''
  }

  const y = data.y
  const x = data.x || data.y.map((_value, index) => index + 1)

  const maxYValue = Math.max(...y, ...guideLines)
  const minYValue = Math.min(...y, ...guideLines)
  const maxXValue = Math.max(...x)
  const minXValue = Math.min(...x)

  const axisHeight = this.settings.axisHeight
  const canvasHeight = options.height - axisHeight
  const canvasWidth = options.width

  const points = y.map((yValue, index) => {
    const xPos = (x[index] - minXValue) * canvasWidth / (maxXValue - minXValue)
    const yPos = canvasHeight - (yValue - minYValue) * canvasHeight / (maxYValue - minYValue)

    return [xPos, yPos]
  })

  content += svg.polyline({ points, stroke: data.color })

  return content
}

svgCharts.xAxis = function ({ data, options }, { axisHeight }) {
  const fill = '#013A63'
  const x = 0
  const y = options.height - axisHeight
  const height = 2
  const width = options.width

  return svg.rect({ x, y, width, height, fill })
}

svgCharts.guideLines = function (guideLines, { height, width, maxValue, minValue }) {
  let content = ''

  guideLines.forEach(value => {
    const x = 0
    const y = height - value * height / maxValue

    content += svg.dashLine({ x, y, width }) +
      svg.text(value, { x, y, fill: '#cacaca' })
  })

  return content
}

export default svgCharts

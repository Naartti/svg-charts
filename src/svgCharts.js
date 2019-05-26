import svg from '@/svg.js'
const svgCharts = {
  settings: {
    axisHeight: 30
  }
}

svgCharts.bar = function ({ data, options, guideLines = [] }) {
  let content = ''
  const maxValue = Math.max(...data.y, ...guideLines)
  const minValue = Math.min(...data.y, ...guideLines)
  const fill = data.color
  const width = options.width / data.y.length - options.margin

  const axisHeight = this.settings.axisHeight
  const canvasHeight = options.height - axisHeight

  data.y.forEach((value, index) => {
    const x = (width + options.margin) * index + options.margin / 2
    const height = value * canvasHeight / maxValue
    const y = canvasHeight - height

    content += svg.rect({ height, width, x, y, fill }) +
      svg.text(data.labels[index], { x, y: y + height, fill: '#cacaca' })
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

svgCharts.line = function ({ data, options, guideLines = [] }) {
  let content = ''

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
    const yPos = canvasHeight - yValue * canvasHeight / maxYValue
    return [xPos, yPos]
  })

  content += svg.polyline({ points, stroke: data.color })
  content += this.guideLines(guideLines, {
    height: canvasHeight,
    width: options.width,
    maxValue: maxYValue,
    minValue: minYValue
  })
  content += this.xAxis({ data, options }, { axisHeight })

  return svg.plot(content, options)
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

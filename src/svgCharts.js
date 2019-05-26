import svg from '@/svg.js'
const svgCharts = {}

svgCharts.bar = function ({ data, options, guideLines = [] }) {
  let content = ''
  const maxValue = Math.max(...data.y, ...guideLines)
  const minValue = Math.min(...data.y, ...guideLines)
  const fill = data.color
  const width = options.width / data.y.length - options.margin

  const axisHeight = 30
  const canvasHeight = options.height - axisHeight

  data.y.forEach((value, index) => {
    const x = (width + options.margin) * index + options.margin / 2
    const height = value * canvasHeight / maxValue
    const y = canvasHeight - height

    content += svg.rect({ height, width, x, y, fill })
  })

  content += svgCharts.guideLines(guideLines, {
    height: canvasHeight,
    width: options.width,
    maxValue,
    minValue
  })

  content += svgCharts.xAxis({ data, options }, { axisHeight })

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
      svg.text(value, {x, y})
  })

  return content
}

export default svgCharts

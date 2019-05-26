const svg = {
  options: {
    strokeWidth: 1,
    fill: '#222222',
    stroke: '#222222',
    fontFamily: 'PTSans-Regular, PT Sans',
    fontWeight: 'normal',
    fontSize: 12
  }
}

svg.plot = (content, { height = 0, width = 0 }) => {
  return `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${content}</svg>`
}

svg.rect = ({
  height = 0,
  width = 0,
  x = 0,
  y = 0,
  fill = svg.options.fill
}) => {
  return `<rect fill="${fill}" x="${x}" y="${y}" width="${width}" height="${height}"></rect>`
}

svg.polyline = ({
  points = [],
  strokeWidth = svg.options.strokeWidth,
  stroke = svg.options.stroke
}) => {
  const p = points.map(v => v.join(',')).join(' ')
  return `<polyline stroke-width="${strokeWidth}" stroke="${stroke}" fill="none" points="${p}"></polyline>`
}

svg.dashLine = ({
  x = 0,
  y = 0,
  height = 0,
  width = 0
}) => {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y
  const stroke = '#cacaca'

  return `<path d="M${x1},${y1} L${x2},${y2}" stroke-width="1" fill="none" fill-rule="evenodd" stroke-dasharray="2,5" stroke-linecap="square" stroke="${stroke}"></path>`
}

svg.text = (textContent = '', {
  x = 0,
  y = 0,
  fontFamily = svg.options.fontFamily,
  fontWeight = svg.options.fontWeight,
  fontSize = svg.options.fontSize,
  fill = svg.options.fill
}) => {
  return `<text fill="${fill}" font-family="${fontFamily}" font-size="${fontSize}px" font-weight="${fontWeight}" x="${x}" y="${y + fontSize}">${textContent}</text>`
}

export default svg

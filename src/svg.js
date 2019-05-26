const svg = {}

svg.plot = (content, { height, width }) => {
  return `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${content}</svg>`
}

svg.rect = ({ height, width, x, y, fill }) => {
  return `<rect fill="${fill}" x="${x}" y="${y}" width="${width}" height="${height}"></rect>`
}

svg.dashLine = ({ x, y, height, width }) => {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y
  const stroke = '#cacaca'

  return `<path d="M${x1},${y1} L${x2},${y2}" stroke-width="1" fill="none" fill-rule="evenodd" stroke-dasharray="2,5" stroke-linecap="square" stroke="${stroke}"></path>`
}

svg.text = (textContent, { x, y }) => {
  const fontFamily = 'PTSans-Regular, PT Sans'
  const fontWeight = 'normal'
  const fontSize = 12
  const fill = '#cacaca'

  return `<text fill="${fill}" font-family="${fontFamily}" font-size="${fontSize}px" font-weight="${fontWeight}" x="${x}" y="${y + fontSize}">${textContent}</text>`
}

export default svg

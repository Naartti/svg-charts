import 'src/util/polyfill.js'
import svgCharts from 'src/svgCharts.js'

// Do dev-testing to your module here, just remeber to remove/comment it when builing for production
window.svgCharts = svgCharts

window.addEventListener('load', () => {
  const options = {
    width: 400,
    height: 300,
    margin: 5
  }
  const data = {
    y: [1, 2, 3, 2, 0, 5, 4, 3, 4, 2, 0, 1],
    color: '#74D7BF'
  }
  const guideLines = [1, 2, 3, 4, 5, 6]

  const container = document.createElement('div')
  container.style.height = `${options.height}px`
  container.style.width = `${options.width}px`
  container.style.border = '1px solid #eeeeee'
  container.style.boxSizing = 'content-box'
  document.body.appendChild(container)

  const svgCode = svgCharts.bar({
    data,
    options,
    guideLines
  })
  container.innerHTML = svgCode
})

// Library export
export default svgCharts

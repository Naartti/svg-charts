import 'src/util/polyfill.js'
import svgCharts from 'src/svgCharts.js'

// Do dev-testing to your module here, just remeber to remove/comment it when builing for production
import dev from 'src/dev.js'
window.addEventListener('load', dev.init)

// Library export
export default svgCharts

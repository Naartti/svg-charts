import svgCharts from '@/svgCharts.js'

test('Module exists', () => {
  expect(svgCharts).toBeTruthy()
})

describe('Line', () => {
  test('Missing content should have no undefines', () => {
    expect(svgCharts.line({})).not.toContain('undefined')
  })

  test('Data with default options', () => {
    expect(svgCharts.line({
      data: [{
        y: [1, 2]
      }]
    })).not.toContain('undefined')
  })

  test('Scale points', () => {
    expect(svgCharts.line({
      data: [{
        y: [1, 3, 2]
      }],
      options: {
        height: 100,
        width: 100
      }
    })).toContain('points="0,70 50,0 100,35"')
  })
})

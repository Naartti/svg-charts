import svg from 'src/svg.js'

test('svg exists', () => {
  expect(svg).toBeTruthy()
})

describe('text', () => {
  test('Default styles should not result in any undefines', () => {
    expect(svg.text('', {})).not.toContain('undefined')
  })

  test('Change defaults', () => {
    expect(svg.text('example', {
      x: 1,
      y: 1,
      fontFamily: 'Comic Sans',
      fontWeight: 'bold',
      fontSize: 10,
      fill: '#ffffff'
    })).toBe('<text fill="#ffffff" font-family="Comic Sans" font-size="10px" font-weight="bold" x="1" y="11">example</text>')
  })
})

(function () {
  const triangleDirs = [
    ['top', 'Top Right'],
    ['right', 'Bottom Right'],
    ['bottom', 'Bottom Left'],
    ['left', 'Top Left']
  ]

  const block = (title, content) =>
    `<div class="block">
      <h5>${title}</h5>
      ${content}
    </div>`

  const getField = selector => {
    const $owner = $(selector)
    let $field = $owner.find('>.field-body')
    if ($field.size()) return $field
    $field = $('<div class="field-body"></div>')
    $field.appendTo($owner)
    return $field
  }

  function setupTriangleBlock ($, {scssVars}) {
    const $field = getField('.corner-triangle-field')
    const { triangleSelectorPrefix } = scssVars

    let html = ''

    html += block(
      'Usage',
      triangleDirs.map(([dir]) => {
        return `<div class="showcase">
          <div class="showcase-icon ${triangleSelectorPrefix}-${dir}"></div>
          ${dir}
        </div>`
      }).join('')
    )

    html += block(
      'Demo',
      triangleDirs.map(([dir, title]) => {
        return `<div class="demo demo-${dir}">
          <div class="demo-icon ${triangleSelectorPrefix}-${dir}"></div>
          ${title}
        </div>`
      }).join('')
    )

    $field.append(html)
  }

  function setupRotateTriangleBlock ($, {scssVars}) {
    const $field = getField('.rotate-triangle-field')
    const { rotateTriangleSelectorPrefix } = scssVars

    let html = ''
    html += block(
      'Usage',
      `<div class="showcase">
        <div class="showcase-icon ${rotateTriangleSelectorPrefix}-top"></div>
      </div>`
    )

    $field.append(html)
  }

  function main($, scssVars) {
    const args = [
      $,
      {
        scssVars
      }
    ]

    setupTriangleBlock(...args)
    setupRotateTriangleBlock(...args)
  }

  $(function () {
    $.get('../vars.json').done(v => {
      main($, v)
    })
  })
})()

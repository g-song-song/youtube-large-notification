var DEBUG = false

function remove_px(str) {
  return Number(str.slice(0, str.length - 2))
}

function redraw_panel() {
  var html = document.documentElement
  var height_html = html.clientHeight
  if (DEBUG) console.log('Document height:', height_html)

  var id_plate = 'yt-masthead-notifications-clickcard'
  var elem_plate = document.getElementById(id_plate)
  var style_plate = window.getComputedStyle(elem_plate)
  var maxheight_panel_orig = remove_px(style_plate.getPropertyValue('max-height'))
  if (DEBUG) console.log('max-height of plate:', maxheight_panel_orig)

  /*
   * ID of panle is yt-uix-clickcard-cardXXX, where XXX varies
   * But it is also parent of parent of parent of elem_plate
   * FIXME: not working well
   */
  // var elem_panel = elem_plate.parentElement.parentElement.parentElement
  // var style_panel = window.getComputedStyle(elem_panel)
  // var top_panel = style_panel.getPropertyValue('top')
  var top_panel = 50
  if (DEBUG) console.log('Top position of panel:', top_panel)
  if (DEBUG) console.warn('The value of top position of panel is currently hard-coded')
  var bottom_panel = top_panel

  /*
   * Since we are using dh, we don't need it
   */
  // var elem_title = document.getElementById('yt-masthead-notifications-header')
  // var style_title = window.getComputedStyle(elem_title)
  // var padtop_title = remove_px(style_title.getPropertyValue('padding-top'))
  // var height_title = remove_px(style_title.getPropertyValue('height'))
  // var padbottom_title = remove_px(style_title.getPropertyValue('padding-bottom'))

  var id_content = 'yt-masthead-notifications-content'
  var elem_content = document.getElementById(id_content)
  var style_content = window.getComputedStyle(elem_content)
  var height_content_orig = remove_px(style_content.getPropertyValue('height'))
  if (DEBUG) console.log('height of content area:', height_content_orig)

  var maxheight_panel_new = height_html - top_panel - bottom_panel
  if (maxheight_panel_new > maxheight_panel_default) {
    if (DEBUG) console.log('max-height will of plate will be adjusted to:', maxheight_panel_new)
    elem_plate.setAttribute('style', 'max-height:' + maxheight_panel_new + 'px;')

    var dh = maxheight_panel_new - maxheight_panel_orig

    var height_content_new = height_content_orig + dh
    if (DEBUG) console.log('height of content area will be adjusted to:', height_content_new)
    elem_content.setAttribute('style', 'height:' + height_content_new + 'px;')
  }
}

if (debug) console.log('YouTube large notification test')

var id_plate = 'yt-masthead-notifications-clickcard'
var elem_plate = document.getElementById(id_plate)
var style_plate = window.getComputedStyle(elem_plate)
var maxheight_panel_default = remove_px(style_plate.getPropertyValue('max-height'))
if (DEBUG) console.log('max-height of plate:', maxheight_panel_default)

redraw_panel()
window.addEventListener('load', redraw_panel)
window.addEventListener('resize', redraw_panel)

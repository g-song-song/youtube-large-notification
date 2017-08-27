var DEBUG = false

/*
 * New design
 */
var tag_container = 'ytd-popup-container'
// tag_plate does not exist initially
var tag_plate = 'ytd-multi-page-menu-renderer'
/*
 * Old design
 */
var id_plate = 'yt-masthead-notifications-clickcard'
var id_content = 'yt-masthead-notifications-content'

var maxheight_panel_default

var new_design

function remove_px(str) {
  return Number(str.slice(0, str.length - 2))
}

function redraw_panel() {
  var html = document.documentElement
  var height_html = html.clientHeight
  if (DEBUG) console.log('Document height:', height_html)

  if (new_design) {
  } else {
    var elem_plate = document.getElementById(id_plate)
    var style_plate = window.getComputedStyle(elem_plate)
    var maxheight_panel_orig = remove_px(style_plate.getPropertyValue('max-height'))
    if (DEBUG) console.log('max-height of plate:', maxheight_panel_orig)

    /*
     * ID of panle is yt-uix-clickcard-cardXXX, where XXX varies
     * But it is also parent of parent of parent of elem_plate
     */
    var elem_panel = elem_plate.parentElement.parentElement.parentElement
    var top_panel = elem_panel.getBoundingClientRect().top
    if (DEBUG) console.log('Top position of panel:', top_panel)
    var bottom_panel = top_panel

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
}

function maxheight_new_finder() {
}

function init_extension() {
  if (DEBUG) console.log('YouTube large notification test')

  var elem_plate = document.getElementById(id_plate)
  new_design = !elem_plate

  if (new_design) {
    /*
     * TODO: Monitor change of plate_container
     */
    var elem_container = document.getElementsByTagName(tag_container)[0]
    elem_container.addEventListener('DOMSubtreeModified', maxheight_new_finder)
  } else {
    var style_plate = window.getComputedStyle(elem_plate)
    maxheight_panel_default = remove_px(style_plate.getPropertyValue('max-height'))
  }
  if (DEBUG) console.log('max-height of plate:', maxheight_panel_default)

  redraw_panel()
  window.addEventListener('resize', redraw_panel)
}

init_extension()

console.log('YouTube large notification test')

var html = document.documentElement
var height_html = html.clientHeight
console.log('Document height:', height_html)

var elem_plate = document.getElementById('yt-masthead-notifications-clickcard')
var style_plate = window.getComputedStyle(elem_plate)
var maxheight_panel_orig = style_plate.getPropertyValue('max-height')
console.log("max-height of plate:", maxheight_panel_orig)

/*
 * ID of panle is yt-uix-clickcard-cardXXX, where XXX varies
 * But it is also parent of parent of parent of elem_plate
 */
// var elem_panel = elem_plate.parentElement.parentElement.parentElement
// var style_panel = window.getComputedStyle(elem_panel)
// var top_panel = style_panel.getPropertyValue('top')
var top_panel = 50
console.log('Top position of panel:', top_panel)
console.warn('The value of top position of panel is currently hard-coded')

// var elem_title = document.getElementById('yt-masthead-notifications-header')
// var style_title = window.getComputedStyle(elem_title)
// var padtop_title = style_title.getPropertyValue('padding-top')
// var height_title = style_title.getPropertyValue('height')
// var padbottom_title = style_title.getPropertyValue('padding-bottom')

var elem_content = document.getElementById('yt-masthead-notifications-content')
var style_content = window.getComputedStyle(elem_content)
var height_content_orig = style_content.getPropertyValue('height')
console.log('height of content area:', height_content_orig)

var maxheight_panel_new = height_html - top_panel

var dh = maxheight_panel_new - maxheight_panel_orig
var height_content_new = height_content_orig + dh
elem_plate.style['maxHeight'] = maxheight_panel_new
elem_content.style['height'] = height_content_new

// Debug only: plain script, not bundled, so it runs even if the app's JS files fail. The mobile player has no devtools. Remove once the blank page is solved.
(function () {
  function show(msg) {
    var pre = document.createElement('pre')
    pre.style.cssText = 'white-space:pre-wrap;color:#b00;background:#fff;padding:12px;font-size:12px;margin:0'
    pre.textContent = msg
    if (document.body) document.body.insertBefore(pre, document.body.firstChild)
    else document.addEventListener('DOMContentLoaded', function () { document.body.insertBefore(pre, document.body.firstChild) })
  }
  // capture phase also catches <script>/<link> files that fail to load
  window.addEventListener('error', function (e) {
    var t = e.target
    if (t && t !== window) show('Failed to load: ' + (t.src || t.href))
    else show('Error: ' + e.message + '\n' + e.filename + ':' + e.lineno + ':' + e.colno + '\n' + ((e.error && e.error.stack) || ''))
  }, true)
  window.addEventListener('unhandledrejection', function (e) { show('Unhandled promise: ' + ((e.reason && e.reason.stack) || e.reason)) })
  show('JS started. page: ' + location.href + '\n' + navigator.userAgent)
  setTimeout(function () {
    var root = document.getElementById('root')
    var s = [].map.call(document.querySelectorAll('script[src],link[href]'), function (x) { return x.src || x.href }).join('\n')
    show('After 5s, #root children: ' + (root ? root.childElementCount : 'none') + '\nfiles:\n' + s)
  }, 5000)
})()

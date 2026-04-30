(function () {
  var STORAGE_KEY = 'claudian-theme'
  var root = document.documentElement

  function getPreferred() {
    var saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme)
    var btn = document.getElementById('theme-toggle')
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? '切换白天' : '切换黑夜')
  }

  function toggle() {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    apply(next)
  }

  // Apply immediately to prevent flash
  apply(getPreferred())

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle')
    if (btn) btn.addEventListener('click', toggle)
  })
})()

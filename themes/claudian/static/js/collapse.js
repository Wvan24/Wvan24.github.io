// Collapsible headings
(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  function init() {
    const body = document.querySelector('.article-body')
    if (!body) return
    foldHeadings(body)
  }

  function foldHeadings(body) {
    const headings = body.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach(function (h) {
      const level = parseInt(h.tagName[1])
      const group = document.createElement('div')
      group.className = 'fold-group'
      let next = h.nextElementSibling
      while (next) {
        const nextLevel = parseInt(next.tagName[1])
        if (nextLevel && nextLevel <= level) break
        const sibling = next.nextElementSibling
        group.appendChild(next)
        next = sibling
      }
      if (group.children.length > 0) {
        h.parentNode.insertBefore(group, h.nextElementSibling)
        h.classList.add('fold-heading')
        h.setAttribute('aria-expanded', 'true')
        h.addEventListener('click', function () {
          const isHidden = group.classList.contains('fold-hidden')
          if (isHidden) {
            // expand: measure full height first
            group.classList.remove('fold-hidden')
            var fullHeight = group.scrollHeight
            group.style.maxHeight = '0px'
            group.offsetHeight // force reflow
            group.style.maxHeight = fullHeight + 'px'
            setTimeout(function () {
              group.style.maxHeight = ''
            }, 420)
          } else {
            // collapse
            group.style.maxHeight = group.scrollHeight + 'px'
            group.offsetHeight // force reflow
            group.classList.add('fold-hidden')
          }
          h.setAttribute('aria-expanded', String(isHidden))
        })
      }
    })
  }
})()

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
          const expanded = group.classList.toggle('fold-hidden')
          h.setAttribute('aria-expanded', String(!expanded))
        })
      }
    })
  }
})()

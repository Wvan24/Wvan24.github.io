// Collapsible headings and lists
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
    foldLists(body)
  }

  // ── Headings ──────────────────────────────────────────────────
  function foldHeadings(body) {
    const headings = body.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach(function (h) {
      // wrap content between this heading and next same-or-higher level
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

  // ── Lists ─────────────────────────────────────────────────────
  function foldLists(body) {
    body.querySelectorAll('li').forEach(function (li) {
      const child = li.querySelector('ul, ol')
      if (!child) return
      li.classList.add('fold-parent')
      li.setAttribute('aria-expanded', 'true')
      li.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'CODE') return
        e.stopPropagation()
        const expanded = child.classList.toggle('fold-hidden')
        li.setAttribute('aria-expanded', String(!expanded))
      })
    })
  }
})()

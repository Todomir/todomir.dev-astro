import Prismic from '@prismicio/client'
import PrismicDOM from 'prismic-dom'
import { formatLang } from '../utils'

const { Elements } = PrismicDOM.RichText

const { PRISMIC_API_URL } = process.env

const client = Prismic.client(PRISMIC_API_URL)

export function serializer(type, element, content, children, classes) {
  switch (type) {
    case Elements.heading1:
      return `<h1 ${classes.h1 && `class=${classes.h1}`}>${children.join(
        ''
      )}</h1>`
    case Elements.heading2:
      return `<h2 ${classes.h2 && `class=${classes.h2}`}>${children.join(
        ''
      )}</h2>`
    case Elements.heading3:
      return `<h3 ${classes.h3 && `class=${classes.h3}`}>${children.join(
        ''
      )}</h3>`
    case Elements.heading4:
      return `<h4 ${classes.h4 && `class=${classes.h4}`}>${children.join(
        ''
      )}</h4>`
    case Elements.heading5:
      return `<h5 ${classes.h5 && `class=${classes.h5}`}>${children.join(
        ''
      )}</h5>`
    case Elements.heading6:
      return `<h6 ${classes.h6 && `class=${classes.h6}`}>${children.join(
        ''
      )}</h6>`
    case Elements.paragraph:
      return `<p ${classes.p && `class=${classes.p}`}>${children.join('')}</p>`
    case Elements.preformatted:
      return `<pre ${classes.pre && `class=${classes.pre}`}>${children.join(
        ''
      )}</pre>`
    case Elements.strong:
      return `<strong ${
        classes.strong && `class=${classes.strong}`
      }>${children.join('')}</strong>`
    case Elements.em:
      return `<em ${classes.em && `class=${classes.em}`}>${children.join(
        ''
      )}</em>`
    case Elements.listItem:
      return `<li ${classes.li && `class=${classes.li}`}>${children.join(
        ''
      )}</li>`
    case Elements.oListItem:
      return `<li ${classes.li && `class=${classes.li}`}>${children.join(
        ''
      )}</li>`
    case Elements.list:
      return `<li ${classes.li && `class=${classes.li}`}>${children.join(
        ''
      )}</li>`
    case Elements.oList:
      return `<ol ${classes.ol && `class=${classes.ol}`}>${children.join(
        ''
      )}</ol>`
    case Elements.image:
      var linkUrl = element.linkTo
        ? PrismicDOM.Link.url(element.linkTo, module.exports.linkResolver)
        : null
      var linkTarget =
        element.linkTo && element.linkTo.target
          ? `target="${element.linkTo.target}" rel="noopener"`
          : ''
      var wrapperClassList = [element.label || '', 'block-img']
      var img = `<img src="${element.url}" alt="${
        element.alt || ''
      }" copyright="${element.copyright || ''}">`
      return `
        <p class="${wrapperClassList.join(' ')}">
          ${linkUrl ? `<a ${linkTarget} href="${linkUrl}">${img}</a>` : img}
        </p>
      `
    case Elements.embed:
      return `
        <div data-oembed="${element.oembed.embed_url}"
          data-oembed-type="${element.oembed.type}"
          data-oembed-provider="${element.oembed.provider_name}"
          ${classes.embed && `class=${classes.embed}`}
        >
          ${element.oembed.html}
        </div>
      `
    case Elements.hyperlink:
      var target = element.data.target
        ? `target="${element.data.target}" rel="noopener"`
        : ''
      var linkUrl = PrismicDOM.Link.url(element.data, linkResolver)
      return `<a ${target} href="${linkUrl}" ${
        classes.a && `class=${classes.a}`
      }>${children.join('')}</a>`
    case Elements.label:
      var label = element.data.label
        ? ` class="${element.data.label} ${classes.label && classes.label}"`
        : ''
      return `<span ${label}>${children.join('')}</span>`
    case Elements.span:
      return content ? content.replace(/\n/g, '<br />') : ''
    default:
      return null
  }
}

export async function getPageByType(slug, lang) {
  const response = await client.query(
    Prismic.Predicates.at('document.type', slug),
    { lang }
  )
  return response
}

export async function getAllProjects(lang) {
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'project'),
    { lang, orderings: '[my.projects.name desc]' }
  )
  return response
}

export async function getPageByUID(type, slug, options) {
  const response = await client.getByUID(type, slug, options)
  return response
}

export async function getDataByType(type, options) {
  const response = await client.query(
    Prismic.Predicates.at('document.type', type),
    options
  )

  return response
}

export async function getAllFormattedLanguages() {
  const response = await fetch(PRISMIC_API_URL)
  const json = await response.json()
  return json.languages.map(lang => formatLang(lang.id))
}

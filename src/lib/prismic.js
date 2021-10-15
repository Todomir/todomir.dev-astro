import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';

const { Elements } = PrismicDOM.RichText;

const { PRISMIC_API_URL } = process.env;

const client = Prismic.client(PRISMIC_API_URL);

export function serializer(type, element, content, children, elClass) {
  switch (type) {
		case Elements.paragraph:
			return `<p class=${elClass}>` + children.join('') + '</p>'
		case Elements.heading1:
      return `<h1 class=${elClass}>` + children.join('') + '</h1>'
    default:
      null
	}
}

export async function getPageByType(slug, lang) {
  const response = await client.query(
    Prismic.Predicates.at('document.type', slug),
    { lang }
  )
  return response;
}

export async function getPageByUID(type, slug, lang) {
  const response = await client.getByUID(type, slug, { lang });
  return response;
}

export async function getAllFormattedLanguages() {
  const response = await fetch(PRISMIC_API_URL)
  const json = await response.json()
  return json.languages.map(lang => {
    const isIdHyphenated = lang.id.includes('-')
    if (isIdHyphenated) {
      const splitted = lang.id.split('-')
			const language = splitted[0] + '-' + splitted[1].toUpperCase()
			return language
    } else {
      return lang.id
    }
  })
}
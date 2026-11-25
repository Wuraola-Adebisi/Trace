export interface PageMetadata {
  title: string
  description: string
  robots?: string
}

export const SITE_URL = 'https://www.usetracelab.com'
export const SOCIAL_IMAGE = 'https://image.thum.io/get/width/1200/crop/630/noanimate/https://www.usetracelab.com/'

export const PAGE_META: Record<string, PageMetadata> = {
  '/': {
    title: 'Trace — Make sense of the mess',
    description: 'Make meeting notes, project documents and research easier to understand. See the people, topics, decisions and questions inside them.',
  },
  '/how-it-works': {
    title: 'How Trace works',
    description: 'See how Trace analyses unstructured information and connects people, topics, decisions and questions to their source material.',
  },
  '/examples': {
    title: 'Trace examples',
    description: 'Explore examples of how Trace turns unstructured notes into a navigable map of important information.',
  },
  '/trace': {
    title: 'Try Trace',
    description: 'Explore your notes and text with Trace. Surface topics, people, decisions, questions and relationships.',
    robots: 'noindex, nofollow',
  },
  '/about': {
    title: 'About Trace',
    description: 'Learn why Trace exists, what early users say about it and how the product is being developed.',
  },
  '/privacy': {
    title: 'Privacy policy',
    description: 'Read how Trace handles information submitted through the product.',
  },
  '/terms': {
    title: 'Terms of use',
    description: 'Read the terms that apply to using Trace.',
  },
}

export function getPageMetadata(pathname: string): PageMetadata {
  return PAGE_META[pathname] ?? PAGE_META['/']
}

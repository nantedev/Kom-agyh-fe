import { footerContent } from '@/data/home'

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-x-[3px] px-6 py-10 text-center text-sm leading-5 text-label">
      <p>
        {footerContent.createdBy}
        <a
          href={footerContent.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer font-bold"
        >
          {footerContent.author}
        </a>{' '}
        ©
      </p>
      <p>{footerContent.copyright}</p>
    </footer>
  )
}

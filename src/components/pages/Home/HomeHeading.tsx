import { homeContent } from '@/data/home'

type HomeHeadingProps = {
  userName?: string
}

export default function HomeHeading({ userName }: HomeHeadingProps) {
  const { visitor, connected } = homeContent

  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-14 text-center md:px-[200px]">
      <h1 className="text-3xl leading-tight font-bold text-foreground md:text-5xl md:leading-[57.6px]">
        {userName === undefined ? (
          <>
            {visitor.titlePrefix}
            <span className="text-title-accent">{visitor.titleAccent}</span>
          </>
        ) : (
          <>
            {connected.titlePrefix}
            <span className="text-title-accent">{userName} ?</span>
          </>
        )}
      </h1>
      <p className="max-w-[544px] text-lg leading-7 text-grey-blue">
        {userName === undefined ? visitor.subtitle : connected.subtitle}
      </p>
    </div>
  )
}

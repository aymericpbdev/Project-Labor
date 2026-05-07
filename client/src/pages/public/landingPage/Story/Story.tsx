import './Story.css'

type StorySide = 'left' | 'right'

type StoryProps = {
  variant: StorySide
  title: string
  text: string
  image: string
  imageAlt: string
  subtitle: string
  subtext: string
}

function Story({
  variant,
  title,
  text,
  image,
  imageAlt,
  subtitle,
  subtext,
}: StoryProps) {
  return (
    <section className={`story story--${variant}`}>
      <div className="story__card">
        <h2 className="story__title">{title}</h2>
        <p className="story__text">{text}</p>

        <div className="story__info">
          <h3 className="story__subtitle">{subtitle}</h3>
          <p className="story__subtext">{subtext}</p>
        </div>
      </div>

      <img
        className="story__image"
        src={image}
        alt={imageAlt}
      />
    </section>
  )
}

export default Story
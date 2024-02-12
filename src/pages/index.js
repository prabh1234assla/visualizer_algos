import * as React from "react"
import Slide from "./components/slide"
import { graphql } from "gatsby"

const bgColors = [
  'bg-one-100',
  'bg-two-100',
  'bg-three-100',
  'bg-four-100',
  'bg-five-100',
  'bg-six-100',
  'bg-seven-100',
  'bg-eight-100',
  'bg-nine-100',
  'bg-ten-100'
]

const txtColors = [
  'text-one-200',
  'text-two-200',
  'text-three-200',
  'text-four-200',
  'text-five-200',
  'text-six-200',
  'text-seven-200',
  'text-eight-200',
  'text-nine-200',
  'text-ten-200'
]

const label = [
  'Eagle.',
  'Bio.Tree.',
  'Root.Life.',
  'Zodarkaic.',
  'Flora.',
  'Tampa.',
  'Pikaro.',
  'Crifi.',
  'Vinyl.',
  'Foxy.'
]

const altText = [
  'EAGLE, soaring to new heights of innovation and precision, symbolizes a brand committed to excellence and cutting-edge technology.',
  'Biotree, where growth and sustainability intertwine, nurturing a greener tomorrow with a commitment to environmental harmony and vibrant ecosystems.',
  'RootLife, grounded in vitality, flourishing in every moment. Unearth a vibrant journey towards wellness and balance with the essence of life beneath your feet.',
  'Zodarkaic, where shadows meet innovation, forging a path of bold, mysterious elegance. Illuminate your journey with the allure of the unconventional and the power of the unknown.',
  "Flora, a tapestry of nature's beauty, where every petal tells a story of life, growth, and the timeless elegance of the botanical world.",
  "Tampa, where sun-kissed shores meet vibrant city vibes, a destination alive with energy, culture, and the warmth of Florida's Gulf Coast.",
  "Pikaro, unleash the bold spirit within. A brand that embraces daring creativity, unpredictability, and the thrill of the unexpected.",
  "Crifi, crafting tomorrow's innovation. A fusion of creativity and technology, Crifi pioneers solutions that redefine the boundaries of what's possible.",
  "A brand named 'Vinyl' evokes a sense of classic and timeless appeal, reminiscent of the enduring quality of vinyl records. It suggests a blend of nostalgia and modernity, catering to individuals who appreciate the rich, authentic experience associated with vinyl while embracing contemporary trends.",
  "'Foxy' exudes a playful and vibrant personality. The brand seems to target a youthful and energetic demographic, offering products or services that are trendy, fun, and perhaps a bit unconventional."
]


const IndexPage = (props) => {
  return (
    <main className="bg-[#1E1E1E]">
      {props.data.photos.edges.map((img, index) => (
        <Slide image={img} text={label[index]} txtcolor={txtColors[index]} bgcolor={bgColors[index]} alt={altText[index]} />
      ))}
    </main>
  )
}

export const pageQuery = graphql`
  query {
    photos: allFile(
      sort : {fields: base, order: ASC}
      filter : {extension : {regex : "/(png)/"},
      , relativeDirectory: {eq: "pages"}}
    ) {
      edges {
        node {
          id
          base
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              height: 1080
              formats: AUTO
              width: 1080
              quality: 100
            )
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default IndexPage
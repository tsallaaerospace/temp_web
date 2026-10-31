import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import content from "./content.json"
import styles from "./velocity.module.css"

export const metadata: Metadata = {
  title: "Velocity Complex - Tsalla Aerospace",
  description: "Tsalla Aerospace’s planned 100-acre integrated campus in Andhra Pradesh, bringing aircraft design, manufacturing and flight testing together.",
}

export default function VelocityPage() {
  return (
    <PageWrapper className={`velocity-page font-orbit ${styles.page}`}>
      {/* PREVIOUS UI: repeated the homepage campus banner on the Velocity page.
      <section className={styles.hero} aria-labelledby="velocity-title">
        <div className={styles.container}>
          <h1 id="velocity-title">Velocity Complex</h1>
          <img className={styles.campus} src="/home/Velocity-Complex.jpg" alt="Architectural visualisation of the planned Velocity Complex campus" fetchPriority="high" />
          <p className={styles.tagline}>A new standard in defense manufacturing.</p>
        </div>
      </section>
      */}

      <section className={styles.introduction} aria-labelledby="velocity-introduction">
        <div className={styles.container}>
          {/* PREVIOUS UI: <p className={styles.label}>Planned integrated campus / Andhra Pradesh</p> */}
          {/* PREVIOUS UI: this introduction was an h2 beneath the repeated campus banner. */}
          <h1 id="velocity-introduction"><span>100 acres.</span><br />From first principles to first flight.</h1>
          <p className={styles.lead}>{content.lead}</p>
          <div className={styles.introCopy}>
            {content.introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <figure className={styles.campusFigure}>
            <img className={styles.campus} src="/home/Velocity-Complex.jpg" alt="Architectural visualisation of the planned Velocity Complex campus" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      {content.sections.map((section, index) => (
        <section key={section.title} className={`${styles.section} ${section.image ? styles.support : ""}`} aria-labelledby={`velocity-section-${index}`}>
          <div className={`${styles.container} ${styles.sectionGrid}`}>
            <div className={styles.sectionHeading}>
              <p className={styles.label}>{String(index + 1).padStart(2, "0")} / Velocity Complex</p>
              <h2 id={`velocity-section-${index}`}>{section.title}</h2>
            </div>
            <div className={styles.copy}>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.cycle && <p className={styles.cycle}>{section.cycle}</p>}
              {section.image && (
                <figure className={styles.meeting}>
                  <img src={section.image.src} alt={section.image.caption} width={1069} height={720} loading="lazy" decoding="async" />
                  <figcaption>{section.image.caption}</figcaption>
                </figure>
              )}
              {section.closing.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>
      ))}
    </PageWrapper>
  )
}

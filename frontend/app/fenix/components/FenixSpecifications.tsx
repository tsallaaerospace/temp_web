import Image from "next/image"
import FenixFUI2 from "./FenixFUI2"

/* PREVIOUS UI:
const performanceSpecs = [
  { label: "Lift capacity", value: "500", unit: "g" },
  { label: "Endurance", value: "20", unit: "mins" },
  { label: "Altitude (AGL)", value: "0.5–50", unit: "m" },
  { label: "Cruise speed", value: "5", unit: "m/s" },
]

const dimensions = [
  { label: "Length", value: "308" },
  { label: "Width", value: "340" },
  { label: "Height", value: "100" },
]
*/
const performanceSpecs = [
  { label: "Lift capacity", value: "500", unit: "g" },
  { label: "Endurance", value: "20", unit: "mins" },
  { label: "Altitude (AGL)", value: "0.5–50", unit: "m" },
  { label: "Payload", value: "EO+IR", unit: "" },
]

const dimensions = [
  { label: "Length", value: "313" },
  { label: "Width", value: "346" },
  { label: "Height", value: "108" },
]

export default function FenixSpecifications() {
  return (
    <>
      <FenixFUI2 />
      {/* PREVIOUS UI:
      <section aria-label="FENIX specifications" className="fenix-specs font-orbit">
      */}
      <section aria-label="FENIX specifications" className="fenix-specs font-orbit w-full max-w-[120rem] 3xl:max-w-[140rem] mx-auto">
        <figure className="fenix-specs-visual">
          <Image
            src="/product/fenix/FENIX-specifications.png?v=technical-underside"
            alt="FENIX drone in a white technical illustration from below, showing its underside, front cameras and original cyan propellers"
            width={3200}
            height={1600}
            sizes="(max-width: 767px) 100vw, 68vw"
            className="fenix-specs-render"
          />
        </figure>

        <dl className="fenix-specs-performance">
          {/* PREVIOUS UI:
          {performanceSpecs.map(({ label, value, unit }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}<span>{unit}</span></dd>
            </div>
          ))}
          */}
          {performanceSpecs.map(({ label, value, unit }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}{unit ? <span>{unit}</span> : null}</dd>
            </div>
          ))}
        </dl>

        <dl className="fenix-specs-dimensions">
          {dimensions.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}<span>mm</span></dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}

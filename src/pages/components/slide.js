import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import Three_effect from "./Three_effect";
gsap.registerPlugin(ScrollTrigger);

export default function Slide({ image, text, txtcolor, bgcolor, alt }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        gsap.fromTo(el,
            { translateX: 6000 },
            {
                translateX: -6000,
                scrollTrigger: {
                    trigger: el,
                    scrub: true
                },
            }
        );
    }, []);

    return (
        <>
            <div key={image.node.id} className="h-[200vh] w-screen flex justify-center items-center">
                <div className={"h-fit w-[40%] relative overflow-hidden " + bgcolor}>
                    {/* <Three_effect img={image} /> */}
                    <GatsbyImage
                        fluid={image.node.childImageSharp.fluid}
                        image={getImage(image.node)}
                        alt={alt}
                    />
                    <div ref={ref} className={"absolute mix-blend-exclusion txt font-meander top-[-0.4em] left-0 text-[90em] " + txtcolor} id="txt">{text.toUpperCase()}</div>
                </div>
            </div>
        </>
    )
}
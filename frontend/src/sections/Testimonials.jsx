import Marquee from "react-fast-marquee";
import TestimonialCard from "../components/TestimonialCard";
import { testimonialsData } from "../data/testimonialsData";
import SectionTitle from "../components/SectionTitle";

export default function Testimonials() {
    return (
        <section className="py-24 overflow-hidden">
            <SectionTitle
                text1="User Experiences"
                text2="How AlignCV Can Help Job Seekers"
                text3="Illustrative experiences showing how AI-powered analysis can simplify resume optimization and job-description matching."
            />

            <Marquee
                className="max-w-6xl mx-auto mt-12"
                gradient={true}
                gradientWidth={80}
                speed={18}
                pauseOnHover={true}
            >
                <div className="flex items-stretch py-5">
                    {[...testimonialsData, ...testimonialsData].map(
                        (testimonial, index) => (
                            <TestimonialCard
                                key={`${testimonial.name}-${index}`}
                                testimonial={testimonial}
                            />
                        )
                    )}
                </div>
            </Marquee>
        </section>
    );
}
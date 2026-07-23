import BottomBanner from "../sections/BottomBanner";
import { FaqSection } from "../sections/FaqSection";
import FeaturesSection from "../sections/FeaturesSection";
import HeroSection from "../sections/HeroSection";
import HowItWorks from "../sections/HowItWorks";
import Testimonials from "../sections/Testimonials";
import TrustedCompanies from "../sections/TrustedCompanies";

export default function Home() {
    return (
        <>
            <HeroSection />
            <TrustedCompanies />
            <FeaturesSection />
            <Testimonials />
            <HowItWorks />
            <FaqSection />
            <BottomBanner />
        </>
    );
}
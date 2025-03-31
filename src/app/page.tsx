import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/sections/hero-section";
import Workflow from "@/components/sections/workflow";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import BookingForm from "@/components/sections/booking-form";
import Footer from "@/components/layout/footer";
import { SectionErrorBoundary } from "@/components/ui/error-boundary";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <SectionErrorBoundary section="Hero">
                    <HeroSection />
                </SectionErrorBoundary>

                <SectionErrorBoundary section="Workflow">
                    <Workflow />
                </SectionErrorBoundary>

                <SectionErrorBoundary section="Pricing">
                    <Pricing />
                </SectionErrorBoundary>

                <SectionErrorBoundary section="Testimonials">
                    <Testimonials />
                </SectionErrorBoundary>

                <BookingForm />

                <SectionErrorBoundary section="Footer">
                    <Footer />
                </SectionErrorBoundary>
            </div>
        </>
    );
}

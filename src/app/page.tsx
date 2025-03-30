import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/sections/hero-section";
import Services from "@/components/sections/services";
import Workflow from "@/components/sections/workflow";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import BookingForm from "@/components/sections/booking-form";
import Footer from "@/components/layout/footer";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <Services />
                <Workflow />
                <Pricing />
                <Testimonials />
                <BookingForm />
                <Footer />
            </div>
        </>
    );
}

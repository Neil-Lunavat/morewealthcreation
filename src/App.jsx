import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";

const App = () => {
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
};

export default App;

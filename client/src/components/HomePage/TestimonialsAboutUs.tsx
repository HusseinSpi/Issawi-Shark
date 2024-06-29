import { FC } from "react";

const TestimonialsAboutUs: FC = () => {
  return (
    <section className="bg-gray-200 py-20  pr-20 pl-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10 slide-in-up">
          Testimonials About Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <p>
              "InvestPro helped me achieve my financial goals through smart
              investments in small electronic projects."
            </p>
            <p className="mt-4 font-bold">John Doe</p>
            <p>Freelancer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <p>
              "Thanks to InvestPro, I was able to invest in innovative projects
              and see significant returns."
            </p>
            <p className="mt-4 font-bold">Jane Smith</p>
            <p>Entrepreneur</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestimonialsAboutUs;

import { FC } from "react";

const OurBestPrograms: FC = () => {
  return (
    <section className="py-20 mr-20 ml-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10 slide-in-up">
          Our Best Programs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold mb-4">Safe Investment</h4>
            <p>Invest safely with our expert tips and strategies.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold mb-4">Innovative Investment</h4>
            <p>Discover innovative ways to grow your investments.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold mb-4">Sustainable Investment</h4>
            <p>Invest sustainably and help create a better future.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurBestPrograms;

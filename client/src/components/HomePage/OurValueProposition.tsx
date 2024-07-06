import { FC } from "react";

const OurValueProposition: FC = () => {
  return (
    <section className="bg-primaryColor py-20 pr-20 pl-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10 slide-in-up text-secondaryColor">
          Our Value to Help You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold mb-4">Become Smarter</h4>
            <p>Investors become smarter and more knowledgeable.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold mb-4">Increase Earnings</h4>
            <p>Learn how to maximize your financial returns.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold mb-4">Control Risks</h4>
            <p>Manage and mitigate investment risks effectively.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg slide-in-up hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold mb-4">Financial Happiness</h4>
            <p>Achieve financial satisfaction and confidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurValueProposition;

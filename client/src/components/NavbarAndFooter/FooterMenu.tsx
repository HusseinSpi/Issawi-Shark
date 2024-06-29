import { FC } from "react";

interface Menu {
  services: string[];
  company: string[];
  helpfulLinks: string[];
  legal: string[];
  downloads: string[];
}

const FooterMenu: FC = () => {
  const menu: Menu = {
    services: [
      "1on1 Coaching",
      "Company Review",
      "Accounts Review",
      "HR Consulting",
      "SEO Optimisation",
    ],
    company: ["About", "Meet the Team", "Accounts Review"],
    helpfulLinks: ["Contact", "FAQs", "Live Chat"],
    legal: [
      "Accessibility",
      "Returns Policy",
      "Refund Policy",
      "Hiring Statistics",
    ],
    downloads: ["Marketing Calendar", "SEO Infographics"],
  };

  return (
    <>
      <div className="col-span-2 sm:col-span-1">
        <p className="font-medium text-gray-900">Services</p>
        <ul className="mt-6 space-y-4 text-sm">
          {menu.services.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-gray-700 transition hover:opacity-75">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <p className="font-medium text-gray-900">Company</p>
        <ul className="mt-6 space-y-4 text-sm">
          {menu.company.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-gray-700 transition hover:opacity-75">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <p className="font-medium text-gray-900">Helpful Links</p>
        <ul className="mt-6 space-y-4 text-sm">
          {menu.helpfulLinks.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-gray-700 transition hover:opacity-75">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <p className="font-medium text-gray-900">Legal</p>
        <ul className="mt-6 space-y-4 text-sm">
          {menu.legal.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-gray-700 transition hover:opacity-75">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <p className="font-medium text-gray-900">Downloads</p>
        <ul className="mt-6 space-y-4 text-sm">
          {menu.downloads.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-gray-700 transition hover:opacity-75">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FooterMenu;

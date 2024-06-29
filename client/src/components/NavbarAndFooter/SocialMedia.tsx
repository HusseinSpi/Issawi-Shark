import { FC } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const SocialMedia: FC = () => {
  return (
    <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
      <li>
        <a
          href="#"
          rel="noreferrer"
          target="_blank"
          className="text-gray-700 transition hover:opacity-75"
        >
          <span className="sr-only">Facebook</span>
          <FaFacebook />
        </a>
      </li>

      <li>
        <a
          href="#"
          rel="noreferrer"
          target="_blank"
          className="text-gray-700 transition hover:opacity-75"
        >
          <span className="sr-only">Instagram</span>
          <FaInstagram />
        </a>
      </li>

      <li>
        <a
          href="#"
          rel="noreferrer"
          target="_blank"
          className="text-gray-700 transition hover:opacity-75"
        >
          <span className="sr-only">Twitter</span>

          <FaTwitter />
        </a>
      </li>

      <li>
        <a
          href="#"
          rel="noreferrer"
          target="_blank"
          className="text-gray-700 transition hover:opacity-75"
        >
          <span className="sr-only">GitHub</span>

          <FaGithub />
        </a>
      </li>
    </ul>
  );
};
export default SocialMedia;

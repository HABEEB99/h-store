import React from 'react';
import SocialsItem from './SocialsItem';
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from 'react-icons/bs';

const FooterSocials = () => {
  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-2xl text-gray-700 font-bold"> Socials </h2>

      <div className="flex flex-col">
        <SocialsItem
          name="LinkedIn"
          path="https://linkedin.com/in/habeeb-ahmadu
        "
          Icon={BsLinkedin}
        />
        <SocialsItem
          name="Github"
          path="https://github.com/HABEEB99
        "
          Icon={BsGithub}
        />
        <SocialsItem name="Twitter" path="/" Icon={BsTwitter} />
        <SocialsItem name="Instagram" path="/" Icon={BsInstagram} />
        <SocialsItem name="Facebook" path="/" Icon={BsFacebook} />
      </div>
    </div>
  );
};

export default FooterSocials;

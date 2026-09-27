import React from "react";
import logo from "@public/icons/logo.svg"
import vkIcon from "@public/icons/social/vk.svg"
import internetIcon from "@public/icons/social/InternetIcon.svg"
import tgIcon from "@public/icons/social/TGIcon.svg"
import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <footer className="max-w-[926px] mx-auto mt-16 sm:mt-36 pt-10 sm:pt-18 pb-16 sm:pb-32 px-4 border-t-2 border-[#2D2D2D]">
      <SocialIcons />
      <FooterNavigation />
    </footer>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex items-center pt-4 justify-center flex-wrap gap-y-6 sm:gap-y-8 mb-8 sm:mb-10">
      <Link to="/">
        <img src={logo} className="mr-4 sm:mr-8 h-8 sm:h-auto" alt="Логотип" />
      </Link>
      <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
        <img src={vkIcon} className="mr-4" alt="VK" />
      </a>
      <a href="https://internet.ru" target="_blank" rel="noopener noreferrer">
        <img src={internetIcon} className="mr-4" alt="Internet" />
      </a>
      <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
        <img src={tgIcon} className="mr-4" alt="Telegram" />
      </a>
    </div>
  );
};

const FooterNavigation = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-between flex-wrap gap-3 sm:gap-4 text-center">
      <FooterLink to="/editing">Площадка проектов</FooterLink>
      <FooterLink to="/">Защиты проектов</FooterLink>
      <FooterLink to="/">Заказать проект</FooterLink>
      <FooterLink to="/">Обучение команды</FooterLink>
    </div>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink = ({ to, children }: FooterLinkProps) => {
  return (
    <Link
      to={to}
      className="font-light text-sm sm:text-base text-[#99A2AD] hover:text-[#0D9834] transition-colors"
    >
      {children}
    </Link>
  );
};

export default Footer;

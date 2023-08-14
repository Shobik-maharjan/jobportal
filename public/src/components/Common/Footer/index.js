import { animateScroll as scroll } from "react-scroll";
import {
  FooterContainer,
  FooterLink,
  FooterLinkItems,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterWrap,
  SocialIconLink,
  SocialIcons,
  SocialLogo,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
} from "./FooterElements";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle> About Us</FooterLinkTitle>
              <p>
                Job Hire is bridge between the hiring employers and the job
                seekers. The main objectives of “Job Hire” is to create a web
                platform where job-seekers and recruiter can connect and
                exchange opportunities, facilitating efficient and effective job
                placement.
              </p>
            </FooterLinkItems>
            {/* <FooterLinkItems>
              <FooterLinkTitle> About Us</FooterLinkTitle>
              <FooterLink to="/signin">How it Works? </FooterLink>
              <FooterLink to="/signin">Testimonals </FooterLink>
              <FooterLink to="/signin"> Careers </FooterLink>
              <FooterLink to="/signin">Investors </FooterLink>
              <FooterLink to="/signin">Terms of Service</FooterLink>
            </FooterLinkItems> */}
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              Job Hire
            </SocialLogo>
            <WebsiteRights>
              Job Hire &copy; {new Date().getFullYear()} All Rights Reserved
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href="https://youtube.com"
                target="_blank"
                aria-label="YouTube"
              >
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink
                href="https://github.com"
                target="_blank"
                aria-label="GitHub"
              >
                <FaGithub />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.linkedin.com"
                target="_blank"
                aria-label="Linkedin"
              >
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;

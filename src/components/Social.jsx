import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa';

const socials = [
  { icon: <FaGithub />, path: 'https://github.com/tahaglbz' },
  { icon: <FaLinkedinIn />, path: 'https://www.linkedin.com/in/taha-gulbaz/' },
  { icon: <FaInstagram />, path: 'https://www.instagram.com/taha_gulbaz/' },
  { icon: <FaEnvelope />, path: 'mailto:tahaglbz1@gmail.com' },

]
const Social = ({containerStyles, iconStyles}) => {
  return (
    <div className = {containerStyles}>
      {socials.map((item, index) => {
        return <Link key={index} href={item.path} className={iconStyles} target="_blank" rel="noopener noreferrer">
        {item.icon}
        </Link>
      })}
    </div>
  )
}

export default Social

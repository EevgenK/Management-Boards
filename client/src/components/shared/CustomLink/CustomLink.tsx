import { Link, LinkProps } from 'react-router-dom';
import s from './CustomLink.module.css';

export interface CustomLinkProps extends LinkProps {
  disabled?: boolean;
}
const CustomLink = ({ disabled, ...rest }: CustomLinkProps) => {
  return <Link {...rest} className={s.link} />;
};

export default CustomLink;

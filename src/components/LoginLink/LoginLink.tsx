import React from "react";
import { Link } from "react-router-dom";
import s from './LoginLink.module.css'

type LoginLinkProps = {
  path: string;
  children: React.ReactNode;
};

export const LoginLink: React.FC<LoginLinkProps> = ({ children, path }) => {
  return <Link className={s.loginLink} to={path}>{children}</Link>;
};

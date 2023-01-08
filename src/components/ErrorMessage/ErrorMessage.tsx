import React, { PropsWithChildren } from "react";
import s from "./ErrorMessage.module.css";

export const ErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={s.formError}>{children}</div>;
};

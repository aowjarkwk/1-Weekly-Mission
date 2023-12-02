import React, { ReactNode } from "react";
import * as S from "@/components/button/Button.style";
const Button = ({ children }: { children: ReactNode }) => {
  return <S.Button>{children}</S.Button>;
};

const LargeButton = ({ children }: { children: ReactNode }) => {
  return <S.LargeButton>{children}</S.LargeButton>;
};

Button.Large = LargeButton;

export default Button;

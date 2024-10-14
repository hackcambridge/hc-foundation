import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const userSchema = {
  _id: "",
  avatar: "",
  avatarName: "",
  avatarType: "",
  avatarURL: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  token: "",
  notifications: 0,
  type: "",
  type_index: 0,
};

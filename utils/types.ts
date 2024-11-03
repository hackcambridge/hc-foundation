import { ObjectId } from "mongodb";

export type User = {
  _id: string;
  avatar: string;
  avatarName: string;
  avatarType: string;
  avatarURL: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  notifications: number;
  type: string;
  type_index: number;
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

export type Hackathon = {
  _id: ObjectId;
  year: number;
  name: string;
  shortName: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  website: string;
  logoLight: string;
  logoDark: string;
  sponsors: ObjectId[];
  trustees: ObjectId[];
  admins: ObjectId[];
  committee: ObjectId[];
  participants: ObjectId[];
  judges: ObjectId[];
  winners: ObjectId[];
  status: string;
  status_index: number;
};

export type Sponsor = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  avatar: string;
  avatarName: string;
  avatarType: string;
  avatarURL: string;
  logo: string;
  website: string;
};

export type Trustee = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  avatar: string;
  avatarName: string;
  avatarType: string;
  avatarURL: string;
  email: string;
  phone: string;
  bio: string;
};
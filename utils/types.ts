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

export type RegionData = {
  _id: ObjectId;
  region: number;
  name: string;
  location: string;
  text: string;
  colour: string;
  logo: string;
  skills: string[];
  media: string[];
};

export type EducationData = {
  _id: ObjectId;
  index: number;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  activities: string;
  description: string;
  logo: string;
  skills: string[];
  media: string[];
};

export type CertificationData = {
  _id: ObjectId;
  index: number;
  name: string;
  organisation: string;
  credID: string;
  credURL: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
  skills: string[];
  media: string[];
};

export type ExperienceData = {
  _id: ObjectId;
  index: number;
  jobTitle: string;
  jobType: string;
  company: string;
  location: string;
  locationType: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
  skills: string[];
  media: string[];
};

export type OrganisationsData = {
  _id: ObjectId;
  index: number;
  name: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
  skills: string[];
  media: string[];
};

export type ProjectsData = {
  _id: ObjectId;
  index: number;
  name: string;
  brief: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
  skills: string[];
  media: string[];
};

export type SkillsData = {
  _id: ObjectId;
  index: number;
  name: string;
  description: string;
  media: string[];
};

export type MediaData = {
  _id: ObjectId;
  name: string;
  type: string;
  url: string;
};

export type ContactData = {
  _id: ObjectId;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
};

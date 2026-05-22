export const User_Role = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;
export type Roles = "contributor" | "maintainer";
export type Query = {
  sort?: string;
  type?: string;
  status?: string;
};

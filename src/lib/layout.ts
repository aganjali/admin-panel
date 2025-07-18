export const COPY_RIGHT = "Copyright © {name} {year}. All Rights Reserved.";

export const getCopyRightText = (name: string) => {
  return COPY_RIGHT.replace(
    "{year}",
    new Date().getFullYear().toString()
  ).replace("{name}", name);
};

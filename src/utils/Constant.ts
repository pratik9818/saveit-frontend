export const GOOGLE_CLIENT_ID = "935756544201-5q3i79vmjmgug22rtj7p7bgt8hh17uhn.apps.googleusercontent.com";
export const API_VERSION = "v1";
export const DOMAIN = "https://server.saveit.tech";
export const successGreen = "bg-emerald-400";
export const errorRed = "bg-rose-400";
export const capsuleFiltersStore = {
  default: {
    path: "capsules",
  },
  size: {
    path: "capsules/filter/size",
  },
  datecreated: {
    path: "capsules/filter/date",
  },
};
export const fragmentDimensionAbove700px = [
  {
    fragmentType: "image",
    width: "350px",
    height: "350px",
  },
  {
    fragmentType: "video",
    width: "350px",
    height: "350px",
  },
  {
    fragmentType: "text",
    width: "300px",
    height: "auto",
  },
  {
    fragmentType: "docs",
    width: "250px",
    height: "100px",
  },
];
export const fragmentDimensionBelow700px = [
  {
    fragmentType: "image",
    width: "200px",
    height: "200px",
  },
  {
    fragmentType: "video",
    width: "200px",
    height: "200px",
  },
  {
    fragmentType: "text",
    width: "100px",
    height: "auto",
  },
  {
    fragmentType: "docs",
    width: "200px",
    height: "auto",
  },
];

export const breakFragmentPixel = 640 
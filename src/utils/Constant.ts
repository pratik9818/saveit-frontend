export const GOOGLE_CLIENT_ID =
  "935756544201-5q3i79vmjmgug22rtj7p7bgt8hh17uhn.apps.googleusercontent.com";
export const API_VERSION = "v1";
export const DOMAIN = "https://server.saveit.tech";
// export const DOMAIN = "http://localhost:3001";
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
export const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "bmp",
  "svg",
  "image"
];
export const videoExtensions = ["mp4", "webm", "mov", "avi", "mkv", "video"];
export const audioExtensions = ["mp3", "wav", "ogg", "aac", "m4a", "audio","mpga"];

export const fragmentDimensionAbove700px = [
  {
    fragmentType: imageExtensions,
    width: "500px",
    // height: "350px",
  },
  {
    fragmentType: videoExtensions,
    width: "350px",
    // height: "350px",
  },
  {
    fragmentType: "text",
    width: "300px",
    height: "auto",
  },
  {
    fragmentType: audioExtensions,
    width: "400px",
    height: "95px",
  },
  {
    fragmentType: "docs",
    width: "300px",
    height: "85px",
  }
];
export const fragmentDimensionBelow700px = [
  {
    fragmentType: imageExtensions,
    width: "200px",
    height: "200px",
  },
  {
    fragmentType: videoExtensions,
    width: "200px",
    height: "200px",
  },
  {
    fragmentType: "text",
    width: "100px",
    height: "auto",
  },
  {
    fragmentType: audioExtensions,
    width: "200px",
    height: "auto",
  },
  {
    fragmentType: "docs",
    width: "200px",
    height: "auto",
  },
];

export const breakFragmentPixel = 760;
export const buttonBg =
  "bg-gradient-to-r from-blue-500 via-purple-500 to-purple-700";
export const frgamentBg = "bg-gradient-to-br from-blue-600 to-purple-800";

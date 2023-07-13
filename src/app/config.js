export const BASE_URL = process.env.REACT_APP_BACKEND_API;
export const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
export const COMMENTS_PER_POST = 3;
export const POSTS_PER_PAGE = 5;

const config = {
  defaultPath: "/dashboard/default",
  fontFamily: `'Public Sans', sans-serif`,
  i18n: "en",
  miniDrawer: false,
  container: true,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr",
};

export default config;

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

export const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "rgba(0, 0, 0, -0.5)",
  boxShadow: "0px 0 0px 0px",
  border: 0,
};

export const centered = { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", p: 3 };

export const drawerWidth = 260;

export const twitterColor = "#1DA1F2";
export const facebookColor = "#3b5998";
export const linkedInColor = "#0e76a8";

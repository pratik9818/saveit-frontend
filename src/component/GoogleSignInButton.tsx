// GoogleSignInButton.js
import { GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";
import { googleSignInRes } from "../types/Types";
import { GOOGLE_CLIENT_ID } from "../utils/Constant";

const GoogleSignInButton = ({ onSuccess, onError }:googleSignInRes) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //what is browserrouter
import LoginPage from "./pages/LoginPage";
import Alert from "./utils/Alert";
// import CapsulePage from "./pages/CapsulePage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div >
      <Alert />
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/app/privacy-policy" Component={PrivacyPolicyPage} />
          <Route path="app/auth" Component={LoginPage} />
          {/* <Route path="app/capsules" Component={CapsulePage} /> */}
          {/* <Route path="app/fragment/:capsuleid" Component={FragmentPage} /> */}
          <Route path="app/home" Component={HomePage} />

          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

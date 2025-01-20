import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //what is browserrouter
import LoginPage from "./pages/LoginPage";
import Alert from "./utils/Alert";
import CapsulePage from "./pages/CapsulePage";
import CreateCapsuleModal from "./component/CreateCapsuleModal";
import FragmentPage from "./pages/FragmentPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  return (
    <div>
      <CreateCapsuleModal/>
      <Alert />
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/app/privacy-policy" Component={PrivacyPolicyPage} />
          <Route path="app/auth" Component={LoginPage} />
          <Route path="app/capsules" Component={CapsulePage} />
          <Route path="app/fragment/:capsuleid" Component={FragmentPage} />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

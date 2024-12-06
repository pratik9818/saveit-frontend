import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //what is browserrouter
import LoginPage from "./pages/LoginPage";
import Alert from "./utils/Alert";
import CapsulePage from "./pages/CapsulePage";
import CreateCapsuleModal from "./component/CreateCapsuleModal";
import FragmentPage from "./pages/FragmentPage";

function App() {
  return (
    <div>
      <CreateCapsuleModal/>
      <Alert />
      <Router>
        <Routes>
          <Route path="app/auth" Component={LoginPage} />
          <Route path="/" Component={CapsulePage} />
          <Route path="app/fragment/:capsuleid" Component={FragmentPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

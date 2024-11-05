import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //what is browserrouter
import LoginPage from "./pages/LoginPage";
import Alert from "./utils/Alert";
import CapsulePage from "./pages/CapsulePage";
import CreateCapsuleModal from "./component/CreateCapsuleModal";

function App() {
  return (
    <div>
      <CreateCapsuleModal/>
      <Alert />
      <Router>
        <Routes>
          <Route path="app/auth" Component={LoginPage} />
          <Route path="app/capsules" Component={CapsulePage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

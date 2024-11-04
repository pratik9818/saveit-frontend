import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //what is browserrouter
import LoginPage from "./pages/LoginPage";
import Alert from "./utils/Alert";
import { isAlert } from "./recoil/Store";
import { useRecoilValue } from "recoil";
import CapsulePage from "./pages/CapsulePage";
import CreateCapsuleModal from "./component/CreateCapsuleModal";

function App() {
  const isAlertValue = useRecoilValue(isAlert);
  return (
    <div>
      {isAlertValue && <Alert />}
      <CreateCapsuleModal/>
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

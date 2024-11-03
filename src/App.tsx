import { BrowserRouter as Router ,Routes ,Route} from 'react-router-dom' //what is browserrouter
import Login from './layouts/Login'
import Alert from './utils/Alert'
import { isAlert } from './recoil/Store'
import { useRecoilValue } from 'recoil';

function App() {
  const isAlertValue = useRecoilValue(isAlert)
return <div>
  
    {isAlertValue && <Alert/>}
    <Router>
      <Routes>
          <Route path='app/auth' Component={Login}/>
      </Routes>
    </Router>
</div>
  
}

export default App

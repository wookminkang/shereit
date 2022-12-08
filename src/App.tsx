import { 
  BrowserRouter as Router,
  Routes,
  Route }
from 'react-router-dom';
import { Review } from './page/Review';
import { ReviewWrite } from './page/ReviewWrite';


function App() {
  return (
    <Router basename="/shereit">
			<Routes>
				<Route index element={<Review />} />
				<Route path="/mypage/productview/apply/:seq" element={<ReviewWrite />} />
			</Routes>
		</Router>


    
  );
}

export default App;

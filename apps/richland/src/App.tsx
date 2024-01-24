import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './features/home/pages/HomePage';
import SignUpPage from './features/sign-up/pages/SignUpPage';
import IdentityVerificationPage from './features/sign-up/pages/IdentityVerificationPage';
import SearchPage from './features/search/pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/sign-up/identity-verification"
          element={<IdentityVerificationPage />}
        />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

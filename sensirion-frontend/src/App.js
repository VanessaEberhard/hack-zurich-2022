import Dashboard from "pages/Dashboard";
import Header from "pages/Header";
import Profile from "pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <>
            <Header />
            <Routes>
              {["/dashboard", "/dashboard/:detailId"].map((pathString) => (
                <Route
                  key={pathString}
                  path={pathString}
                  element={<Dashboard />}
                />
              ))}
              {["/profile", "/profile/:detailId"].map((pathString) => (
                <Route
                  key={pathString}
                  path={pathString}
                  element={<Profile />}
                />
              ))}

              <Route path="*" element={<Dashboard />} />
            </Routes>
          </>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;

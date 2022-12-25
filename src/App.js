import { useContext } from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import Layout from './layout/Layout';

// import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import TestListPage from './pages/TestListPage';
import SignUpPage from './pages/SignUpPage';
import ExamPage from './pages/ExamPage';
import FrontendExamPage from './pages/ExamSectionPage';
import MyPage from './pages/MyPage';
import PasswordUpdatePage from './pages/PasswordUpdatePage';
import RecentProblemPage from './pages/RecentProblemPage';
import RecentExamPage from './pages/RecentExamPage';
import TestScreenPage from './pages/TestScreenPage';

import AuthContext from './store/auth-context';
import { THEME_COLOR } from './global_variables';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: THEME_COLOR,
        main: THEME_COLOR,
        dark: 'red',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
  const authCtx = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route element={<Layout />}>
            <Route path="/" element={<TestListPage />} />
            <Route path="/test" element={<TestListPage />} />
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/exam/:examId" element={<FrontendExamPage />} />
            <Route path="/test/:questionId" element={<TestScreenPage />} />
            <Route
              path="/login"
              element={authCtx.isLoggedIn ? <Navigate to="/" replace={true} /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
            />
            <Route path="/my-page" element={authCtx.isLoggedIn ? <MyPage /> : <Navigate to="/" />} />
            <Route path="/passwordUpdate" element={<PasswordUpdatePage />} />
            <Route path="/RecentProblem" element={<RecentProblemPage />} />
            <Route path="/RecentExam" element={<RecentExamPage />} />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}
export default App;

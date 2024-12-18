import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProvidersList from './pages/ProvidersList';
import NotFound from './pages/NotFound';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from "./components/NavBar";
import Provider from "./pages/Provider";
import AuthController from "./components/AuthController";

import './App.css'
import ProviderDashboard from "./pages/ProviderDashboard";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {

      main: '#3d9970',
      contrastText: '#ddddd', // Default/main color

    },
    secondary: {
      light: '#fffde7', 
      main: '#fff9c4', 
      dark: '#fff59d', 
      contrastText: '#ffffff',
    },
    error: {
      light: '#fce4ec',
      main: '#f8bbd0',
      dark: '#f48fb1',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#fbe9e7',
      main: '#ffccbc',
      dark: '#ffab91',
      contrastText: '#000000',
    },
    info: {
      light: '#fafafa',
      main: '#b2dfdb',
      dark: '#80cbc4',
      contrastText: '#ffffff',
    },
    success: {
      light: '#e8f5e9',
      main: '#b9f6ca',
      dark: '#69f0ae',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5', // Background for the app
      paper: '#ffffff',   // Background for paper elements
    },
    text: {
      primary: '#212121', // Primary text color
      secondary: '#757575', // Secondary text color
      disabled: '#bdbdbd',  // Disabled text color
    },
  },
  typography: {
    fontFamily: 'Calibri',
    button: {
      textTransform: "capitalize",
      color: 'black'
    },
  },
});


function App() {

  return (
<ThemeProvider theme={theme}>

  <BrowserRouter>
  <NavBar/>
  <AuthController /> 
    <Routes>   
      <Route path="/" element={<Home />} />
      <Route path="/providers/service/:id" element={<ProvidersList />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/providers/:id" element={<Provider />} />
      <Route path="/provider_Dashboard" element={<ProviderDashboard />} />
    </Routes>
  </BrowserRouter>
</ThemeProvider>
  )
}

export default App

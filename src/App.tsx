// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import ClickerGame from "./components/ClickerGame";

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<ClickerGame />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ClickerGame from "./components/ClickerGame";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<ClickerGame />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

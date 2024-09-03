// import React from "react";
// import ClickerGame from "./components/ClickerGame";

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <ClickerGame />
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import ClickerGame from "./components/ClickerGame";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClickerGame />} />
      </Routes>
    </div>
  );
};

export default App;

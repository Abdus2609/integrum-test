import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider, ThemeProvider, useTheme } from "./utilities/globalContext";

export default function App() {
  return (
    <ThemeProvider>
      <EntryProvider>
        <AppContent />
      </EntryProvider>
    </ThemeProvider>
  );
}

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<AllEntries />}></Route>
          <Route path="create" element={<NewEntry />}></Route>
          <Route path="edit/:id" element={<EditEntry />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

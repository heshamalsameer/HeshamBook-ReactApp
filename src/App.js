import {
  Box,
  // CssBaseline,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./App.css";
import Feed from "./Components/Feed";
import Rightbar from "./Components/Rightbar";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Add from "./Components/Add";
import { useState } from "react";

function App() {
  const [Mode, setMode] = useState("light");

  const Theme = createTheme({
    palette: {
      mode: Mode,
    },
  });
  
  return (
    <ThemeProvider theme={Theme}>
      {/* <CssBaseline/> */}
      <Box  bgcolor={'background.default'} color='text.primary'>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar mode={Mode} setMode={setMode}/>
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default App;

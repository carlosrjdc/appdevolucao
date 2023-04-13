import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { GrAdd } from "react-icons/gr";

export default function AddAppBar() {
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });
  return (
    <div>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <StyledFab aria-label="add">
            <GrAdd size={25} color="red" />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

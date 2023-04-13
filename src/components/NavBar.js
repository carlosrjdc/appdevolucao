import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function MenuSuperior(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={props.voltar} color="inherit">
            {props.botao1}
          </Button>
          <Button color="inherit"></Button>
          <Button onClick={props.finalizar} color="inherit">
            {props.botao2}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

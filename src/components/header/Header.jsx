// import React from "react";
import { Stack } from "@mui/system";
import { Container, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { headerElements } from "../../data/data.mjs";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      style={{
        backgroundColor: "#A9A9A9",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <Container
        sx={{
          // position: "fixed",
          // top: "0",
          justifyContent: "center",
          alignItems: "center",
          pt: "20px",
          pb: "20px",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            alignItems: " center",
            justifyContent: "space-between",
          }}
        >
          {headerElements.map((element, index) => {
            return (
              <Button
                variant="contained"
                key={`small_navbar_key${index}`}
                // key={{ index }}
                onClick={() => navigate(element.path)}
                sx={{
                  cursor: "pointer",
                  background:
                    location.pathname === `/${element.path}` ? "red" : null,
                }}
              >
                {element.title}
              </Button>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}

export default Header;

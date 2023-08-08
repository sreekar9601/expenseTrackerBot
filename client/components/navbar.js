import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth, signOut } from "../firebase/auth";
import { useRouter } from "next/router";
import { styled } from "@mui/system"; // Import styled from @mui/system

const StyledAppBar = styled(AppBar)({
  backgroundColor: (theme) => theme.palette.primary.main,
});

const StyledToolbar = styled(Toolbar)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledTitle = styled(Typography)({
  flexGrow: 1,
  alignSelf: "center",
  cursor: "pointer",
});

const StyledUserSection = styled(Stack)({
  display: "flex",
  alignItems: "center",
  gap: (theme) => theme.spacing(2),
});

export default function NavBar() {
  const router = useRouter();
  const { authUser, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <StyledContainer>
            <StyledTitle onClick={() => router.push("/dashboard")} variant="h3">
              EXPENSE TRACKER
            </StyledTitle>
            <StyledUserSection direction="row" spacing={2}>
              <Typography variant="h6">{authUser?.email}</Typography>
              <Button variant="outlined" color="secondary" onClick={signOut}>
                Logout
              </Button>
            </StyledUserSection>
          </StyledContainer>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
}

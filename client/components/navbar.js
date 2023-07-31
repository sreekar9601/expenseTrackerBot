
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { useAuth, signOut } from '../firebase/auth';
import styles from '../styles/navbar.module.scss';
import { useRouter } from 'next/router';



export default function NavBar() {

  
const router = useRouter();

  const {authUser, signOut} = useAuth()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <Container className={styles.container}>
            <Typography onClick={()=>router.push('/dashboard')} variant="h3" sx={{ flexGrow: 1, alignSelf: "center" }}>
              EXPENSE TRACKER
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {authUser?.email}
              </Typography>
              <Button variant="text" color="secondary" onClick={signOut}>
                Logout
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
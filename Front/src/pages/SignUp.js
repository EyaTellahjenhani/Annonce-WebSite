import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footere from '../component/home/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/home/Navbar';
import axios from 'axios';



const defaultTheme = createTheme();

export default function SignUpFunction() {

  const isLoggedIn= window.localStorage.getItem('isLoggedIn')
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
})



  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
console.log(formData);

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      
       
  await axios.post("/api/auth/signUp", 
        formData,
      ).then((response) => {
        navigate("/login");
        setError("");

      }
      ).catch((error) => {
        setError(error.response.data);

      }
      );

    } catch (error) {
      setError(error.response.data);

    }
  };

  React.useEffect(() => {
    if (isLoggedIn)
    {
     navigate('/')
    }
    
   },);

  return (

    <>
    <Navbar />
    
    <div className='rounded-xl border border-gray-200 bg-slate-50 shadow-sm m-auto max-w-md mt-14 mb-5'>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: '#075985' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={'#075985'}>
          S'inscrire
          </Typography>
          <Box component="form" noValidate onSubmit={handleClick} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName" 
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={handleChange}
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  label="Address Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="numeroTelephone"
                  label="Numéro de Téléphone"
                  name="phone"
                  autoComplete="numeroTelephone"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Je veux recevoir des offres promotionnelles de la part de l'entreprise"
                />
              </Grid>
            </Grid>
            {error && <p className="text-center m-3 text-red-500">{error}</p>}
            <Button
              type="submit"
              fullWidth

              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#075985' }}
            >
              S'inscrire
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item marginBottom={3}>
                <Link to="/login" variant="body2" >
                Vous avez déjà un compte? <span className="cursor-pointer text-sky-600 no-underline hover:text-sky-600">Se connecter</span> 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
    <Footere />
    </>
  );
}

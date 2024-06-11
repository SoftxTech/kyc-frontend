import { useState } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
/* eslint-disable */
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  useTheme,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
// import { useAuth } from '../../hooks/use-auth';
import toast from "react-hot-toast";
import { Label } from "@mui/icons-material";

export const SigninForm: FC = (props) => {
  // const isMounted = useMounted();
  const router = useRouter();
  // const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("emailIsRequired"),
      password: Yup.string().max(255).required("passwordIsRequired"),
    }),
    onSubmit: async (values: any): Promise<void> => {
      try {
        setLoading(true);
        router.push("/login");
        // await login(values);
      } catch (err: Error) {
        toast.error(err.message || "failed");
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <FormControl
        sx={{ width: "100%", marginTop: "10px", mb: 2 }}
        variant="outlined"
      >
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            ml: 0,
            bgcolor: theme.palette.primary.contrastText,
            color: theme.palette.text.primary,
          }}
        >
          Email
        </Typography>
        <OutlinedInput
          // autoFocus
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="name"
          value={formik.values.email}
          InputProps={{
            style: {
              fontFamily: "sans-serif",
              color: theme.palette.text.primary,
            },
          }}
        />
      </FormControl>

      <FormControl
        sx={{ width: "100%", marginTop: "10px", mb: 2 }}
        variant="outlined"
      >
        <Typography
          variant="body1"
          sx={{
            m: 2,
            ml: 0,
            bgcolor: theme.palette.primary.contrastText,
            color: theme.palette.text.primary,
          }}
        >
          Password
        </Typography>
        <OutlinedInput
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type={showPassword ? "text" : "password"}
          sx={{
            fontFamily: "sans-serif",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                sx={{ color: "black" }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{`${formik.errors.submit}`}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <LoadingButton
          sx={{
            color: theme.palette.secondary.dark,
            bgcolor: theme.palette.primary.main,
            opacity: "78%",
            fontSize: "18px",
          }}
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Sign in
        </LoadingButton>
      </Box>
    </form>
  );
};

import { useEffect, useState } from "react";
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
import { Web3Button, contractType, useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { Contract } from "ethers";

export const SigninForm: FC = (props) => {
  // const isMounted = useMounted();
  const router = useRouter();
  const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);
  const [user, setUser] = useState([]);
  // const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      _id: "",
      pass: "",
      submit: null,
    },
    validationSchema: Yup.object({
      _id: Yup.number().required("_id Is Required"),
      pass: Yup.string().max(255).required("password Is Required"),
    }),
    onSubmit: async (values: any): Promise<void> => {
      try {
        setLoading(isLoading);
        console.log("values", values);
        console.log("contract", contract);

        const result = await contract?.call("logIN", [
          Number(values._id),
          values.pass,
        ]);
        setUser(result);
        console.log("result", parseInt(result[2]?._hex));
      } catch (err: any) {
        toast.error(err.message || "failed");
        console.log("error", error);
        setLoading(isLoading);
      }
    },
  });
  useEffect(() => {
    user[0] ? router.push("/login") : toast.error("user not found");
  }, [user]);
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
          ID
        </Typography>
        <OutlinedInput
          // autoFocus
          error={Boolean(formik.touched._id && formik.errors._id)}
          fullWidth
          helperText={formik.touched._id && formik.errors._id}
          name="_id"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="id"
          value={formik.values._id}
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
          error={Boolean(formik.touched.pass && formik.errors.pass)}
          fullWidth
          name="pass"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.pass}
          type={showPassword ? "text" : "password"}
          sx={{
            fontFamily: "sans-serif",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                sx={{ color: "black" }}
                aria-label="toggle pass visibility"
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

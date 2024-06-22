import { useEffect, useState } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
/* eslint-disable */
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  FormHelperText,
  InputAdornment,
  IconButton,
  FormControl,
  useTheme,
  Typography,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
// import { useAuth } from '../../hooks/use-auth';
import toast from "react-hot-toast";
import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";

interface SigninFormProps {
  id: number;
  setHash: (hash: string) => void;
  setId: (id: number) => void;
  setOpenForm: (open: boolean) => void;
}

export const SigninForm: FC<SigninFormProps> = (props) => {
  const { id, setHash, setId, setOpenForm } = props;
  // const isMounted = useMounted();
  const router = useRouter();
  const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);
  // const { login } = useAuth();
  const [loading, setLoading] = useState(isLoading);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      _id: "",
      pass: "",
      submit: null,
    },
    validationSchema: Yup.object({
      _id: Yup.number().required("ID Is Required"),
      pass: Yup.string().max(255).required("password Is Required"),
    }),
    onSubmit: async (values: any): Promise<void> => {
      if (contract) {
        try {
          setLoading(isLoading);
          console.log("values", values);
          console.log("contract", contract);

          const result = await contract?.call("logIN", [
            Number(values._id),
            values.pass,
          ]);

          if (result[0]) {
            setHash(result[1])
            setId(parseInt(result[2]?._hex));
            setOpenForm(false);
          } else toast.error("user not found");
        } catch (err: any) {
          toast.error(err.message || "user not found");
          console.log("error", error);
          setLoading(isLoading);
        }
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
          ID
        </Typography>
        <TextField
          // autoFocus
          error={Boolean(formik.touched._id && formik.errors._id)}
          fullWidth
          helperText={formik.touched._id && formik.errors._id}
          name="_id"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="id"
          value={formik.values._id}
          inputProps={{
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
        <TextField
          error={Boolean(formik.touched.pass && formik.errors.pass)}
          fullWidth
          helperText={formik.touched.pass && formik.errors.pass}
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

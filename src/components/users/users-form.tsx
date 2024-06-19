import type { FC } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";

interface UsersFormProps {
  createUser: (users: any) => Promise<{ success: boolean }>;
}

export const UsersForm: FC<UsersFormProps> = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().max(255).required("usernameIsRequired"),
      first_name: yup.string().max(255).required("first_nameIsRequired"),
      last_name: yup.string().max(255).required("last_nameIsRequired"),
      email: yup
        .string()
        .email("emailAddress")
        .max(255)
        .required("emailIsRequired"),
      phone_number: yup
        .string()
        .min(11, "phoneNumberLengthMessage")
        .max(11, "phoneNumberLengthMessage")
        .required("phoneNumberIsRequired"),
      password: yup.string().min(6).max(255).required("passwordIsRequired"),
    }),
    onSubmit: async (values) => {
      // const { success } = await createUser(values);
      // if (success) {
      //   formik.resetForm();
      // }
    },
  });

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "primary.dark",
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Typography color="inherit" variant="h6">
          {"add"} {"user"}
        </Typography>
      </Box>
      <Box sx={{ margin: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            size="small"
            error={Boolean(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            label={"username"}
            margin="normal"
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            sx={{ mr: 1 }}
            InputProps={{
              style: {
                fontFamily: "sans-serif",
              },
            }}
          />
          <TextField
            size="small"
            error={Boolean(
              formik.touched.first_name && formik.errors.first_name
            )}
            helperText={formik.touched.first_name && formik.errors.first_name}
            label={"first_name"}
            margin="normal"
            id="first_name"
            name="first_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            sx={{ mr: 1 }}
            InputProps={{
              style: {
                fontFamily: "sans-serif",
              },
            }}
          />
          <TextField
            size="small"
            error={Boolean(formik.touched.last_name && formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            label={"last_name"}
            margin="normal"
            id="last_name"
            name="last_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            sx={{ mr: 1 }}
            InputProps={{
              style: {
                fontFamily: "sans-serif",
              },
            }}
          />

          <TextField
            size="small"
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label={"email"}
            margin="normal"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            sx={{ mr: 1 }}
            InputProps={{
              style: {
                fontFamily: "sans-serif",
              },
            }}
          />
          <TextField
            size="small"
            error={Boolean(
              formik.touched.phone_number && formik.errors.phone_number
            )}
            helperText={
              formik.touched.phone_number && formik.errors.phone_number
            }
            label={"phone_number"}
            margin="normal"
            id="phone_number"
            name="phone_number"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone_number}
            sx={{ mr: 1 }}
            InputProps={{
              style: {
                fontFamily: "sans-serif",
              },
            }}
          />
          <TextField
            size="small"
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label={"password"}
            margin="normal"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            sx={{ mr: 1 }}
            InputProps={{
              style: {
                fontFamily: "sans-serif",
              },
            }}
          />
          <LoadingButton
            type="submit"
            size="medium"
            sx={{ m: 1, mt: 2 }}
            variant="contained"
          >
            {"submit"}
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
};

import { FC, useEffect } from "react";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  alpha,
  Box,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useMounted } from "../../hooks/use-mounted";
import moment from "moment";
import { downloadFile } from "../../utils/ipfs";
import DropzoneComponent from "../dropzone";
import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../const/addresses";
import { useAuth } from "../../hooks/use-auth";

const roles = [
  { id: 0, name: "Admin" },
  { id: 1, name: "User" },
];
const genders = [
  { id: 0, name: "Male" },
  { id: 1, name: "Female" },
];
export const UserCreate = () => {
  const [preview, setPreview] = useState<string>("");
  const { id } = useAuth();
  const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);
  const [loading, setLoading] = useState(false);
  const addPerson = async (values: any) => {
    if (contract) {
      const date = Date.parse(values.bod) / 1000;
      try {
        const result = await contract?.call("addPerson", [
          Number(id),
          values.fullName,
          Number(values.id),
          values.job,
          date,
          values.gender,
          values.role,
          values.preview,
        ]);
        console.log("result", result);
      } catch (err: any) {
        toast.error(err.message || "user not found");
        setLoading(isLoading);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      id: 0,
      job: "",
      bod: "",
      gender: genders[0].id,
      role: roles[0].id,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      fullName: yup.string().max(255).required("Full Name Is Required"),
      id: yup.number().required("ID Is Required"),
      job: yup.string().max(255).required("Job Is Required"),
      bod: yup.string().max(255).required("Date Of Birth Is Required"),
      gender: yup.number().required("Gender Is Required"),
      role: yup.number().required("Role Is Required"),
    }),
    onSubmit: async (values) => {
      if (preview != "") {
        await addPerson({ ...values, preview });
      }
    },
  });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          padding: 3,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={8}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Create new user
            </Typography>
            <Paper
              elevation={12}
              sx={{
                m: 1,
                p: 2,
                minHeight: "280px",
                ...(true && {
                  bgcolor: (theme) =>
                    alpha(theme.palette.info.contrastText, 0.57),
                }),
              }}
            >
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(
                  formik.touched.fullName && formik.errors.fullName
                )}
                // @ts-ignore
                helperText={formik.touched.fullName && formik.errors.fullName}
                label="Full Name"
                margin="normal"
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.job && formik.errors.job)}
                // @ts-ignore
                helperText={formik.touched.job && formik.errors.job}
                label="job"
                margin="normal"
                id="job"
                name="job"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.job}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />

              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%", sm: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.id && formik.errors.id)}
                // @ts-ignore
                helperText={formik.touched.id && formik.errors.id}
                label="ID"
                margin="normal"
                id="id"
                name="id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.id}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%", sm: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.bod && formik.errors.bod)}
                // @ts-ignore
                helperText={formik.touched.bod && formik.errors.bod}
                label="Date Of Birth"
                margin="normal"
                id="bod"
                name="bod"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.bod}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl
                sx={{
                  width: { xs: "96%", sm: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                  marginTop: 3,
                }}
                variant="outlined"
              >
                {" "}
                <InputLabel
                  sx={{
                    top: -6,
                  }}
                  id="outlined-adornment-roleId"
                >
                  Role
                </InputLabel>
                <Select
                  name="roleId"
                  id="outlined-adornment-roleId"
                  labelId="outlined-adornment-roleId"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  {roles?.map((roleId) => (
                    <MenuItem
                      sx={{
                        color: "black",
                        ...(true && {
                          bgcolor: (theme) =>
                            alpha(
                              theme.palette.info.contrastText,
                              theme.palette.action.activatedOpacity
                            ),
                        }),
                        fontFamily: "sans-serif",
                      }}
                      key={roleId?.id}
                      value={roleId?.id}
                    >
                      {roleId?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: { xs: "96%", sm: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                  marginTop: 3,
                }}
                variant="outlined"
              >
                {" "}
                <InputLabel
                  sx={{
                    top: -6,
                  }}
                  id="outlined-gender"
                >
                  Gender
                </InputLabel>
                <Select
                  name="gender"
                  id="outlined-gender"
                  labelId="outlined-gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  {genders.map((gender) => (
                    <MenuItem
                      sx={{
                        color: "black",
                        ...(true && {
                          bgcolor: (theme) =>
                            alpha(
                              theme.palette.info.contrastText,
                              theme.palette.action.activatedOpacity
                            ),
                        }),
                        fontFamily: "sans-serif",
                      }}
                      key={gender.id}
                      value={gender.id}
                    >
                      {gender.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {<DropzoneComponent setPreview={setPreview} />}
            </Paper>
            <div style={{ textAlign: "right" }}>
              <LoadingButton
                type="submit"
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  m: 0.5,
                  p: 1,
                  color: "black",
                }}
                variant="contained"
              >
                Save
              </LoadingButton>
            </div>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

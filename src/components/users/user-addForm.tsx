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

interface profileProps {
  ID: number;
  user: any;
  getUser: (id: number) => void;
}
const roles = [
  { id: 0, name: "Admin" },
  { id: 1, name: "User" },
];
const genders = [
  { id: 0, name: "Male" },
  { id: 1, name: "Female" },
];
export const UserForm: FC<profileProps> = (props) => {
  const { ID, user, getUser } = props;
  const [preview, setPreview] = useState<null | string>(null);
  const [userData, setUserData] = useState<any>({
    fullName: user?.fullName,
    job: user?.job,
    id: user?.sign[0],
    gender: user?.gender,
    role: user?.role,
    bod: moment.unix(parseInt(user?.bod?._hex)).format("L"),
    image: preview,
  });

  // const getProfile = async (id: number) => {
  //   if (contract) {
  //     try {
  //       const result = await contract?.call("logIN", [
  //         Number(values._id),
  //         values.pass,
  //       ]);

  //       } else toast.error("user not found");
  //     } catch (err: any) {
  //       toast.error(err.message || "user not found");
  //       console.log("error", error);
  //       setLoading(isLoading);
  //     }
  //   }
  // };
  const flattenObject = (ob: any) => {
    let toReturn: any = {};
    for (let i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      if (typeof ob[i] == "object" && ob[i] !== null) {
        let flatObject = flattenObject(ob[i]);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          toReturn[i + "." + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };
  useEffect(() => {
    setUserData({
      fullName: user?.fullName,
      id: user?.sign[0],
      job: user?.job,
      gender: user?.gender,
      role: user?.role,
      bod: moment.unix(parseInt(user?.bod?._hex)).format("L"),
      image: preview,
    });
    (async () => {
      const img = await downloadFile(user?.info?.image);
      console.log(img.url);
      formik.setValues({ ...formik.values, image: img.url });
      setPreview(formik.values.image);
      console.log(preview);
    })();
  }, [user, preview]);

  const formik = useFormik({
    initialValues: {
      ...userData,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      // Username: yup.string().max(255).required("UsernameIsRequired"),
      // role: yup.string().max(255).required("roleIsRequired"),
      // phone_number: yup
      //   .string()
      //   .min(11, "phoneNumberLengthMessage")
      //   .max(11, "phoneNumberLengthMessage")
      //   .required("phoneNumberIsRequired"),
      // password: yup.string().min(6).max(255),
    }),
    onSubmit: async (values) => {
      // const flattened = flattenObject(formik.initialValues);
      // //only get the modified values to not accidentally edit old ones.
      // let resultObject: any = {};
      // Object.entries(flattened)?.map((entry) => {
      //   const [key, oldVal] = entry;
      //   const newVal = get(values, key);
      //   if (newVal !== oldVal) {
      //     set(resultObject, key, newVal);
      //   }
      // });
      // const { success } = await updateUser(row.id, resultObject);
      // if (success) {
      //   // setOpen(false);
      // }
    },
  });

  // const updateUser = async (values: any): Promise<{ success: boolean }> => {
  //   const load = toast.loading("update");
  //   try {
  //     const resp = await userApi.updateUser(id, values);
  //     if (resp.success) {
  //       getUser(id);
  //       toast.dismiss(load);
  //       toast.success("updated");
  //       return { success: true };
  //     } else {
  //       toast.dismiss(load);
  //       toast.error("updateFailed");
  //       return { success: false };
  //     }
  //   } catch (err: any) {
  //     toast.dismiss(load);
  //     toast.error(err.message || "updatesFailed");
  //     return { success: false };
  //   }
  // };

  useEffect(() => {
    console.log("user", user);
    console.log("formic", formik.values);
  }, [formik.values]);
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
            <Typography variant="h4" sx={{ textAlign: "left" }}>
              Personal Information
            </Typography>
            <Paper
              elevation={12}
              sx={{
                m: 1,
                p: 2,
                minHeight: "280px",
                ...(true && {
                  bgcolor: (theme) =>
                    alpha(theme.palette.info.contrastText, 0.5),
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
                  width: { xs: "96%" },
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

              <FormControl
                sx={{
                  width: { xs: "47.5%" },
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
                  width: { xs: "47.5%" },
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

              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "47.5%" },
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
                type="text"
                onChange={formik.handleChange}
                value={formik.values.bod}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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

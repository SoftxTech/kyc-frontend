import { FC, useEffect } from "react";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  alpha,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useMounted } from "../../hooks/use-mounted";

interface profileProps {
  id?: number;
}
export const Profile: FC<profileProps> = (props) => {
  const { id } = props;
  const isMounted = useMounted();
  const [userData, setUserData] = useState<any>({
    id: 1,
    roleId: 1,
    username: "",
    firstName: "",
    lastName: "",
    city: "",
    gender: "",
    birthDate: "",
    departmentId: 1,
    email: "",
    zoomLink: "",
    phoneNumber: "",
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

  // const formik = useFormik({
  //   initialValues: {
  //     ...userData,
  //   },
  //   enableReinitialize: true,
  //   validationSchema: yup.object({
  //     username: yup.string().max(255).required("usernameIsRequired"),
  //     _id: yup.string().max(255).required("_idIsRequired"),
  //     role: yup.string().max(255).required("roleIsRequired"),
  //     phone_number: yup
  //       .string()
  //       .min(11, "phoneNumberLengthMessage")
  //       .max(11, "phoneNumberLengthMessage")
  //       .required("phoneNumberIsRequired"),
  //     password: yup.string().min(6).max(255),
  //   }),
  //   onSubmit: async (values) => {
  //     const flattened = flattenObject(formik.initialValues);
  //     //only get the modified values to not accidentally edit old ones.
  //     let resultObject: any = {};
  //     Object.entries(flattened)?.map((entry) => {
  //       const [key, oldVal] = entry;
  //       const newVal = get(values, key);
  //       if (newVal !== oldVal) {
  //         set(resultObject, key, newVal);
  //       }
  //     });
  //     const { success } = await updateProfile(row.id, resultObject);
  //     if (success) {
  //       // setOpen(false);
  //     }
  //   },
  // });

  // const updateProfile = async (values: any): Promise<{ success: boolean }> => {
  //   const load = toast.loading("update");
  //   try {
  //     const resp = await userApi.updateUser(id, values);
  //     if (resp.success) {
  //       getProfile(id);
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

  // useEffect(() => {
  //   getProfile(id);
  // }, [id]);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper
            elevation={12}
            sx={{
              m: 1,
              p: 2,
              minHeight: "280px",
              ...(true && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.info.contrastText,
                    theme.palette.action.activatedOpacity
                  ),
              }),
            }}
          >
            {/* <form onSubmit={formik.handleSubmit}>
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "100%", sm: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                // @ts-ignore
                helperText={formik.touched.username && formik.errors.username}
                label="username"
                margin="normal"
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
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
                  width: { xs: "100%", sm: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.email && formik.errors.email)}
                // @ts-ignore
                helperText={formik.touched.email && formik.errors.email}
                label="email"
                margin="normal"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />
              {userData?.roleId === 4 && (
                <TextField
                  size="small"
                  sx={{
                    width: { xs: "96%" },
                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                    mr: 1,
                  }}
                  error={Boolean(
                    formik.touched.zoomLink && formik.errors.zoomLink
                  )}
                  // @ts-ignore
                  helperText={formik.touched.zoomLink && formik.errors.zoomLink}
                  label="Zoom Link"
                  margin="normal"
                  id="zoomLink"
                  name="zoomLink"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.zoomLink}
                  InputProps={{
                    style: {
                      paddingLeft: "6px",
                      fontFamily: "sans-serif",
                    },
                  }}
                />
              )}
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "100%", sm: "47.5%", md: "31.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                // @ts-ignore
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                margin="normal"
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
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
                  width: { xs: "100%", sm: "47.5%", md: "31.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                // @ts-ignore
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                margin="normal"
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
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
                  width: { xs: "100%", sm: "47.5%", md: "31.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                )}
                // @ts-ignore
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                label="phoneNumber"
                margin="normal"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />
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
            </form> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

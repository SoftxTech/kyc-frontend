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

interface profileProps {
  ID: number;
  user: any;
  add?: boolean;
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
const ms = [
  { id: 0, name: "None" },
  { id: 1, name: "Done" },
  { id: 2, name: "In" },
];
export const Profile: FC<profileProps> = (props) => {
  const { ID, user, getUser } = props;
  const isMounted = useMounted();
  const theme = useTheme();
  const [userData, setUserData] = useState<any>({
    fullName: user?.fullName,
    job: user?.job,
    id: user?.sign[0],
    phone_number: user?.phone_number,
    gender: user?.gender,
    person_wallet_address: user?.person_wallet_address,
    // permission: user?.permission,
    role: user?.role,
    NID: parseInt(user?.NID?._hex),
    bod: moment.unix(parseInt(user?.bod?._hex)).format("L"),
    // info: {
    home_address: user?.info?.home_address,
    passport: user?.info?.passport,
    image: user?.info?.image,
    license_number: parseInt(user?.info[0]._hex),
    ms: user?.info[5],
    // },
    // sign: {
    Password: user?.sign[1],
    // }
    //edu:{
    degree: user?.edu[3],
    place: user?.edu[2],
    specialization: user?.edu[1],
    year: parseInt(user?.edu[0]._hex),
    //}
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
      phone_number: user?.phone_number,
      gender: user?.gender,
      person_wallet_address: user?.person_wallet_address,
      // permission: user?.permission,
      role: user?.role,
      NID: parseInt(user?.NID?._hex),
      bod: moment.unix(parseInt(user?.bod?._hex)).format("L"),
      // info: {
      home_address: user?.info?.home_address,
      passport: user?.info?.passport,
      image: user?.info?.image,
      license_number: parseInt(user?.info[0]._hex),
      ms: user?.info[5],
      // },
      // sign: {
      Password: user?.sign[1],
      // }
      //edu:{
      degree: user?.edu[3],
      place: user?.edu[2],
      specialization: user?.edu[1],
      year: parseInt(user?.edu[0]._hex),
      //}
    });
  }, [user]);
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(formik.values.image);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    // Get the first selected file
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Clean up the preview URL when the component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    console.log("user", user);
    console.log("formic", formik.values);
  }, []);
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
                  formik.touched.home_address && formik.errors.home_address
                )}
                // @ts-ignore
                helperText={
                  formik.touched.home_address && formik.errors.home_address
                }
                label="Address"
                margin="normal"
                id="home_address"
                name="home_address"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.home_address}
                InputProps={{
                  style: {
                    paddingLeft: "6px",
                    fontFamily: "sans-serif",
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
                error={Boolean(
                  formik.touched.passport && formik.errors.passport
                )}
                // @ts-ignore
                helperText={formik.touched.passport && formik.errors.passport}
                label="Passport"
                margin="normal"
                id="passport"
                name="passport"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.passport}
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
                error={Boolean(
                  formik.touched.phone_number && formik.errors.phone_number
                )}
                // @ts-ignore
                helperText={
                  formik.touched.phone_number && formik.errors.phone_number
                }
                label="Phone Number"
                margin="normal"
                id="phone_number"
                name="phone_number"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
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
                  Militry State
                </InputLabel>
                <Select
                  name="gender"
                  id="outlined-gender"
                  labelId="outlined-gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  {ms.map((ms) => (
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
                      key={ms.id}
                      value={ms.id}
                    >
                      {ms.name}
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
                type="date"
                onChange={formik.handleChange}
                value={formik.values.bod}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                {/* <Input type="file" accept="image/*" onChange={onSelectFile} /> */}
                {<img src={preview} alt="Uploaded preview" />}
              </div>
            </Paper>
            <Typography variant="h4" sx={{ textAlign: "left" }}>
              Education
            </Typography>
            <Paper
              elevation={12}
              sx={{
                m: 1,
                p: 2,
                minHeight: "180px",
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
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.year && formik.errors.year)}
                // @ts-ignore
                helperText={formik.touched.year && formik.errors.year}
                label="Year"
                margin="normal"
                id="year"
                name="year"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.year}
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
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(
                  formik.touched.specialization && formik.errors.specialization
                )}
                // @ts-ignore
                helperText={
                  formik.touched.specialization && formik.errors.specialization
                }
                label="Specialization"
                margin="normal"
                id="specialization"
                name="specialization"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.specialization}
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
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.place && formik.errors.place)}
                // @ts-ignore
                helperText={formik.touched.place && formik.errors.place}
                label="Place"
                margin="normal"
                id="place"
                name="place"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.place}
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
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.degree && formik.errors.degree)}
                // @ts-ignore
                helperText={formik.touched.degree && formik.errors.degree}
                label="Degree"
                margin="normal"
                id="degree"
                name="degree"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.degree}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />
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

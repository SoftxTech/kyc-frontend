/* eslint-disable @next/next/no-img-element */
import { FC, useCallback, useEffect } from "react";
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

const ImagePreview: React.CSSProperties = {
  display: "flex",
  maxWidth: "50%",
  maxHeight: "50%",
  margin: "auto",
  borderRadius: "50%",
};

interface profileProps {
  ID: number;
  user: any;
  getUser: (id: number) => void;
  contract: any;
  isLoading: any;
  error: any;
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
  const { ID, user, getUser, contract, isLoading, error } = props;
  const [preview, setPreview] = useState<null | string>("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>({
    Name: user?.fullName,
    id: user?.sign[0],
    Job: user?.job,
    phone_number: user?.phone_number,
    gender: user?.gender,
    person_wallet_address: user?.person_wallet_address,
    role: user?.role,
    NID: parseInt(user?.NID?._hex),
    bod: moment.unix(parseInt(user?.bod?._hex)).format("L"),
    // info: {
    Address: user?.info?.home_address,
    Passport: user?.info?.passport,
    image: preview,
    license_number: parseInt(user?.info[0]._hex),
    ms: user?.info[5],
    Password: user?.sign[1],
    degree: user?.edu[3],
    place: user?.edu[2],
    specialization: user?.edu[1],
    year: parseInt(user?.edu[0]._hex),
  });

  const update = async (event: any) => {
    if (event.key === "Enter") {
      console.log(event.target.name);
      if (contract) {
        try {
          await contract?.call(`edit${event.target.name}`, [
            ID,
            Number(formik.values.id),
            event.target.value,
          ]);
          await getUser(Number(formik.values.id));
          toast.success(`${event.target.name} updated`);
        } catch (err: any) {
          toast.error(err.message || "feild not found");
          setLoading(isLoading);
        }
      }
    }
  };
  const updateRole = async (event: any) => {
    if (contract) {
      try {
        const result = await contract?.call(`editRole`, [
          ID,
          Number(formik.values.id),
          event.target.value,
        ]);
        console.log("result", result);
      } catch (err: any) {
        toast.error(err.message || "feild not found");
        setLoading(isLoading);
      }
    }
  };
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

  const formik = useFormik({
    initialValues: {
      ...userData,
    },
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

  const getImage = async () => {
    const img = await downloadFile(user.info.image);
    formik.setValues({
      Name: user.fullName,
      id: user.sign[0],
      Job: user.job,
      phone_number: user.phone_number,
      gender: user.gender,
      person_wallet_address: user.person_wallet_address,
      role: user.role,
      NID: parseInt(user.NID?._hex),
      bod: moment.unix(parseInt(user.bod?._hex)).format("L"),
      // info: {
      Address: user.info?.home_address,
      Passport: user.info?.passport,
      license_number: parseInt(user.info[0]._hex),
      ms: user.info[5],
      // },
      // sign: {
      Password: user.sign[1],
      // }
      //edu:{
      degree: user.edu[3],
      place: user.edu[2],
      specialization: user.edu[1],
      year: parseInt(user.edu[0]._hex),
      image: img.url,
    });
  };

  useEffect(() => {
    getImage();
  }, [user]);
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
                    alpha(theme.palette.info.contrastText, 0.2),
                }),
              }}
            >
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    color: "black",
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.Name && formik.errors.Name)}
                // @ts-ignore
                helperText={formik.touched.Name && formik.errors.Name}
                label="Full Name"
                margin="normal"
                id="Name"
                name="Name"
                type="text"
                onKeyDown={update}
                onChange={formik.handleChange}
                value={formik.values.Name}
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    color: "black",
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.Job && formik.errors.Job)}
                // @ts-ignore
                helperText={formik.touched.Job && formik.errors.Job}
                label="Job"
                margin="normal"
                id="Job"
                name="Job"
                type="text"
                onChange={formik.handleChange}
                onKeyDown={update}
                value={formik.values.Job}
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    color: "black",
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
                disabled
                type="text"
                onChange={formik.handleChange}
                value={formik.values.id}
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    color: "black",
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(formik.touched.Address && formik.errors.Address)}
                // @ts-ignore
                helperText={formik.touched.Address && formik.errors.Address}
                label="Address"
                margin="normal"
                id="Address"
                name="Address"
                type="text"
                onKeyDown={update}
                onChange={formik.handleChange}
                value={formik.values.Address}
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    color: "black",
                    height: 40,
                  },
                  mr: 1,
                }}
                error={Boolean(
                  formik.touched.Passport && formik.errors.Passport
                )}
                // @ts-ignore
                helperText={formik.touched.Passport && formik.errors.Passport}
                label="Passport"
                margin="normal"
                id="Passport"
                name="Passport"
                type="text"
                onKeyDown={update}
                onChange={formik.handleChange}
                value={formik.values.Passport}
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%" },
                  "& .MuiInputBase-root": {
                    color: "black",
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
                // onKeyDown={update}
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <FormControl
                sx={{
                  width: { xs: "47.5%" },
                  backgroundColor: "white",
                  opacity: "0.9",
                  borderRadius: "10px",
                  "& .MuiInputBase-root": {
                    color: "black",
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
                  onSelect={updateRole}
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
                  backgroundColor: "white",
                  opacity: "0.9",
                  borderRadius: "10px",
                  "& .MuiInputBase-root": {
                    color: "black",
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
                  // onSelect={updateRole}
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
                  backgroundColor: "white",
                  opacity: "0.9",
                  borderRadius: "10px",
                  "& .MuiInputBase-root": {
                    color: "black",
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
                  name="ms"
                  id="outlined-ms"
                  labelId="outlined-ms"
                  // onSelect={updateRole}
                  value={formik.values.ms}
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
                    color: "black",
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
                disabled
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <img
                style={ImagePreview}
                src={formik.values.image}
                alt={"User image"}
              />
              <DropzoneComponent setPreview={setPreview} />
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
                    alpha(theme.palette.info.contrastText, 0.2),
                }),
              }}
            >
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    color: "black",
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
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    color: "black",
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
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    color: "black",
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
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "47.5%" },
                  "& .MuiInputBase-root": {
                    color: "black",
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
                InputLabelProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                    fontSize: "18px",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    backgroundColor: "white",
                    opacity: "0.9",
                    padding: "10px",
                  },
                }}
              />
            </Paper>
            <div style={{ textAlign: "right" }}>
              <LoadingButton
                type="submit"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "black",
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

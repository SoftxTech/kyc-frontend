/* eslint-disable @next/next/no-img-element */
import { FC, useEffect } from "react";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  alpha,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
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
import moment from "moment";
import { downloadFile } from "../../utils/ipfs";
import DropzoneComponent, { ImagePreview } from "../dropzone";

interface profileProps {
  ID: number;
  isProfile: boolean;
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
  const { ID, isProfile, user, getUser, contract, isLoading, error } = props;
  const [preview, setPreview] = useState<null | string>("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>({
    Name: user?.fullName,
    id: parseInt(user?.NID?._hex),
    Job: user?.job,
    phone_number: user?.phone_number,
    gender: user?.gender,
    person_wallet_address: user?.person_wallet_address,
    Role: user?.role,
    NID: parseInt(user?.NID?._hex),
    bod: moment.unix(parseInt(user?.bod?._hex)).format("L"),
    Address: user?.info?.home_address,
    Passport: user?.info?.passport,
    image: preview,
    license_number: parseInt(user?.info[0]._hex),
    ms: user?.info[5],
    password: user?.sign[1],
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
          toast.error(
            err.message ? "Transaction rejected" : "feild not updated"
          );
          setLoading(isLoading);
        }
      }
    }
  };
  const updatePhone = async (event: any) => {
    if (event.key === "Enter") {
      if (contract) {
        try {
          await contract?.call(`EditPhone`, [
            ID,
            Number(formik.values.id),
            event.target.value,
          ]);
          await getUser(Number(formik.values.id));
          toast.success(`Phone number updated`);
        } catch (err: any) {
          toast.error(err.message ? "Transaction rejected" : "feild not found");
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
        await getUser(Number(formik.values.id));
        toast.success(`${event.target.name} updated`);
      } catch (err: any) {
        toast.error(err.message ? "Transaction rejected" : "feild not updated");
        setLoading(isLoading);
      }
    }
  };
  const updateGender = async (event: any) => {
    if (contract) {
      try {
        const result = await contract?.call(`editGender`, [
          ID,
          Number(formik.values.id),
          event.target.value,
        ]);
        await getUser(Number(formik.values.id));
        toast.success(`${event.target.name} updated`);
      } catch (err: any) {
        toast.error(err.message ? "Transaction rejected" : "feild not updated");
        setLoading(isLoading);
      }
    }
  };
  const updateMilitaryStatus = async (event: any) => {
    if (contract) {
      try {
        const result = await contract?.call(`editMilitaryStatus`, [
          ID,
          Number(formik.values.id),
          event.target.value,
        ]);
        await getUser(Number(formik.values.id));
        toast.success(`${event.target.name} updated`);
      } catch (err: any) {
        toast.error(err.message ? "Transaction rejected" : "feild not updated");
        setLoading(isLoading);
      }
    }
  };
  const updateImage = async (img: string) => {
    if (contract) {
      try {
        const result = await contract?.call(`setImage`, [
          ID,
          Number(formik.values.id),
          img,
        ]);
        await getUser(Number(formik.values.id));
        toast.success(`Image updated`);
      } catch (err: any) {
        toast.error(err.message ? "Transaction rejected" : "feild not updated");
        setLoading(isLoading);
      }
    }
  };
  const updatePassword = async (event: any) => {
    if (event.key === "Enter") {
      if (contract) {
        try {
          const result = await contract?.call(`EditLogin`, [
            ID,
            event.target.value,
          ]);
          await getUser(ID);
          toast.success(`Password updated`);
        } catch (err: any) {
          toast.error(
            err.message ? "Transaction rejected" : "feild not updated"
          );
          setLoading(isLoading);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      ...userData,
    },
    validationSchema: yup.object({
       phone_number: yup
         .string()
         .min(11, "phoneNumberLengthMessage")
         .max(11, "phoneNumberLengthMessage"),
      password: yup.string().min(6).max(255),
    }),
    onSubmit: async (values) => {
      if (contract) {
        try {
          const result = await contract?.call(`editEducation`, [
            ID,
            Number(formik.values.id),
            values.year,
            values.specialization,
            values.place,
            values.degree,
          ]);
          await getUser(Number(formik.values.id));
          toast.success(`Education updated`);
        } catch (err: any) {
          toast.error(
            err.message ? "Transaction rejected" : "feild not updated"
          );
          setLoading(isLoading);
        }
      }
    },
  });

  const getImage = async () => {
    const img = await downloadFile(user.info.image);
    formik.setValues({
      Name: user.fullName,
      id: parseInt(user.NID?._hex),
      Job: user.job,
      phone_number: user.phone_number,
      gender: user.gender,
      person_wallet_address: user.person_wallet_address,
      Role: user.role,
      NID: parseInt(user.NID?._hex),
      bod: moment.unix(parseInt(user.bod?._hex)).format("L"),
      // info: {
      Address: user.info?.home_address,
      Passport: user.info?.passport,
      license_number: parseInt(user.info[0]._hex),
      ms: user.info[5],
      password: user.sign[1],
      degree: user.edu[3],
      place: user.edu[2],
      specialization: user.edu[1],
      year: parseInt(user.edu[0]._hex),
      image: img.url,
    });
  };

  useEffect(() => {
    console.log(user);
    getImage();
  }, [user]);

  useEffect(() => {
    if (preview) updateImage(preview);
  }, [preview]);

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
                    alpha(theme.palette.info.contrastText, 0.57),
                }),
              }}
            >
              <img
                style={ImagePreview}
                src={formik.values.image}
                alt={"User image"}
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
                onKeyDown={updatePhone}
                onChange={formik.handleChange}
                value={formik.values.phone_number}
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
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />
              {isProfile && (
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
                    formik.touched.password && formik.errors.password
                  )}
                  // @ts-ignore
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  id="password"
                  name="password"
                  type="text"
                  onKeyDown={updatePassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  InputProps={{
                    style: {
                      fontFamily: "sans-serif",
                      color: "black",
                    },
                  }}
                />
              )}

              <FormControl
                sx={{
                  width: { xs: "96%", sm: "47.5%" },
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
                  id="outlined-adornment-Role"
                >
                  Role
                </InputLabel>
                <Select
                  name="Role"
                  id="outlined-adornment-Role"
                  labelId="outlined-adornment-Role"
                  value={formik.values.Role}
                  onChange={(event: any) => {
                    formik.handleChange(event);
                    updateRole(event);
                  }}
                >
                  {roles?.map((Role) => (
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
                      key={Role?.id}
                      value={Role?.id}
                    >
                      {Role?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: { xs: "96%", sm: "47.5%" },
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
                  value={formik.values.gender}
                  onChange={(event: any) => {
                    formik.handleChange(event);
                    updateGender(event);
                  }}
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
                  width: { xs: "96%", sm: "47.5%" },
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
                  value={formik.values.ms}
                  onChange={(event: any) => {
                    formik.handleChange(event);
                    updateMilitaryStatus(event);
                  }}
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
                  width: { xs: "96%", sm: "47.5%" },
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
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
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
                    alpha(theme.palette.info.contrastText, 0.57),
                }),
              }}
            >
              <TextField
                size="small"
                sx={{
                  mt: 3,
                  width: { xs: "96%", sm: "47.5%" },
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
                InputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    color: "black",
                  },
                }}
              />
              {/* only submit for Education */}
              <div style={{ textAlign: "right" }}>
                <LoadingButton
                  type="submit"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                    mt: 2,
                    mr: 1.5,
                    p: 1,
                    fontSize: "16px",
                    color: "black",
                  }}
                  variant="contained"
                >
                  Submit education
                </LoadingButton>
              </div>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

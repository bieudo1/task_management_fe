import React, { useState } from "react";
import { Button, Stack, Card, Alert, Box, IconButton, InputAdornment, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { postNewUser } from "./PersonnelSlice";
import { useDispatch, useSelector } from "react-redux";

import { FormProvider, FTextField, FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  position: Yup.string(),
  phone1: Yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  team: null,
  position: "Worker",
  phone1: "",
};

function NewUser({ handleCloseNewUser }) {
  const user0 = [{ value: null, label: "" }];
  const { teamOptions } = useSelector((state) => state.personnel);
  console.log(teamOptions);
  const teamList = user0.concat(teamOptions);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: { ...defaultValues, team: teamList[0].value },
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { name, email, password, phone1, position, team } = data;
    try {
      dispatch(postNewUser({ name, email, password, phone1, position, teamId: team }));
      handleCloseNewUser();
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.responseError && <Alert severity="error">{errors.responseError.message}</Alert>}
            <FTextField name="name" label="Full name" />
            <FTextField name="email" label="Email address" />
            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FSelect name="team" label="team" size="small" sx={{ width: 300 }}>
              {teamList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FSelect>
            <Box sx={{ display: "flex" }}>
              <FTextField name="phone1" label="phone1" />
            </Box>
          </Stack>
          <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: "10px" }}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Save
            </LoadingButton>
            <Button sx={{ m: "0 10px" }} onClick={() => handleCloseNewUser()}>
              Cancel
            </Button>
          </Box>
        </FormProvider>
      </Card>
    </Container>
  );
}

export default NewUser;

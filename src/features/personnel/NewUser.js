import React, { useState } from "react";
import {
  Button,
  Stack,Card,
  Alert,Box,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { postNewUser } from "./PersonnelSlice";
import { useDispatch, useSelector } from "react-redux";

import { FormProvider, FTextField,FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
    role: Yup.string(),
    team: Yup.string(),
    phone1: Yup.number(),
    phone2: Yup.number(),
});

const FILTER_ROLE  = [
  {value: "Manager", label:"Manager"},
  {value: "Worker", label:"Worker"},
];


const defaultValues = {
  name: "",
  email: "",
  password: "",
  team:"",
  role:"Manager",
  phone1:"",
  phone2:"",
};

function NewUser({handleCloseNewUser}) {
    const {teamOptions} = useSelector(
        (state) => state.personnel
      );
      console.log(teamOptions)
    const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {...defaultValues, team: teamOptions[0].value}
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { name, email, password,phone1,phone2,role,team } = data;
    if(!team) (team = teamOptions[0].value )
    console.log(phone1,phone2,role,team)
    try {
      dispatch(postNewUser({ name, email, password,phone1,phone2,role,team }));
      handleCloseNewUser()
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
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <FTextField name="name" label="Full name" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FSelect
          name="role"
          label= "role"
          size="small" sx={{ width: 300 }}
          >
          {FILTER_ROLE.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </FSelect>
        
        <FSelect
          name="team"
          label= "team"
          size="small" sx={{ width: 300 }}
          >
          {teamOptions.map((option) => (
          <option key={option.value} value={option.value} >
            {option.label}
            </option>
        ))}
        </FSelect>
          <Box sx = {{display: "flex"}}>
            <FTextField name="phone1" label="phone1" />
            <FTextField name="phone2" label="phone2" />
          </Box>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Create
          </LoadingButton>
        </Stack>
      </FormProvider>
        <Button onClick={() =>handleCloseNewUser()}>Cancel</Button>
        </Card>
    </Container>
  );
}

export default NewUser;

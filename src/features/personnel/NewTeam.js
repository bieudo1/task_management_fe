import React, { useState,useEffect } from "react";
import {
  Stack,
  Alert,
  Card,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch } from "react-redux";
import { FormProvider, FTextField,FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { postNewTeam } from "./PersonnelSlice";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});


const defaultValues = {
  name: "",
  manager: "",
};

function NewTeam({ handleCloseNewTeam,userNoTeam }) {

  userNoTeam = userNoTeam.map((user) =>({value: user._id,label: user.name}))

  const user0 = [{value:"",label:"",}]
    const dispatch = useDispatch();
  
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;


  const onSubmit = async (data) => {
    let { name,manager } = data;
    try {
      dispatch(postNewTeam({ name,manager }));
      handleCloseNewTeam()
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
          <FSelect
          name="manager"
          label= "manager"
          size="small" sx={{ width: 300 }}
          >
          {user0.concat(userNoTeam).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </FSelect>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
      </Card>
    </Container>
  );
}

export default NewTeam;

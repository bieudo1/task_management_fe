import React, { useState, useEffect } from "react";
import { List, Stack, Button, Alert, Card, Avatar, Grid, Typography, Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";

import { FormProvider, FTextField, FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { editTeam, postNewTeam } from "./PersonnelSlice";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

function EditTeam({ teamId, workerList, handleCloseEditTeam, userNoTeam }) {
  userNoTeam = userNoTeam.map((user) => ({ value: user._id, label: user.name, avatar: user?.avatarUrl }));
  const { teamsById } = useSelector((state) => state.personnel);
  const oldUser = teamId ? teamsById[teamId]?.workers.map((team) => ({ value: team._id, label: team.name, avatar: team?.avatarUrl })) : [];
  const userManager = [teamId ? { value: teamsById[teamId]?.manager._id, label: teamsById[teamId]?.manager.name } : { value: "", label: "" }];
  const user0 = [{ value: "", label: "" }];
  const [userValue, setUserValue] = useState(userNoTeam ? userNoTeam.map((us) => us.value) : []);
  const [managerValue, setManagerValue] = useState(userNoTeam ? userNoTeam.map((us) => us.value) : []);
  const [managerList, setManagerList] = useState(userManager.concat(userNoTeam));
  const [worker, setWorker] = useState(oldUser ? oldUser.map((user) => user.value) : []);
  const [selectedUser, setSelectedUser] = useState(oldUser);
  const [workerOption, setWorkerOption] = useState(userNoTeam ? userNoTeam : []);
  const dispatch = useDispatch();

  const defaultValues = {
    name: teamsById[teamId]?.name || "",
    manager: teamsById[teamId]?.manager._id || "",
    workers: null,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const handleDeleteSelect = (id) => {
    setWorker(worker.filter((a) => a !== id));
    setWorkerOption([...workerOption, ...selectedUser.filter((u) => u.value === id)]);
    setManagerList([...managerList, ...selectedUser.filter((u) => u.value === id)]);
    setUserValue([...userValue, id]);
    setManagerValue([...managerValue, id]);
    setSelectedUser(selectedUser.filter((u) => u.value !== id));
  };
  const watchWorker = watch("workers");
  const watchManager = watch("manager");

  useEffect(() => {
    const value = managerValue.filter((u) => !userValue.includes(u));
    let workerOptionCopy = workerOption.filter((u) => u.value !== watchManager);
    setWorkerOption([...workerOptionCopy, ...managerList.filter((u) => u.value === value[0])]);
    setUserValue([...value, ...workerOptionCopy.map((u) => u.value)]);
  }, [watchManager]);

  useEffect(() => {
    setManagerValue(managerList.map((ma) => ma.value));
  }, []);

  useEffect(() => {
    setWorker([...worker, watchWorker]);
    setWorkerOption(workerOption.filter((u) => u.value !== watchWorker));
    setManagerList(managerList.filter((u) => u.value !== watchWorker));
    setSelectedUser([...selectedUser, ...workerOption.filter((u) => u.value === watchWorker)]);
  }, [watchWorker]);

  const onSubmit = async (data) => {
    let { name, manager } = data;
    const workers = worker.filter((wo) => wo !== null);
    try {
      teamId && dispatch(editTeam({ name, manager, workers, teamId }));
      !teamId && dispatch(postNewTeam({ name, manager }));
      handleCloseEditTeam();
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  console.log(teamId);
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && <Alert severity="error">{errors.responseError.message}</Alert>}
          <Grid container spacing={2} my={1}>
            <Grid item xs={12} md={teamId ? 5 : 12}>
              <FTextField name="name" label="Full name" sx={{ margin: "10px 0" }} />
              <FSelect name="manager" label="manager" size="small" sx={{ margin: "10px 0" }}>
                {managerList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              {teamId && (
                <FSelect name="workers" label="workers" size="small" sx={{ margin: "10px 0" }}>
                  {user0.concat(workerOption).map((user) => (
                    <option key={user.value} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </FSelect>
              )}
            </Grid>
            {teamId ? (
              <Grid item xs={12} md={7}>
                <Card sx={{ height: 226, overflowY: "auto", minWidth: "254px !important" }}>
                  {selectedUser.lenght !== 0 && (
                    <List sx={{ display: "flex", flexWrap: "wrap", overflowX: "auto", overflowY: "auto", height: "100%" }}>
                      {selectedUser.map((user) => (
                        <ListItem key={user.value} sx={{ justifyContent: "space-between" }}>
                          <Avatar alt={user.name} src={user.avatar} sx={{ width: 30, height: 30 }} />
                          <Typography>{user.label}</Typography>
                          <Button onClick={() => handleDeleteSelect(user.value)}>
                            <ClearIcon sx={{ width: "0.5em", height: "0.5em" }} />
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Card>
              </Grid>
            ) : null}
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Save
            </LoadingButton>
            <Button sx={{ m: "0 10px" }} onClick={() => handleCloseEditTeam()}>
              Cancel
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default EditTeam;

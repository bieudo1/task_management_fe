import React, { useState, useEffect } from "react";
import { Button, alpha, Stack, Card, Alert, Avatar, Grid, Typography, List, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ListItem from "@mui/material/ListItem";
import { editProject, newProject } from "./ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField, FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
});

function EditProject({ handleCloseEditProject, projectId }) {
  const user0 = [{ value: "", label: "" }];
  const { user } = useAuth();
  const { usersInTeam, projectsById } = useSelector((state) => state.project);
  let oldUser = [];
  projectId && projectsById[projectId].assignee.forEach((user) => (oldUser = [...oldUser, ...usersInTeam.filter((u) => u.value === user._id)]));
  const [assignee, setAssignee] = useState(oldUser.map((user) => user.value));
  const [users, setUsers] = useState(user0.concat(usersInTeam.filter((x) => !oldUser.includes(x))));
  const [selectedUser, setSelectedUser] = useState(oldUser);
  const defaultValues = {
    name: projectsById[projectId]?.name || "",
    description: projectsById[projectId]?.description || "",
    member: null,
  };

  const handleDeleteSelect = (id) => {
    setAssignee(assignee.filter((a) => a !== id));
    setUsers([...users, ...selectedUser.filter((u) => u.value === id)]);
    setSelectedUser(selectedUser.filter((u) => u.value !== id));
  };
  const dispatch = useDispatch();

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

  const watchMember = watch("member");

  useEffect(() => {
    setAssignee([...assignee, watchMember]);
    setUsers(users.filter((u) => u.value !== watchMember));
    setSelectedUser([...selectedUser, ...users.filter((u) => u.value === watchMember)]);
  }, [watchMember]);
  const onSubmit = async (data) => {
    let { name, description } = data;
    const treatmentAssignee = assignee.filter((a) => a !== null);
    try {
      projectId && dispatch(editProject({ name, description, assignee: treatmentAssignee, projectId }));
      !projectId && dispatch(newProject({ name, description, teamId: user.team._id, assignee, status: "working" }));
      handleCloseEditProject();
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  console.log(selectedUser);
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && <Alert severity="error">{errors.responseError.message}</Alert>}
          <Grid container spacing={2} my={1}>
            <Grid item xs={12} md={5}>
              <FTextField name="name" label="Full name" sx={{ margin: "10px 0" }} />
              <FTextField
                name="description"
                multiline
                placeholder="Share what you are thinking here..."
                fullWidth
                rows={4}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                  margin: "10px 0",
                }}
              />

              <FSelect name="member" label="member" size="small" sx={{ margin: "10px 0" }} fullWidth>
                {users.map((user) => (
                  <option key={user.value} value={user.value}>
                    {user.label}
                  </option>
                ))}
              </FSelect>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card sx={{ height: 272, overflowY: "auto", minWidth: "254px !important" }}>
                {selectedUser.lenght !== 0 && (
                  <List sx={{ display: "flex", flexWrap: "wrap", overflowX: "auto", overflowY: "auto", height: "100%" }}>
                    {selectedUser.map((user) => (
                      <ListItem key={user.value} sx={{ justifyContent: "space-between" }}>
                        <Avatar alt={user.name} src={user?.avatar} sx={{ width: 30, height: 30 }} />
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
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Save
            </LoadingButton>
            <Button sx={{ m: "0 10px" }} onClick={() => handleCloseEditProject()}>
              Cancel
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default EditProject;

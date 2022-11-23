import React, { useState,useEffect } from "react";
import {
  Button,alpha,
  Stack,Card,
  Alert,
  Container,List,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ListItem from '@mui/material/ListItem';
import {  editProject } from "./ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField,FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from '@mui/icons-material/Clear';
import * as Yup from "yup";


const RegisterSchema = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string(),
});




function EditProject({handleCloseEditProject,projectId}) {

  const user0 = [{value:"",label:"",}]
  const {usersInTeam,projectsById} = useSelector(state=>state.project)


    let oldUser = []
    projectsById[projectId].assignee.forEach(user => 
      oldUser= [...oldUser, ...usersInTeam.filter(u => u.value === user._id)]
    )       
    const [assignee, setAssignee] = useState(oldUser.map(user => user.value))
    const [users, setUsers] = useState(user0.concat(usersInTeam.filter(x => !oldUser.includes(x))))
    const [selectedUser, setSelectedUser] = useState(oldUser)
      console.log(assignee.filter(a=> a !== null))

    const defaultValues = {
      name: projectsById[projectId].name,
      description:projectsById[projectId].description,
      member:null
    };

    const handleDeleteSelect = (id) => {
      setAssignee(assignee.filter(a => a !== id))
      setUsers([...users, ...selectedUser.filter(u => u.value === id)])
      setSelectedUser(selectedUser.filter(u => u.value !== id))
    }
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
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
    setAssignee([...assignee, watchMember])
    setUsers(users.filter(u=> u.value !== watchMember))
    setSelectedUser( [ ...selectedUser, ...users.filter(u=> u.value === watchMember)])

  }, [watchMember]);
  const onSubmit = async (data) => {
    let { name,description } = data;
     const treatmentAssignee = assignee.filter(a=> a !== null)
    try {
      dispatch(editProject({ name,description,assignee:treatmentAssignee, projectId}));
      handleCloseEditProject()
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
            }}/>

              <FSelect 
                name="member" 
                label= "member"
                size="small" 
                fullWidth
                >
                {users.map(user=>(
                  <option key={user.value} value={user.value}>{user.label}</option>
                ))}
              </FSelect>
              {(selectedUser.lenght !== 0 )&& 
              <List sx ={{display: "flex",overflowX:"auto",overflowY:"auto"}}>
                {selectedUser.map( user => (
                <ListItem key= {user.value} >
                <p>{user.label}</p>
                <Button onClick={()=>handleDeleteSelect(user.value)}>
                  <ClearIcon sx = {{ width: "0.5em",height: "0.5em"}} />
                </Button>
              </ListItem>
                ))}
              </List>}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Create
          </LoadingButton>
        <Button onClick={() =>handleCloseEditProject()}>Cancel</Button>
        </Stack>
      </FormProvider>
        </Card>
    </Container>
  );
}

export default EditProject;

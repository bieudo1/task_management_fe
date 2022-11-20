import React, { useState,useEffect } from "react";
import {
  Button,alpha,
  Stack,Card,
  Alert,
  Container,List,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ListItem from '@mui/material/ListItem';
import {  newProject } from "./ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField,FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from '@mui/icons-material/Clear';
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";


const RegisterSchema = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string(),
});


const defaultValues = {
  name: "",
  description:"",
  member:null
};

function NewProject({handleCloseNewProject}) {

  const user0 = [{value:"",label:"",}]
  const {usersInTeam} = useSelector(state=>state.project)
    const [assignee, setAssignee] = useState([])
    const [users, setUsers] = useState(user0.concat(usersInTeam))
    const [selectedUser, setSelectedUser] = useState([])

  //   useEffect(()=>{
  //     setUsers(usersInTeam)
  // },[usersInTeam])

  const handleDeleteSelect = (id) => {
    setAssignee(assignee.filter(a => a !== id))
    setUsers([...users, ...selectedUser.filter(u => u.value === id)])
    setSelectedUser(selectedUser.filter(u => u.value !== id))
  }

    console.log(users)
    console.log(selectedUser)
 
  const { user } = useAuth();
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
  console.log(watchMember)
  useEffect(() => {
    setAssignee([...assignee, watchMember])
    setUsers(users.filter(u=> u.value !== watchMember))
    setSelectedUser( [ ...selectedUser, ...users.filter(u=> u.value === watchMember)])
    console.log(watchMember)
  }, [watchMember]);
  console.log(selectedUser)
  const onSubmit = async (data) => {
    let { name,description } = data;
      assignee.shift()
      console.log(assignee)
    try {
      dispatch(newProject({ name,description,teamId:user.team._id,assignee,status:"working" }));
      handleCloseNewProject()
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
                size="small" sx={{ width: 300 }}>
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
            sx={{marginRight: "10px"}}
            loading={isSubmitting}
          >
            Create
          </LoadingButton>
          <Button 
            type="submit"
            variant="contained" 
            onClick={() =>handleCloseNewProject()}>
              Cancel
          </Button>
        </Stack>
      </FormProvider>
        </Card>
    </Container>
  );
}

export default NewProject;

import React, { useState,useEffect } from "react";
import {
  List,
  Stack,
  Button,
  Alert,
  Card,
  Container,
} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ClearIcon from '@mui/icons-material/Clear';
import { LoadingButton } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";

import { FormProvider, FTextField,FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { editTeam } from "./PersonnelSlice";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});




function EditTeam({ teamId,workerList,handleCloseEditTeam,userNoTeam }) {

  userNoTeam = userNoTeam.map((user) =>({value: user._id,label: user.name}))

  const {teamsById} = useSelector(
    (state) => state.personnel,
  );

  const oldUser = teamsById[teamId].workers.map((team) =>({value: team._id,label: team.name}))
  
    const userManager =[{value:teamsById[teamId].manager._id,label:teamsById[teamId].manager.name}]
    const user0 = [{value:"",label:"",}]
    const [userValue, setUserValue] = useState(userNoTeam.map(us => us.value))
    const [managerValue,setManagerValue] = useState(userNoTeam.map(us => us.value))
    const [managerList,setManagerList] = useState(userManager.concat(userNoTeam))
    const [worker, setWorker] = useState(oldUser.map(user => user.value))
    const [selectedUser, setSelectedUser] = useState(oldUser)
    const [workerOption, setWorkerOption] = useState(userNoTeam)
    const dispatch = useDispatch();
    
 
    const defaultValues = {
      name: teamsById[teamId].name,
      manager: teamsById[teamId].manager._id,
      workers: null,
    };

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

  const handleDeleteSelect = (id) => {
    setWorker(worker.filter(a => a !== id))
    setWorkerOption([...workerOption, ...selectedUser.filter(u => u.value === id)])
    setManagerList([...managerList,...selectedUser.filter(u => u.value === id)])
    setUserValue([...userValue,id])
    setManagerValue([...managerValue,id])
    setSelectedUser(selectedUser.filter(u => u.value !== id))
  }

  const watchWorker = watch("workers"); 

  const watchManager = watch("manager")
//selectedUser

  useEffect(()=>{
    console.log(watchManager)
    const value = managerValue.filter(u => !userValue.includes(u))
    console.log(value)
    let workerOptionCopy = workerOption.filter(u=> u.value !== watchManager)
    console.log(workerOptionCopy)
    setWorkerOption([...workerOptionCopy,...managerList.filter( u => u.value === value[0])])
    setUserValue([...value,...workerOptionCopy.map(u => u.value)])
  },[watchManager])

  useEffect(() => {
    setManagerValue(managerList.map(ma => ma.value))
  },[])

  useEffect(() => {
    setWorker([...worker, watchWorker])
    setWorkerOption(workerOption.filter(u=> u.value !== watchWorker))
    setManagerList(managerList.filter(u=> u.value !== watchWorker))
    setSelectedUser( [ ...selectedUser, ...workerOption.filter(u=> u.value === watchWorker)])
  }, [watchWorker]);


  const onSubmit = async (data) => {
    let { name,manager} = data;
   const workers = worker.filter(wo => wo !== null)
  //  console.log(name,manager,workers)
    try {
      dispatch(editTeam({ name,manager,workers,teamId }));
      handleCloseEditTeam()
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
          {managerList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </FSelect>
              <FSelect 
                name="workers" 
                label= "workers"
                size="small" sx={{ width: 300 }}>
                {user0.concat(workerOption).map(user=>(
                  <option key={user.value} value={user.value}>{user.label}</option>
                ))}
              </FSelect>
              {(selectedUser.lenght !== 0 )&& 
              <List sx ={{display: "flex",overflowX:"auto",overflowY:"auto",}}>
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
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
      </Card>
    </Container>
  );
}

export default EditTeam;

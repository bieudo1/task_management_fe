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
  workers: null,
};

function NewTeam({ workerList, managerList,handleCloseNewTeam }) {
  const user0 = [{value:"",label:"",}]
    const [workers, setWorkers] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [workerOption, setWorkerOption] = useState(user0.concat(workerList))
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

  const handleDeleteSelect = (id) => {
    setWorkers(workers.filter(a => a !== id))
    setWorkerOption([...workerOption, ...selectedUser.filter(u => u.value === id)])
    setSelectedUser(selectedUser.filter(u => u.value !== id))
  }

  const watchWorker = watch("workers"); 
  console.log(watchWorker)

  useEffect(() => {
    setWorkers([...workers, watchWorker])
    setWorkerOption(workerOption.filter(u=> u.value !== watchWorker))
    setSelectedUser( [ ...selectedUser, ...workerOption.filter(u=> u.value === watchWorker)])
    console.log(watchWorker)
  }, [watchWorker]);

  const onSubmit = async (data) => {
    let { name,manager } = data;
    workers.shift()
    try {
      dispatch(postNewTeam({ name,manager,workers }));
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
          {user0.concat(managerList).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </FSelect>
              <FSelect 
                name="workers" 
                label= "workers"
                size="small" sx={{ width: 300 }}>
                {workerOption.map(user=>(
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
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
      </Card>
    </Container>
  );
}

export default NewTeam;
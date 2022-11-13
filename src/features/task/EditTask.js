import React,{useEffect} from "react";
import { Box, Card,Button, alpha, Stack,TextField } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

import { FormProvider,FCheckbox, FTextField,FSelect } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { editTask } from "./TaskSlice";
import { getTaskInProject } from "./TaskSlice";


const yupSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
});


function EditTask({taskId,assignee,handleCloseEditTask,projectId}) {
  const { isLoading,tasksById } = useSelector(
    (state) => state.task
  );
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(tasksById[taskId].dueAt,);                       ;
  console.log(assignee)
  


  const handleChange = (newValue) => {
    setValue(moment(newValue.$d).format("YYYY-MM-DD"));
  };
  const defaultValues = {
    name: tasksById[taskId].name,
    assignee:tasksById[taskId].assignee,
    important:tasksById[taskId].important,
    urgent:tasksById[taskId].urgent,
    taskId:taskId
  };

  

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { name, assignee,important,urgent } = data;
    try {
      dispatch(editTask({ name, assignee, dueAt:value,important,urgent,taskId }));
      handleCloseEditTask()
      console.log(data,taskId)
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="name"
            multiline
            fullWidth
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <FSelect 
                name="assignee" 
                label= "assignee"
                size="small" sx={{ width: 300 }}>
                {assignee.map(user=>(
                  <option key={user.value} value={user.value}>{user.label}</option>
                ))}
              </FSelect>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <FCheckbox
                name="important"
                label="important"
                sx={{ width: 1 }}
              /> 
              <FCheckbox
                name="urgent"
                label="urgent"
                sx={{ width: 1 }}
              />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              All Task
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
      <Button onClick={() =>handleCloseEditTask()}>Cancel</Button>
    </Card>
  );
}

export default EditTask;

import React from "react";
import { Avatar, Box, Card, Typography, Link,Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useDispatch} from "react-redux";
import useAuth from "../../hooks/useAuth";
import { activeItem } from '../../app/menu';


function ProjectCard({ project,handleOpenRemoveProjects,handleOpenEditProject }) {
  const { user } = useAuth();

    const { _id: targetProjectId,assigner,assignee,name,description } = project;
    const dispatch = useDispatch();
    const handleClickLink = (e,openItem) => {
      dispatch(activeItem({openItem,targetProjectId}))
    }
   
    return (
      <Card sx={{ display: "flex", alignItems: "center", p: 2 , position: "relative",
    }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 ,
          }}>
          <Box 
          variant="h4"
          >
            <Link
              variant="h4"
              sx={{ fontWeight: 600, }}
              onClick = {(event) => handleClickLink(event,"SingleProject")}
              component={RouterLink}
              to={`/Projects/${targetProjectId}`}
            >
              <Typography
                sx ={{fontSize: "2rem" }}
              >
                {name}
              </Typography>
            </Link>
            <Box sx ={{
              position: "absolute",
              bottom: "78%",
              left: "82%",
              display: "flex",
              flexDirection: "column"
              }}>
              {user.position !== "Worker" && 
              
              <Box>
              <Button onClick={() => handleOpenRemoveProjects(targetProjectId)}>
                <DeleteIcon sx ={{ width: "0.7em",height: "0.7em"}}/>
              </Button>

              <Button onClick={() => handleOpenEditProject(targetProjectId)}>
                <EditIcon sx ={{ width: "0.7em",height: "0.7em"}}/>
              </Button>
              </Box>
              }
            </Box>
          </Box>
          <Box >
            <Typography variant="body2" sx={{ color: "text.secondary",  margin: "22px 0 16px 6px",fontSize: "1rem" }} noWrap>
                {description}
              </Typography>
              <Box sx = {{ mb: 2}}>
              <Typography variant="body2" sx={{fontWeight: 600, color: "#1f1f1f", fontSize: "1rem"}} noWrap>
                Project Leader :
              </Typography>
                  <Avatar  src={assigner.avatarUrl} alt={assigner.name}  sx={{width:26,height:26, ml:2,mt:1}}/>
              </Box>
              <Box x = {{ mb: 2}}>
              <Typography variant="body2" sx={{fontWeight: 600, color: "#1f1f1f" ,fontSize: "1rem"}} noWrap>
              team :
              </Typography>
              { (assignee.length === 0) ? (
                  <Box sx = {{height:30,m:1}}></Box>
              ):(
              <>
                <AvatarGroup sx = {{justifyContent: "flex-end",ml:2,mt:1}} max = {4}>
                  {assignee.map((value,index) => {
                      return (
                        <Avatar
                          key = {index}
                          alt={value.name}
                          src={value.avatarUrl}
                          sx = {{width:26,height:26, }}
                        />
                      );
                  })}
                </AvatarGroup>
              </>)}
              </Box>
            </Box>
        </Box>
      </Card>
    );
  }
  
  export default ProjectCard;
  
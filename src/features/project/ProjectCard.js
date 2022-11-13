import React from "react";
import { Avatar, Box, Card, Typography, Link,Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fDate } from "../../utils/formatTime";
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItem from '@mui/material/ListItem';
import { useDispatch} from "react-redux";
import { activeItem } from '../../app/menu';


function ProjectCard({ project,handleOpenRemoveProjects,handleOpenEditProject }) {
    const { _id: targetProjectId,assigner,assignee,name, due,description } = project;
    const dispatch = useDispatch();
    const handleClickLink = (e,openItem) => {
      dispatch(activeItem({openItem,targetProjectId}))
    }
    
    return (
      <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
        <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Link
          variant="subtitle2"
          sx={{ fontWeight: 600 }}
          onClick = {(event) => handleClickLink(event,"SingleProject")}
          component={RouterLink}
          to={`/Projects/${targetProjectId}`}
        >
          {name}
        </Link>
        <Box sx ={{
          position: "relative",
          top: "-26px",
          width: "30px",
          height: "30px",
          left: "78%"}}
        >
          <Button onClick={() => handleOpenRemoveProjects(targetProjectId)}>
            <DeleteIcon sx ={{ width: "0.7em",height: "0.7em"}}/>
          </Button>

          <Button onClick={() => handleOpenEditProject(targetProjectId)}>
            <EditIcon sx ={{ width: "0.7em",height: "0.7em"}}/>
          </Button>
        </Box>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {description}
            </Typography>
            <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              Project Leader :
            </Typography>
                <Avatar  src={assigner.imageUrl} alt={assigner.name}  sx={{width:24,height:24}}/>
            </Box>
            <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
             team :
             </Typography>
            { (!assignee) ? (
                <Typography>null</Typography>
             ):(
            <>
              <AvatarGroup sx = {{justifyContent: "flex-end"}} max = {4}>
                {assignee.map((value,index) => {
                    return (
                      <Avatar
                        key = {index}
                        alt={value.name}
                        src={value.imageUrl}
                        sx = {{width:24,height:24}}
                      />
                    );
                })}
              </AvatarGroup>
            </>)}
            </Box>
        </Box>
      </Card>
    );
  }
  
  export default ProjectCard;
  
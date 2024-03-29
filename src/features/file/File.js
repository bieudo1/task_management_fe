import React, { useEffect } from "react";
import { Typography, Link, List, Avatar, Box } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { getFiles } from "./FileSlice";
import LoadingScreen from "../../components/LoadingScreen";

function File({ projectId }) {
  const { currentPageFiles, filesById, isLoading } = useSelector((state) => state.file);

  const files = currentPageFiles.map((fileId) => filesById[fileId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles({ projectId }));
  }, [dispatch, projectId]);

  return (
    <>
      {isLoading || !files ? (
        <LoadingScreen />
      ) : (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {files.map((file) => (
            <ListItem key={file._id}>
              <ListItemAvatar sx={{ display: "flex", alignItems: "center" }}>
                <Avatar>
                  <InsertDriveFileRoundedIcon />
                </Avatar>
                <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                  <Link
                    variant="subtitle2"
                    sx={{ fontWeight: 600 }}
                    // component={RouterLink}
                    // to={`${file.FileUrl}`}
                  >
                    <Typography>{file.FileUrl}</Typography>
                  </Link>
                  <Typography>{file.author.name}</Typography>
                  <Typography>{fDate(file.updatedAt)}</Typography>
                </Box>
              </ListItemAvatar>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default File;

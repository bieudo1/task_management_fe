import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function SearchInput({ handleSubmit,type }) {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`?${type}=${searchQuery}`)
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Search by name"
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="search by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;

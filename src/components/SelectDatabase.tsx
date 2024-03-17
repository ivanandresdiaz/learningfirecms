import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";

const SelectDatabase = () => {
  const [databaseId, setDatabaseId] = useLocalStorage(
    "databaseId",
    "(default)"
  ); // To work with Multiple database
  const handleChange = (event: SelectChangeEvent) => {
    setDatabaseId(event.target.value as string);
    window.location.reload();
  };
  const databases = [
    "(default)",
    "prueba",
    "extrabase",
    "pruebados",
    "pruebatres",
    "test2",
  ];
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Database</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={databaseId}
        label="DatabaseId"
        onChange={handleChange}
      >
        {databases.map((database) => {
          return <MenuItem value={database}>{database}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default SelectDatabase;

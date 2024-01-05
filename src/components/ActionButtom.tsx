import { Button } from "@mui/material";
import React, { useEffect } from "react";

const ActionButtom = () => {
  useEffect(() => {
    console.log("ActionButtom FETCH ");
  }, []);
  return (
    <div>
      <button>Custom Action</button>
      <Button>Hxjkasd</Button>
    </div>
  );
};

export default ActionButtom;

import { Box, CircularProgress, Dialog, DialogContent } from "@mui/material";
import React, { FunctionComponent } from "react";

export const Loading: FunctionComponent = () => {
  return (
    <Dialog
      disableEnforceFocus
      open={true}
      id="tool_loading"
      sx={{ pointerEvents: "none" }}
    >
      <DialogContent sx={{ pointerEvents: "none" }}>
        <Box className="w-96 flex">
          <CircularProgress className="m-auto my-5" />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;

import { Button, Grid } from "@mui/material";
import React from "react";
import { IAuthor } from "../../../types/author.type";

type AuthorItemProps = {
  author: IAuthor;
  buttonText: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function AuthorItem({ author, buttonText, handleClick }: AuthorItemProps) {
  return (
    <Grid container className="mt-2.5">
      <Grid item className="w-48">
        {author.name}
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={handleClick}>
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AuthorItem;

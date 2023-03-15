import { Box } from "@mui/system";

import AuthorItem from "./AuthorItem";

import { CH4 } from "../../../components/Title";
import React from "react";
import { IAuthor } from "../../../types/author.type";

type AuthorSectionProps = {
  currentAuthors: IAuthor[];
  handleAddAuthorClick: (id: string) => void;
  courseAuthors: IAuthor[];
  handleDeleteAuthorClick: (id: string) => void;
};

function AuthorSection({
  currentAuthors,
  handleAddAuthorClick,
  courseAuthors,
  handleDeleteAuthorClick,
}: AuthorSectionProps) {
  return (
    <Box>
      <CH4 text="Authors" />
      <div>
        {currentAuthors && currentAuthors.length ? (
          currentAuthors.map((author: IAuthor) => (
            <AuthorItem
              key={author.id}
              author={author}
              buttonText="add author"
              handleClick={() => handleAddAuthorClick(author.id)}
            />
          ))
        ) : (
          <span>Loading...</span>
        )}
      </div>
      <CH4 text="Course Authors" />
      <div>
        {courseAuthors && courseAuthors.length ? (
          courseAuthors.map((courseAuthor: IAuthor) => {
            return (
              <AuthorItem
                key={courseAuthor.id}
                author={courseAuthor}
                buttonText="delete author"
                handleClick={() => handleDeleteAuthorClick(courseAuthor.id)}
              />
            );
          })
        ) : (
          <span>Waiting...</span>
        )}
      </div>
    </Box>
  );
}

export default AuthorSection;

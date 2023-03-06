import { Box } from "@mui/system";

import { Author } from "../../../redux/slices/authorSlice";
import AuthorItem from "./AuthorItem";

import { CH4 } from "../../../common/Title";
import React from "react";

type AuthorSectionProps = {
  currentAuthors: Author[];
  handleAddAuthorClick: (id: string) => void;
  courseAuthors: Author[];
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
          currentAuthors.map((author: Author) => (
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
          courseAuthors.map((courseAuthor: Author) => {
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

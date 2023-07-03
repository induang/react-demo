import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValueGetterParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, TextField } from "@mui/material";
import { AUTHOR_QUERY, COURSE_QUERY } from "../../queries";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "../../services/course";
import { fetchAuthors } from "../../services/author";
import { Link } from "react-router-dom";

export default function () {
  const [selecteds, setSelecteds] = React.useState<GridRowSelectionModel>();

  const parseAuthorIdToName = (params: GridValueGetterParams) => {
    if (coursesQuery.isSuccess && authorsQuery.isSuccess) {
      const authors = authorsQuery.data.result;
      return params.row.authors.map(
        (id: string) => authors.find((author) => author.id === id)?.name
      );
    }
  };
  const handleSelected = (values: GridRowSelectionModel) => {
    setSelecteds(values);
  };
  const coursesQuery = useQuery({
    queryKey: [COURSE_QUERY],
    queryFn: fetchCourses,
  });

  const authorsQuery = useQuery({
    queryKey: [AUTHOR_QUERY],
    queryFn: fetchAuthors,
  });

  const columns: GridColDef[] = [
    { field: "title", headerName: "COURSE NAME", width: 250 },
    { field: "duration", headerName: "DURATION", width: 250 },
    { field: "creationDate", headerName: "PUBLISH DATE", width: 300 },
    {
      field: "authors",
      headerName: "AUTHORS",
      width: 250,
      valueGetter: parseAuthorIdToName,
    },
  ];

  return (
    // 需要设定容器高度，不然不显示
    <Box className="m-4 h-96">
      <Grid container className="justify-between mb-2">
        <Grid item>
          <TextField label="Name" size="small" variant="filled" />
        </Grid>
        <Grid item>
          <Button onClick={() => (window.location.href = "/courses/add")}>
            <AddIcon />
            Create
          </Button>
          <Button>
            <DeleteIcon />
            Delete
          </Button>
        </Grid>
      </Grid>
      {coursesQuery.data && (
        <DataGrid
          rows={coursesQuery.data.result}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(values) => handleSelected(values)}
          rowSelectionModel={selecteds}
        />
      )}
    </Box>
  );
}

/* 
------选择行为：------
	①记录选择id的状态：const [selecteds, setSelecteds] = React.useState<GridRowSelectionModel>();
	②组件上的三个属性： 
		checkboxSelection
		onRowSelectionModelChange={(values) => handleSelected(values)} values为被选中的id数组
		rowSelectionModel={selecteds}
	③更新selected状态：
	  const handleSelected = (values: GridRowSelectionModel) => {
    	setSelecteds(values);
  	};
*/

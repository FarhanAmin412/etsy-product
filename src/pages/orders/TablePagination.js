import React from "react";
import PageSelect from "./PageSelect";
import { useSelector } from "react-redux";
import { Stack, TablePagination } from "@mui/material";
import { isEmpty } from "lodash";

const Pagination = ({
  recent,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  currentPage,
  direction,
}) => {
  const ordersMetaData = useSelector((state) => state.orders.ordersMetaData);
  const totalPages = recent
    ? [1, 2]
    : !isEmpty(ordersMetaData)
    ? Array.from({ length: ordersMetaData?.last_page }, (_, i) => i + 1)
    : 1;

  return (
    <Stack direction="row" justifyContent={"flex-end"} alignItems={"center"}>
      <TablePagination
        rowsPerPageOptions={recent ? [5, 10] : [25, 50, 100]}
        component="div"
        count={
          recent ? 10 : !isEmpty(ordersMetaData) ? ordersMetaData?.total : 1
        }
        rowsPerPage={parseInt(rowsPerPage)}
        page={parseInt(page)}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton={false}
      />
      {totalPages?.length > 1 && (
        <PageSelect
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          direction={direction}
        />
      )}
    </Stack>
  );
};

export default Pagination;

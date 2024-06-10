import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMockupSections, getMockups } from "./request";
import { setModalState } from "src/redux/actions/modalActions";
import { StyledPaper, formatMockupData } from "./utils";
import Typography from "@mui/material/Typography";
import Iconify from "src/components/iconify/Iconify";
import AddMockup from "src/sections/modals/mockups/AddMockup";
import MockupsList from "./MockupsList";
import MockupURLs from "./MockupURLs";
import MockupDocs from "./MockupDocs";
import FilterDropdown from "src/components/filter-dropdown";
import { applySortFilter, getComparator } from "../users/helpers";

export default function Mockups() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const mockups = useSelector((state) => state.mockups.mockupList);
  const mockupsMeta = useSelector((state) => state.mockups.mockupsMeta);
  const sections = useSelector((state) => state.mockups.sections);

  const [filterOptions, setFilerOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(
    sections ? sections[0] : ""
  );
  const [formattedMockups, setFormattedMockups] = useState([]);
  const [sectionID, setSectionID] = useState(sections ? sections[0]?.id : 0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    getMockupSections(dispatch);
  }, []);

  useEffect(() => {
    setFormattedMockups(formatMockupData(mockups, currentPage, rowsPerPage));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockups]);

  useEffect(() => {
    if (sections) {
      let allSections = sections.map((item) => item.name);
      setFilerOptions(allSections);
      let id = sectionID ? sectionID : sections[0]?.id;
      getMockups(dispatch, id, currentPage + 1, rowsPerPage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionID, currentPage, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    setCurrentPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterByName = (event) => {
    setCurrentPage(0);
    setFilterName(event.target.value);
  };

  const filteredMockups = applySortFilter(
    formattedMockups,
    getComparator("asc", "id"),
    filterName
  );

  const isNotFound = !filteredMockups.length && !!filterName;

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
    let getSeletctedSection = sections?.filter(
      (item) => item.name === filterValue
    );

    setSectionID(getSeletctedSection[0]?.id);
    setCurrentPage(1);
  };

  const filterData = () => {
    if (selectedFilter === "Images") {
      return formattedMockups.map((section) => ({
        ...section,
        documents: [],
        urls: [],
      }));
    } else if (selectedFilter === "Documents") {
      return formattedMockups.map((section) => ({
        ...section,
        images: [],
        urls: [],
      }));
    } else if (selectedFilter === "URLs") {
      return formattedMockups.map((section) => ({
        ...section,
        documents: [],
        images: [],
      }));
    } else {
      return formattedMockups;
    }
  };
                                                                                                                          
  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap={"wrap"}
        sx={{ mb: 5 }}
      >
        <Typography variant="h4">Mockups</Typography>
        <Stack direction={"row"} spacing={3}>
          <FilterDropdown
            options={filterOptions}
            selectedOption={selectedFilter}
            onFilterChange={handleFilterChange}
          />
          {userType === "Super Admin" && (
            <Button
              variant={"contained"}
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => dispatch(setModalState(<AddMockup />))}
            >
              Add Mockup
            </Button>
          )}
        </Stack>
      </Stack>

      <Box>
        {filteredMockups?.length > 0 ? (
          filterData()?.map((mockup, index) => {
            return (
              <StyledPaper variant="outlined" sx={{ mb: 4, p: 3 }} key={index}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    textTransform: "capitalize",
                  }}
                >
                  {mockup.sectionName}
                </Typography>

                {mockup?.images?.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Images
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                      {mockup?.images?.map((item, index) => (
                        <Grid
                          key={item.id}
                          item
                          xs={8}
                          sm={4}
                          md={2}
                          sx={{ minWidth: "250px" }}
                        >
                          <MockupsList item={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {mockup?.urls?.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      URLs
                    </Typography>
                    {mockup?.urls?.map((urls, index) => (
                      <MockupURLs key={index} urls={urls} />
                    ))}
                  </Box>
                )}

                {mockup?.documents?.length > 0 && (
                  <>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Files
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                      {mockup?.documents?.map((docs, index) => (
                        <Grid
                          key={docs.id}
                          item
                          xs={8}
                          sm={4}
                          md={2.2}
                          sx={{ minWidth: "300px" }}
                        >
                          <MockupDocs docs={docs} index={index} />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
                <TablePagination
                  rowsPerPageOptions={[6, 10, 25]}
                  component="div"
                  count={mockupsMeta?.total}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/* <Stack spacing={2} justifyContent="center">
                  <Pagination
                    count={mockupsMeta?.last_page}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      "& .MuiPagination-ul": {
                        justifyContent: "flex-end",
                      },
                    }}
                  />
                </Stack> */}
              </StyledPaper>
            );
          })
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "50vh" }}
          >
            <Grid item xs={3}>
              There are no Mockups available.
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import supportIcon from "../../assets/icons/support_icon.png";
import Iconify from "src/components/iconify/Iconify";
import AddPost from "src/sections/modals/posts/AddPost";
import ImageViewPopup from "src/components/image-viewer";
import { deletePost, getPosts } from "./requests";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import { Markup } from "interweave";
import { format } from "date-fns";
import { StyledStack } from "../mockups/MockupDocs";
import { Edit } from "@mui/icons-material";
import EditPost from "src/sections/modals/posts/EditPost";
import DeletePost from "src/sections/modals/posts/DeletePost";

const Update = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts(dispatch, setPosts);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `FileName.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <Paper
      sx={{
        borderRadius: "15px",
        my: "40px",
      }}
      maxWidth={false}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap={"wrap"}
        sx={{ mb: 5 }}
      >
        <Typography variant="h4">Updates</Typography>
        {userType === "Super Admin" && (
          <Button
            variant={"contained"}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() =>
              dispatch(setModalState(<AddPost setPosts={setPosts} />))
            }
          >
            Add Update
          </Button>
        )}
      </Stack>

      {posts.length ? (
        posts?.map((item, index) => (
          <Card variant="outlined">
            <CardContent>
              <Stack
                direction={"row"}
                spacing={3}
                justifyContent={"space-between"}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  spacing={3}
                >
                  <Box>
                    <Avatar alt={"admin"} src={supportIcon} />
                  </Box>
                  <Typography variant="subtitle1">ICP Support</Typography>
                  <Box
                    sx={{
                      backgroundColor: "#DFE3E8",
                      borderRadius: "16px",
                      padding: "0px 8px",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption">
                      {format(new Date(item.created_at), "hh:mm aaa")}
                    </Typography>
                  </Box>
                </Stack>
                {userType === "Super Admin" ? (
                  <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    <Box>
                      <Edit
                        sx={{ cursor: "pointer", color: "#47A5E6" }}
                        onClick={() => {
                          dispatch(
                            setModalState(
                              <EditPost post={item} setPosts={setPosts} />
                            )
                          );
                        }}
                      />
                    </Box>
                    <Box>
                      <Iconify
                        icon={"eva:trash-2-outline"}
                        sx={{ cursor: "pointer" }}
                        color={"red"}
                        onClick={() =>
                          dispatch(
                            setModalState(
                              <DeletePost
                                deletePost={() =>
                                  deletePost(item.id, dispatch, setPosts)
                                }
                              />
                            )
                          )
                        }
                      />
                    </Box>
                  </Stack>
                ) : (
                  ""
                )}
              </Stack>

              <Box sx={{ my: 4 }}></Box>
              <Markup content={item?.content} />

              {item?.links ? (
                <>
                  <Typography variant="caption">
                    <b>Links attached:</b> <br />
                    <a href={item?.links}>{item?.links}</a>
                  </Typography>
                </>
              ) : (
                ""
              )}

              <Stack direction={"row"} spacing={3} flexWrap={"wrap"}>
                {item?.images ? (
                  <>
                    <Box sx={{ my: 4 }}></Box>
                    <ImageViewPopup
                      imageSRC={[item?.images]}
                      fileName={"post"}
                      sx={{ width: 300, height: 300 }}
                    />
                  </>
                ) : (
                  ""
                )}

                {item?.videos ? (
                  <>
                    <Box sx={{ my: 4 }}></Box>
                    <CardMedia
                      component="video"
                      controls
                      height="300"
                      src={item?.videos}
                      sx={{ width: "300px" }}
                      title="Video"
                    />
                  </>
                ) : (
                  ""
                )}
              </Stack>
              {item?.document ? (
                <>
                  <Box sx={{ my: 4 }}></Box>
                  <StyledStack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{ maxWidth: "300px" }}
                  >
                    <Stack direction={"row"} spacing={3}>
                      <Iconify
                        icon="teenyicons:text-document-solid"
                        color="primary.main"
                      />
                      <Typography variant="body2">Document</Typography>
                    </Stack>
                    <IconButton onClick={() => downloadFile(item?.document)}>
                      <Iconify color="primary.main" icon="bi:cloud-download" />
                    </IconButton>
                  </StyledStack>
                </>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "30vh" }}
          >
            <Grid item xs={3}>
              <Typography variant="h6" paragraph>
                There are no updates yet.
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </Paper>
  );
};

export default Update;

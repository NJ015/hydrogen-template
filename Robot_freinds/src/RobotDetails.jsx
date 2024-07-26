import React from "react";
import { useParams, Link } from "react-router-dom";
import "./RobotDetails.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Edit from "./EditUser";
import Delete from "./DeleteUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";

export default function RobotDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const users = useSelector((state) => state.users.users);
  // const user = users.find((u) => u.id === parseInt(id));

  // const { username } = useParams();
  // const users = useSelector((state) => state.users.users);
  // const user = users.find((u) => u.username === username);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteMsgOpen, setIsDeleteMsgOpen] = useState(false);

  ////////////////////////
  const [user, setUser2] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((u) => {
        const updatedUsers = {
          ...u,
          pic: `https://robohash.org/${u.username}`,
        };
        // dispatch(setUsers(updatedUsers));
        setUser2(updatedUsers);
      });
  }, [dispatch]);

  const handleDelete = () => {
    fetch(`http://localhost:3000/user/${user._id}`, {
      method: "DELETE",
    })
      .then(() => {
        setIsDeleteMsgOpen(false);
        window.location.href = "/";
      })
      .catch((err) => console.error(err));
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h6">User not found</Typography>
        <Link to="/">
          <Button variant="contained">Back</Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="robotDetails">
      <div className="icons">
        <Link to="/" className="backLink">
          <FontAwesomeIcon icon={faAngleLeft} className="icon backIcon" />
        </Link>
        <button className="editbutton" onClick={() => setIsEditFormOpen(true)}>
          <FontAwesomeIcon icon={faPen} className="icon editIcon" />
        </button>
        <button className="deleteicon" onClick={() => setIsDeleteMsgOpen(true)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <img src={user.pic} alt={`${user.name}'s picture`} />
      <h2>{user.name}</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Address:</strong> {user.address?.street}, {user.address?.city}
      </p>
      <p>
        <strong>Geo:</strong> Lat: {user.address?.geo?.lat}, Lng:{" "}
        {user.address?.geo?.lng}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <p>
        <strong>Company:</strong> {user.company?.name}
      </p>
      <p>
        <strong>Catch Phrase:</strong> {user.company?.catchPhrase}
      </p>
      <p>
        <strong>BS:</strong> {user.company?.bs}
      </p>
      {/* <Link to="/" className="backLink">
        Back
      </Link>
      <button className="editbutton" onClick={() => setIsEditFormOpen(true)}>Edit</button> */}
      {isEditFormOpen && (
        <Edit user={user} onClose={() => setIsEditFormOpen(false)} />
      )}
      {/* {isDeleteMsgOpen && (
        <Delete user={user} onClose={() => setIsDeleteMsgOpen(false)} />
      )} */}
      <Delete
        open={isDeleteMsgOpen}
        onClose={() => setIsDeleteMsgOpen(false)}
        onDelete={handleDelete}
        user={user}
      />

      {/* <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">This is a success Alert.</Alert>
        <Alert severity="info">This is an info Alert.</Alert>
        <Alert severity="warning">This is a warning Alert.</Alert>
        <Alert severity="error">This is an error Alert.</Alert>
      </Stack> */}
    </div>
  );

  // return (
  //   <Container maxWidth="md">
  //     <Box mt={4} mb={2} className="boxclass">
  //       <Box display="flex" alignItems="center" mb={2}>
  //         <Link to="/" className="backLink">
  //           <FontAwesomeIcon icon={faAngleLeft} className="icon backIcon" />
  //         </Link>
  //       </Box>
  //       <Grid container spacing={2} alignItems="center">
  //         <Grid item xs={12} sm={4}>
  //           <Avatar
  //             alt={`${user.name}'s picture`}
  //             src={user.pic}
  //             sx={{ width: 150, height: 150 }}
  //           />

  //           <Typography variant="h4" component="h2" ml={2}>
  //             {user.name}
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={12} sm={8}>
  //           <Typography variant="body1">
  //             <strong>Username:</strong> {user.username}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>Email:</strong> {user.email}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>Address:</strong> {user.address?.street},{" "}
  //             {user.address?.city}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>Geo:</strong> Lat: {user.address?.geo?.lat}, Lng:{" "}
  //             {user.address?.geo?.lng}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>Phone:</strong> {user.phone}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>Website:</strong> {user.website}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>Company:</strong> {user.company?.name}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>Catch Phrase:</strong> {user.company?.catchPhrase}
  //           </Typography>
  //           <Typography variant="body1">
  //             <strong>BS:</strong> {user.company?.bs}
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //       <Box mt={2} display="flex" justifyContent="space-between">
  //         <IconButton
  //           className="editbutton"
  //           onClick={() => setIsEditFormOpen(true)}
  //         >
  //           <FontAwesomeIcon icon={faPen} className="icon editIcon" />
  //         </IconButton>
  //         <IconButton
  //           className="deleteicon"
  //           onClick={() => setIsDeleteMsgOpen(true)}
  //         >
  //           <FontAwesomeIcon icon={faTrashCan} />
  //         </IconButton>
  //       </Box>
  //       {isEditFormOpen && (
  //         <Edit user={user} onClose={() => setIsEditFormOpen(false)} />
  //       )}
  //       {isDeleteMsgOpen && (
  //         <Delete user={user} onClose={() => setIsDeleteMsgOpen(false)} />
  //       )}
  //     </Box>
  //   </Container>
  // );
}

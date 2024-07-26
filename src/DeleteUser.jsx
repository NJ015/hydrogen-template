// import React from "react";

// const DeleteRobot = ({ user, onClose }) => {
//   const onDelete = () => {
//     fetch(`http://localhost:3000/user/${user._id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         onClose();

//         window.location.href = "/";
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="Form">
//       <div className="FormContent">
//         <h2>Delete User</h2>
//         <div className="addUserForm">
//           <p>Are you sure you want to delete robot {user.username}?</p>
//           <div className="deleteUserModal-buttons">
//             <div className="updatebuttons">
//               <button className="deleteUserModal-confirm" onClick={onDelete}>
//                 Yes
//               </button>
//               <button className="deleteUserModal-cancel" onClick={onClose}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteRobot;

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteRobotDialog = ({ open, onClose, onDelete, user }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete robot {user.username}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRobotDialog;

"use client";

import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";

import CloseIcon from "@mui/icons-material/Close";

import { deleteCat } from "@/actions/category";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { useRouter } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import { forwardRef } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  border: "1px solid #1e1e1e",
  boxShadow: 24,
  p: 4,
};

type Props = {
  deleteProduct: (id: string) => void;
  openModal?: boolean;
  label: React.ReactNode;
  disc: string;
  id: string;
  ModalTitle: string;
};

const DeleteModal = forwardRef(
  ({ deleteProduct, id, ModalTitle, openModal, label, disc }: Props, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    React.useImperativeHandle(ref, () => {
      return {
        handleClose: handleClose,
      };
    });
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
      openModal ? setOpen(true) : setOpen(false);
    }, [openModal]);

    /*   function deleteCategory() {
    React.startTransition(() => {
      deleteCat({ id: catId, accessToken }).then((data) => {
        console.log("data", data);
        if (data?.success === true) {
          HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
          handleClose();

          // router.push(`/dashboard/siteSettings/${callbackUrl}`);
        } else {
          HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
        }
      });
    });
  } */

    return (
      <Box className=" flex h-12 p-0">
        <Tooltip title={ModalTitle} placement="top">
          <IconButton
            onClick={handleOpen}
            color="warning"
            className=" flex w-5"
          >
            {label}
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
        >
          {/* <Fade in={open}> */}
          <Box sx={style}>
            <Typography
              className=" flex text-xs text-gray-700 dark:text-gray-200"
              id="modal-modal-title"
            >
              {disc}
            </Typography>
            <Typography
              className=" flex justify-between"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => deleteProduct(id)}
              >
                بله حذف شود
              </Button>
              <Button variant="contained" size="small" onClick={handleClose}>
                انصراف
              </Button>
            </Typography>
          </Box>
          {/* </Fade> */}
        </Modal>
      </Box>
    );
  }
);
DeleteModal.displayName = "DeleteModal";
export default DeleteModal;

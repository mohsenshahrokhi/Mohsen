"use client";

import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import {
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineTrash,
} from "react-icons/hi2";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import BasicModal from "@/components/ui/BasicModal";
import {
  forwardRef,
  startTransition,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { deleteCat } from "@/actions/category";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { deleteP } from "@/actions/product";
import { ModalProps } from "@/ZSchemas";
import DeleteModal from "@/components/ui/DeleteModal";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TUserSchema } from "@/ZSchemas/UserSchema";

type Props = {
  stringUsers: string;
  stringified: string;
  accessToken: string;
  rolesString: string;
};

export default function UserList({
  stringUsers,
  stringified,
  accessToken,
  rolesString,
}: Props) {
  const modalRef = useRef<ModalProps>(null);

  const users = JSON.parse(stringUsers) as TUserSchema[];
  const roles = JSON.parse(rolesString) as { name: string; values: string }[];

  function deleteUser(id: string) {
    startTransition(() => {
      deleteP({ id, accessToken }).then((data) => {
        console.log("data", data);
        if (data?.success === true) {
          modalRef.current?.handleClose();
          HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
        } else {
          HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
        }
      });
    });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>نام</TableCell>
              <TableCell>نام نمایشی</TableCell>
              <TableCell>تلفن همراه</TableCell>
              <TableCell>ایمیل</TableCell>
              <TableCell>سطح دسترسی</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>تأیید تلفن</TableCell>
              <TableCell>تأیید ایمیل</TableCell>
              <TableCell>عکس شناسه</TableCell>
              <TableCell>آدرس</TableCell>
              <TableCell>توضیحات</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child TableCell, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={`${
                          roles.filter(
                            (rol: { name: string; values: string }) =>
                              user.role === rol.values
                          )[0].name
                        }`}
                        color="success"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {user.active === true ? (
                        <Chip label="فعال" color="success" />
                      ) : (
                        <Chip label="غیر فعال" color="primary" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Stack direction="row" spacing={1}>
                      {user.verifyPhone === true ? (
                        <Chip label="فعال" color="success" />
                      ) : (
                        <Chip label="غیر فعال" color="primary" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Stack direction="row" spacing={1}>
                      {user.verifyMail === true ? (
                        <Chip label="فعال" color="success" />
                      ) : (
                        <Chip label="غیر فعال" color="primary" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell>
                    <Box
                      component={"div"}
                      className=" flex sm:flex-col sm:max-h-20 w-full justify-around items-center"
                    >
                      <Box
                        component={"div"}
                        className=" flex gap-x-4 w-full justify-around items-center"
                      >
                        <Tooltip
                          title={`ویرایش ${user.displayName}`}
                          placement="top"
                        >
                          <IconButton color="warning" className=" flex w-5">
                            <Link
                              id={`edit-${user._id}`}
                              href={`/users/addUser/${user?._id}?${stringified}`}
                              className=" "
                            >
                              <HiOutlinePencilSquare color="orange" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

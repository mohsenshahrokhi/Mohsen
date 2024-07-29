"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import React, { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendSms } from "@/actions/register";
import { VariantType, enqueueSnackbar } from "notistack";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  LoginPhoneSchema,
  LoginSmsSchema,
  TLoginPhoneSchema,
  TLoginSmsSchema,
  TUserSchema,
} from "@/ZSchemas/UserSchema";
import { TextFieldElement } from "react-hook-form-mui";

function LoginPhoneForm() {
  const searchParams = useSearchParams();
  const params = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [showPhoneCode, setPhoneCode] = useState(false);
  const [user, setUser] = useState<TUserSchema>();

  const form = useForm<TLoginPhoneSchema>({
    resolver: zodResolver(LoginPhoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const smsForm = useForm<TLoginSmsSchema>({
    resolver: zodResolver(LoginSmsSchema),
    defaultValues: {
      phone: user?.phone || "",
      verifyPKey: "",
    },
  });

  const {
    formState: { defaultValues },
    reset,
    control,
  } = smsForm;

  useEffect(() => {
    // user?.phone &&
    reset({
      phone: user?.phone || "",
      verifyPKey: "",
    });
    // console.log("useEffect", user?.phone);
  }, [reset, user]);

  // console.log("LoginPhoneForm", user);
  // console.log("defaultValues", defaultValues);

  const handleClickVariant = (variant: VariantType, meg: string) => {
    enqueueSnackbar(meg, { variant });
  };

  const onSubmit = (values: TLoginPhoneSchema) => {
    startTransition(() => {
      sendSms(values).then((data) => {
        if (data.success) {
          handleClickVariant("success", data.msg);
          setUser(data.userUp);
          setPhoneCode(true);
        } else {
          handleClickVariant("error", data.msg);
        }
      });
    });
  };

  const onSmsSubmit = (values: TLoginSmsSchema) => {
    console.log("LoginPhoneForm", values);
    startTransition(async () => {
      await signIn("UserPhoneCredentials", {
        ...values,
        callbackUrl: params || "/userDashboard",
      });
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {showPhoneCode ? (
        <form
          className=" flex flex-col w-full gap-3"
          onSubmit={smsForm.handleSubmit(onSmsSubmit)}
        >
          <TextFieldElement
            name={"phone"}
            label={"تلفن"}
            control={control}
            // type="number"
            required
            disabled
            fullWidth
          />
          <TextFieldElement
            name={"verifyPKey"}
            label={"گذرواژه دریافتی"}
            control={control}
            // type="number"
            required
            fullWidth
          />
          <Button
            type="submit"
            disabled={isPending}
            variant="contained"
            color="info"
            sx={{ width: "100%" }}
          >
            ورود
          </Button>
        </form>
      ) : (
        <form
          className=" flex flex-col w-full gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextFieldElement
            name={"phone"}
            label={"تلفن"}
            control={form.control}
            required
            fullWidth
          />

          <Button
            type="submit"
            disabled={isPending}
            variant="contained"
            color="info"
            sx={{ width: "100%" }}
          >
            ارسال گذرواژه
          </Button>
        </form>
      )}
    </Box>
  );
}

export default LoginPhoneForm;

"use client";

import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhonelinkLockRoundedIcon from "@mui/icons-material/PhonelinkLockRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import MailLockRoundedIcon from "@mui/icons-material/MailLockRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import RegisterForm from "./register-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoginMailForm from "./login-mail-form";
import LoginUsernameForm from "./login-username-form";
import LoginPhoneForm from "./login-phone-form";
import { useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  index: number;
  value: { newValue: number; path: string };
};

function CustomTabPanel({ children, value, index, ...other }: Props) {
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AuthForm(props: any) {
  const router = useRouter();
  const pathName = usePathname();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const [path, setPath] = useState("/phone");
  const [oldValue, setOldValue] = useState(0);
  const [value, setValue] = useState({ newValue: oldValue, path });

  if (status === "authenticated") {
    router.push(`/userDashboard?${searchParams.toString()}`);
  }

  useEffect(() => {
    setPath(pathName);
  }, [pathName]);

  useEffect(() => {
    setValue({ newValue: oldValue, path });
  }, [path, oldValue]);

  useEffect(() => {
    path === "/username"
      ? setOldValue(1)
      : path === "/mail"
      ? setOldValue(2)
      : path === "/register"
      ? setOldValue(3)
      : path === "/phone" && setOldValue(0);
  }, [path]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const path = event.currentTarget.ariaLabel || "/phone";
    router.push(`${path}?${searchParams.toString()}`);
    setValue({ newValue, path });
  };

  const logOptions = [
    {
      title: "ورود با مبایل",
      icon: <PhonelinkLockRoundedIcon />,
      ariaLabel: "/phone",
    },
    {
      title: "ورود با نام کاربری",
      icon: <VpnKeyRoundedIcon />,
      ariaLabel: "/username",
    },
    {
      title: "ورود با ایمیل",
      icon: <MailLockRoundedIcon />,
      ariaLabel: "/mail",
    },
    {
      title: "ایجاد حساب جدید",
      icon: <PersonAddAlt1RoundedIcon />,
      ariaLabel: "/register",
    },
  ];

  return (
    <Box
      component={"div"}
      sx={{
        width: "100%",
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        component={"div"}
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
          justifyContent: "space-around",
        }}
      >
        <Tabs
          value={value.newValue}
          onChange={handleChange}
          aria-label="login icon tabs"
        >
          {logOptions.map((op, index) => (
            <Tooltip key={index} title={op.title} placement="top" arrow>
              <Tab
                icon={op.icon}
                aria-label={op.ariaLabel}
                {...a11yProps(index)}
              />
            </Tooltip>
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {value.path === "/phone" ? (
          <LoginPhoneForm />
        ) : value.path === "/register" ? (
          <RegisterForm />
        ) : value.path === "/mail" ? (
          <LoginMailForm />
        ) : (
          value.path === "/username" && <LoginUsernameForm />
        )}
      </CustomTabPanel>
    </Box>
  );
}

export default AuthForm;

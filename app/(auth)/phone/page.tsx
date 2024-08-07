import LoginPhoneForm from "@/components/auth/login-phone-form";
import { signOut } from "next-auth/react";

function Phone() {
  return (
    <div className=" bg-slate-200 w-96 h-96 overflow-auto m-5 rounded-md">
      <LoginPhoneForm />
    </div>
  );
}

export default Phone;

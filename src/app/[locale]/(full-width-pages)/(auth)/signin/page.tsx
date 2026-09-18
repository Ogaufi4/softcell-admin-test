import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | SoftCell Dealer Portal",
  description: "Sign in to the SoftCell Dealer Portal",
};

export default function SignIn() {
  return <SignInForm />;
}

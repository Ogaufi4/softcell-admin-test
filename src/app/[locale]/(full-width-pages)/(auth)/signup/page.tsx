import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | SoftCell Dealer Portal",
  description: "Create an account for the SoftCell Dealer Portal",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}

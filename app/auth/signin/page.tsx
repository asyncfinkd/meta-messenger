import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent";

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center mt-64">
      <SignInComponent providers={providers} />
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";

const NewVerificationForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setErrorMessage("Token is missing!");
      return;
    }

    newVerification(token)
      .then((res) => {
        if (res.success) {
          setSuccessMessage(res.message);
        } else {
          setErrorMessage(res.message);
        }
      })
      .catch((error) => {
        setErrorMessage("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Verifying your email !
        </CardTitle>
        <CardDescription className="text-center">
          This will only take a while
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-center items-center">
          {!successMessage && !errorMessage && <BeatLoader />}
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal mx-auto">
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewVerificationForm;

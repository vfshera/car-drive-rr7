import type { Route } from "./+types/register";
import { Form, Link, useNavigate, useSearchParams } from "react-router";
import { authClient } from "~/lib/auth.client";
import { AUTHENTICATED_REDIRECT, REDIRECT_PATH_PARAM } from "~/constants";
import { type SignupSchemaType, signupSchema } from "~/schemas/auth.schema";
import { generateLinkWithRedirectTo } from "~/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function meta() {
  return [{ title: "Register" }];
}

export default function SignUp(props: Route.ComponentProps) {
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get(REDIRECT_PATH_PARAM);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const signUp = async ({ confirmPassword: _, ...data }: SignupSchemaType) => {
    await authClient.signUp.email(data, {
      onSuccess: () => {
        navigate(redirectTo || AUTHENTICATED_REDIRECT);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div className="register-page">
      <h1>Register</h1>

      <Form onSubmit={handleSubmit(signUp)}>
        <div className="input-group">
          <label htmlFor="name">Your Name</label>
          {errors.name && <p className="field-errors">{errors.name.message}</p>}
          <input type="text" placeholder="John Doe" {...register("name")} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Your Email</label>
          {errors.email && <p className="field-errors">{errors.email.message}</p>}
          <input type="email" placeholder="example@cardrive.com" {...register("email")} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          {errors.password && <p className="field-errors">{errors.password.message}</p>}
          <input placeholder="********" type="password" {...register("password")} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Confirm Password</label>
          {errors.confirmPassword && (
            <p className="field-errors">{errors.confirmPassword.message}</p>
          )}
          <input placeholder="********" type="password" {...register("confirmPassword")} />
        </div>

        <div className="form-btns">
          <button type="submit" disabled={isSubmitting} className="w-full!">
            Register
          </button>
        </div>
        <p className="mt-6 text-center font-normal text-gray-600">
          Already registered?{" "}
          <Link
            to={generateLinkWithRedirectTo("/login", redirectTo)}
            className="font-medium text-gray-900"
          >
            Log in
          </Link>
        </p>
      </Form>
    </div>
  );
}

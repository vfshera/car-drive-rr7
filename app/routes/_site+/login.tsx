import type { Route } from "./+types/login";
import { Form, Link, redirect, useNavigate, useSearchParams } from "react-router";
import { authClient } from "~/lib/auth.client";
import { GithubIcon } from "~/components/icons";
import { AUTHENTICATED_REDIRECT, REDIRECT_PATH_PARAM } from "~/constants";
import { type LoginSchemaType, loginSchema } from "~/schemas/auth.schema";
import { generateLinkWithRedirectTo } from "~/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function meta() {
  return [{ title: "Login" }];
}

export async function loader({ context }: Route.LoaderArgs) {
  if (context.isAuthenticated) {
    return redirect(AUTHENTICATED_REDIRECT);
  }

  return {};
}

export default function Login() {
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get(REDIRECT_PATH_PARAM);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const signIn = async (credentials: LoginSchemaType) => {
    await authClient.signIn.email(credentials, {
      onSuccess: () => {
        navigate(redirectTo || AUTHENTICATED_REDIRECT);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: redirectTo || AUTHENTICATED_REDIRECT,
      fetchOptions: {
        onSuccess: () => {
          navigate(redirectTo || AUTHENTICATED_REDIRECT);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>

      <Form onSubmit={handleSubmit(signIn)}>
        <div className="input-group text-left">
          <label htmlFor="email">
            <span>Your Email</span>
          </label>

          {errors.email && <p className="field-errors">{errors.email.message}</p>}
          <input type="email" placeholder="example@cardrive.com" {...register("email")} />
        </div>

        <div className="input-group text-left">
          <label htmlFor="password">
            <span>Password</span>
          </label>
          <input placeholder="********" type="password" {...register("password")} />
          {errors.password && <p className="field-errors">{errors.password.message}</p>}
        </div>

        <div className="form-btns">
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
          <button
            className="social-login-btn"
            type="button"
            disabled={isSubmitting}
            onClick={handleGithubSignIn}
          >
            <GithubIcon className="size-8" />
            Sign in with Github
          </button>
        </div>

        <p className="mt-8 text-center font-normal text-gray-600">
          Not registered?{" "}
          <Link
            to={generateLinkWithRedirectTo("/register", redirectTo)}
            className="font-medium text-gray-900"
          >
            Create account
          </Link>
        </p>
      </Form>
    </div>
  );
}

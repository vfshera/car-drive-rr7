import type { Route } from "./+types/contact";
import { Form, useSubmit } from "react-router";
import { type ContactSchemaType, contactSchema } from "~/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function meta() {
  return [{ title: "Contact" }];
}

export async function action({ request }: Route.ActionArgs) {
  const contactData = Object.fromEntries(await request.formData()) as ContactSchemaType;

  return { ok: true };
}

export default function Contact() {
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaType>({ mode: "onBlur", resolver: zodResolver(contactSchema) });

  return (
    <div className="contact-page">
      <div className="contact-form-wrapper">
        <h1>Contact Us</h1>

        <Form onSubmit={handleSubmit((data) => submit(data, { method: "post" }))} method="POST">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            {errors.name && <p className="field-errors">{errors.name.message}</p>}
            <input type="text" placeholder="John Doe" {...register("name")} />
          </div>

          <div className="input-group text-left">
            <label htmlFor="email">
              <span>Email</span>
            </label>

            {errors.email && <p className="field-errors">{errors.email.message}</p>}
            <input type="email" placeholder="example@cardrive.com" {...register("email")} />
          </div>

          <div className="input-group text-left">
            <label htmlFor="message">
              <span>Message</span>
            </label>

            {errors.message && <p className="field-errors">{errors.message.message}</p>}
            <textarea
              {...register("message")}
              cols={25}
              rows={10}
              placeholder="Type your message here"
            ></textarea>
          </div>
          <button type="submit" disabled={isSubmitting}>
            SEND
          </button>
        </Form>
      </div>
    </div>
  );
}

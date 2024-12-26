import { APP_DESCRIPTION, APP_NAME } from "~/constants";

type MetaProps = { title: string; description: string };

export function getMeta({ title, description }: Partial<MetaProps>) {
  return [
    { title: title ? `${title} | ${APP_NAME}` : APP_NAME },
    {
      name: "description",
      content: description || APP_DESCRIPTION,
    },
  ];
}

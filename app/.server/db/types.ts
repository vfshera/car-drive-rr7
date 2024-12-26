export type WithOmit<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

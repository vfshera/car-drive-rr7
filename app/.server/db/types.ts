export type WithOmit<T, K extends keyof T = never> = Omit<T, "id" | "createdAt" | "updatedAt" | K>;

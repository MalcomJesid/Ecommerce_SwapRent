import { ReactNode } from "react";

declare module "./Context.jsx" {
  export const Context: React.Context<any>;
  export const ContextProvider: React.FC<{ children: ReactNode }>;
  export const UseContext: () => any;
}
import { ZodIssue } from "zod";

export interface ResponseMessageInterface {
  message: string | ZodIssue[];
}

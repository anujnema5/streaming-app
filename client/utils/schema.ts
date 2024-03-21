import { z } from "zod";

export const formSchema = z.object({
    email: z.string().min(2).max(50).email(),
    roomNumber: z.string()
  })
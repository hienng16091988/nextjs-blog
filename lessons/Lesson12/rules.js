import z, { email } from "zod";

export const RegisterFormSchema = z.object({
    email: z.email({ message:"Please enter a valid email" }),
    password: z.string()
        .min(1, { message:"Not empty" })
        .min(5, { message: "Be at least at 5 characters" })
        .trim(),
    confirmPassword: z.string().trim()
}).
superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password fields do not match" ,
            path: ["confirmPassword"],
        });
    }

});

export const LoginFormSchema = z.object({
    email: z.email({ message: "Please enter a valid email" }),
    password: z.string()
            .min(1, { message: "Not empty" })
            .trim()
    }
)

export const BlogFormSchema = z.object({
    title: z.string()
            .min(1, { message: "Title not empty" })
            .max(100, { message: "Title cannot be more than 100 characters" })
            .trim(),
    content: z.string().trim()
})

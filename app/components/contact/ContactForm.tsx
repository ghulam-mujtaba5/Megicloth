"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => void;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export default function ContactForm({ onSubmit, isLoading, isSuccess, error }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const handleFormSubmit = (data: ContactFormValues) => {
    onSubmit(data);
    if(!error) {
      reset();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        background: "#ffffff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        p: { xs: 3, md: 4 },
        height: "100%",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#1e293b" }}>
        Send Us a Message
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} aria-label="Contact form">
        <TextField
          fullWidth
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Message"
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
          sx={{ mb: 2 }}
          required
          multiline
          minRows={5}
        />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {isSuccess && <Alert severity="success" sx={{ mb: 2 }}>Thank you for your message! We'll be in touch soon.</Alert>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{
            background: "#2563eb",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            py: 1.5,
            fontSize: "1.1rem",
            "&:hover": { background: "#1e40af" },
          }}
        >
          {isLoading ? "Sending..." : "Submit"}
        </Button>
      </form>
    </Paper>
  );
}

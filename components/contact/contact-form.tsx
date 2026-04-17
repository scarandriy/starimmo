"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success";
type FormErrors = { name?: string; email?: string; message?: string };

function validate(data: { name: string; email: string; message: string }): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

const inputClass =
  "rounded-[var(--theme-radius-input)] border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground";

const errorClass = "mt-1 text-[11px] font-medium text-danger";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<FormState>("idle");

  function reset() {
    setState("idle");
    setName(""); setEmail(""); setPhone(""); setMessage(""); setErrors({});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate({ name, email, message });
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setErrors({});
    setState("loading");
    // Replace with real server action when backend is ready
    setTimeout(() => setState("success"), 1200);
  }

  if (state === "success") {
    return (
      <div className="py-10 text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">Sent</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">Thank you for reaching out</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          We&apos;ll be in touch within one business day.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        Full name
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(inputClass, errors.name && "border-danger")}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </label>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        Email address
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(inputClass, errors.email && "border-danger")}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </label>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        Phone number
        <input
          type="tel"
          placeholder="+352"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        Your message
        <textarea
          rows={5}
          placeholder="Tell us about the property or project you're interested in."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputClass, errors.message && "border-danger")}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </label>
      <Button
        type="submit"
        fullWidth
        className={cn("mt-2", state === "loading" && "opacity-60 pointer-events-none")}
      >
        {state === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

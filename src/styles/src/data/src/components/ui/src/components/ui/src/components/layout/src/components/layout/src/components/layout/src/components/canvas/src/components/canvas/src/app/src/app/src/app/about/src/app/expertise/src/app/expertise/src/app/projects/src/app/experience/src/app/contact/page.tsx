"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import gsap from "gsap";
import { Mail, Phone, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { PROFILE_DATA } from "@/data/portfolioData";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus =
  | { type: "idle" }
  | { type: "error"; text: string }
  | { type: "unconfigured"; text: string; mailtoHref: string }
  | { type: "sent"; text: string };

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle" });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-calm", {
        y: 14,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "transform",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const buildMailtoLink = () => {
    const bodyLines = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      "",
      form.message.trim(),
    ].join("\n");

    return `mailto:${encodeURIComponent(PROFILE_DATA.email)}?subject=${encodeURIComponent(
      form.subject.trim() || "Portfolio Inquiry"
    )}&body=${encodeURIComponent(bodyLines)}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        text: "Please fill in your name, email address, and message before sending.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setStatus({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim();

    if (!endpoint) {
      setStatus({
        type: "unconfigured",
        text: "Automated form submission is not configured yet on this deployment. You can open your email client directly with your message pre-filled.",
        mailtoHref: buildMailtoLink(),
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "idle" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || "Portfolio Inquiry",
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        setStatus({
          type: "error",
          text: "Unable to send message right now. Please try again or reach out directly via email or WhatsApp.",
        });
        return;
      }

      setStatus({
        type: "sent",
        text: "Your message has been delivered.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        text: "Network error while sending message. Please try again or contact directly via email or WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const hasGithub = Boolean(PROFILE_DATA.githubUrl?.trim());
  const hasLinkedin = Boolean(PROFILE_DATA.linkedinUrl?.trim());

  return (
    <div ref={pageRef} className="relative min-h-screen w-full py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Calm Editorial & Direct Contact Channels */}
          <div className="lg:col-span-5">
            <p className="contact-calm font-display text-xs font-semibold tracking-wideLabel text-electric-blue uppercase">
              Contact
            </p>

            <h1 className="contact-calm mt-4 font-display text-3xl font-bold leading-tight tracking-editorial text-white sm:text-5xl">
              {PROFILE_DATA.contactHeadline}
            </h1>

            <p className="contact-calm mt-4 text-sm leading-relaxed text-silver sm:text-base">
              Open to operational roles, partnership inquiries, and freelance web
              application work.
            </p>

            <div className="contact-calm mt-8 space-y-4 border-t border-white/10 pt-8">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-charcoal/85 p-4 text-sm text-white transition-colors hover:border-electric-blue"
              >
                <Mail className="h-4 w-4 shrink-0 text-electric-blue" />
                <div>
                  <span className="block text-xs text-silver">Email</span>
                  <span className="font-medium">{PROFILE_DATA.email}</span>
                </div>
              </a>

              <a
                href={PROFILE_DATA.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-charcoal/85 p-4 text-sm text-white transition-colors hover:border-electric-blue"
              >
                <Phone className="h-4 w-4 shrink-0 text-electric-blue" />
                <div>
                  <span className="block text-xs text-silver">WhatsApp</span>
                  <span className="font-medium">{PROFILE_DATA.whatsapp}</span>
                </div>
              </a>

              {(hasGithub || hasLinkedin) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {hasGithub && (
                    <a
                      href={PROFILE_DATA.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/15 bg-charcoal px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-electric-blue"
                    >
                      GitHub
                    </a>
                  )}
                  {hasLinkedin && (
                    <a
                      href={PROFILE_DATA.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/15 bg-charcoal px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-electric-blue"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-calm lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-white/10 bg-charcoal/90 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold tracking-wider text-silver uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-obsidian/80 px-4 py-3 text-sm text-white placeholder:text-silver/40 focus:border-electric-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold tracking-wider text-silver uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-obsidian/80 px-4 py-3 text-sm text-white placeholder:text-silver/40 focus:border-electric-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold tracking-wider text-silver uppercase"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="Project, collaboration, or role inquiry"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-obsidian/80 px-4 py-3 text-sm text-white placeholder:text-silver/40 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold tracking-wider text-silver uppercase"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Write your message here..."
                  className="mt-2 w-full rounded-lg border border-white/10 bg-obsidian/80 px-4 py-3 text-sm text-white placeholder:text-silver/40 focus:border-electric-blue focus:outline-none"
                />
              </div>

              {status.type === "error" && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-500/40 bg-red-950/30 p-3.5 text-xs leading-relaxed text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>{status.text}</span>
                </div>
              )}

              {status.type === "unconfigured" && (
                <div
                  role="status"
                  className="mt-5 rounded-lg border border-white/15 bg-graphite p-4 text-xs leading-relaxed text-silver"
                >
                  <p>{status.text}</p>
                  <a
                    href={status.mailtoHref}
                    className="mt-3 inline-block font-semibold text-electric-blue underline underline-offset-4 hover:text-white"
                  >
                    Open in Mail App →
                  </a>
                </div>
              )}

              {status.type === "sent" && (
                <div
                  role="status"
                  className="mt-5 flex items-center gap-2.5 rounded-lg border border-electric-blue/50 bg-electric-blue/10 p-3.5 text-xs text-white"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-blue" />
                  <span>{status.text}</span>
                </div>
              )}

              <div className="mt-6">
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-silver disabled:opacity-60"
                  >
                    <span>{submitting ? "Sending..." : "Send Message"}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

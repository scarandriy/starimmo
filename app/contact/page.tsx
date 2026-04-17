import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { contactDetails, contactPageContent, routes } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Starimmo to discuss your property goals in Luxembourg.",
  path: routes.contact,
});

export default function ContactPage() {
  return (
    <>
      {/* Dark hero */}
      <SectionContainer
        dark
        eyebrow={contactPageContent.eyebrow}
        title={contactPageContent.title}
        description={contactPageContent.description}
      />

      {/* Contact form + details */}
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[var(--theme-radius-card)] border border-border p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Send us a message
            </p>
            <form className="mt-6 grid gap-5">
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Full name
                <input
                  type="text"
                  placeholder="Your name"
                  className="rounded-[var(--theme-radius-input)] border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Email address
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="rounded-[var(--theme-radius-input)] border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Phone number
                <input
                  type="tel"
                  placeholder="+352"
                  className="rounded-[var(--theme-radius-input)] border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Your message
                <textarea
                  rows={5}
                  placeholder="Tell us about the property or project you're interested in."
                  className="rounded-[var(--theme-radius-input)] border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </label>
              <Button type="button" className="mt-2 w-fit">
                Send message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                Office
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-foreground">
                <p>{contactDetails.office}</p>
                <p>{contactDetails.hours}</p>
              </div>
            </div>
            <hr className="divider" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                Direct contact
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-foreground">
                <p>{contactDetails.phone}</p>
                <p>{contactDetails.email}</p>
              </div>
            </div>
            <hr className="divider" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                Why contact us
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {contactPageContent.reassurance.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-foreground pl-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}

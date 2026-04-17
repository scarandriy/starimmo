import { SectionContainer } from "@/components/layout/section-container";
import { ContactForm } from "@/components/contact/contact-form";
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
        spacing="compact"
        eyebrow={contactPageContent.eyebrow}
        title={contactPageContent.title}
        description={contactPageContent.description}
      />

      {/* Contact form + details */}
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[var(--theme-radius-card)] border border-border p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Send us a message
            </p>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Office
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-foreground">
                <p>{contactDetails.office}</p>
                <p>{contactDetails.hours}</p>
              </div>
            </div>
            <hr className="divider" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Direct contact
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-foreground">
                <p>
                  <a
                    href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {contactDetails.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {contactDetails.email}
                  </a>
                </p>
              </div>
            </div>
            <hr className="divider" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Why contact us
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {contactPageContent.reassurance.map((item) => (
                  <li key={item} className="border-l-2 border-foreground pl-4">
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

import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChatIcon } from "@/components/ui/icons";
import type { WhatsAppLink } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  link: WhatsAppLink;
  label?: string;
  variant?: "primary" | "secondary" | "accent";
  size?: "md" | "sm";
  className?: string;
};

export function WhatsAppButton({
  link,
  label = "WhatsApp Us",
  variant = "primary",
  size = "md",
  className = "",
}: WhatsAppButtonProps) {
  return (
    <ButtonLink
      href={link.href}
      external={link.isWhatsApp}
      variant={variant}
      size={size}
      className={className}
    >
      <ChatIcon className="size-[1.125rem]" />
      {label}
      {link.isWhatsApp && <span className="sr-only"> (opens WhatsApp)</span>}
    </ButtonLink>
  );
}

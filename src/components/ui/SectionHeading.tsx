type SectionHeadingProps = {
  id: string;
  title: string;
  className?: string;
};

export const sectionTitle =
  "font-heading text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[4rem]";

/** Section title. Calls to action such as "View all" sit below the section content. */
export function SectionHeading({ id, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 id={id} className={sectionTitle}>
        {title}
      </h2>
    </div>
  );
}

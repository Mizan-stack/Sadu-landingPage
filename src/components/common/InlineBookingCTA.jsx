export default function InlineBookingCTA({
  buttonClassName = "group inline-flex items-center gap-2 text-[#7A1E2C]",
  iconSrc,
  iconClassName,
  label,
  labelClassName,
  onClick,
  href,
  target,
  rel,
}) {
  if (href) {
    return (
      <a className={buttonClassName} href={href} target={target} rel={rel}>
        <img src={iconSrc} alt="" className={iconClassName} loading="lazy" decoding="async" />
        <span className={labelClassName}>{label}</span>
      </a>
    );
  }

  return (
    <button className={buttonClassName} onClick={onClick}>
      <img src={iconSrc} alt="" className={iconClassName} loading="lazy" decoding="async" />
      <span className={labelClassName}>{label}</span>
    </button>
  );
}

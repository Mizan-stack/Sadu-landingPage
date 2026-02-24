export default function InlineBookingCTA({
  buttonClassName = "group inline-flex items-center gap-2 text-[#7A1E2C]",
  iconSrc,
  iconClassName,
  label,
  labelClassName,
  onClick,
}) {
  return (
    <button className={buttonClassName} onClick={onClick}>
      <img src={iconSrc} alt="" className={iconClassName} />
      <span className={labelClassName}>{label}</span>
    </button>
  );
}

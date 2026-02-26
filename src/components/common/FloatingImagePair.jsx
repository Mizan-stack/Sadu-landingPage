export default function FloatingImagePair({
  bigImageSrc,
  bigImageClassName,
  smallWrapperClassName,
  smallImageSrc,
  smallImageClassName,
}) {
  return (
    <>
      <img src={bigImageSrc} alt="" className={bigImageClassName} loading="lazy" decoding="async" />
      <div className={smallWrapperClassName}>
        <img src={smallImageSrc} alt="" className={smallImageClassName} loading="lazy" decoding="async" />
      </div>
    </>
  );
}

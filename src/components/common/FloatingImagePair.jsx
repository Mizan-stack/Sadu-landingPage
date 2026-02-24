export default function FloatingImagePair({
  bigImageSrc,
  bigImageClassName,
  smallWrapperClassName,
  smallImageSrc,
  smallImageClassName,
}) {
  return (
    <>
      <img src={bigImageSrc} alt="" className={bigImageClassName} />
      <div className={smallWrapperClassName}>
        <img src={smallImageSrc} alt="" className={smallImageClassName} />
      </div>
    </>
  );
}

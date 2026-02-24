export default function PageContainer({
  className = "mx-auto max-w-[1320px] px-4 sm:px-6",
  children,
}) {
  return <div className={className}>{children}</div>;
}

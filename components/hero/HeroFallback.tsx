export function HeroFallback() {
  return (
    <div
      className="absolute inset-0 z-0 flex items-center justify-center bg-black bg-[radial-gradient(circle_at_center,_#1a1a1a,_#000000_70%)]"
      aria-hidden="true"
    >
      <img src="/images/logo-white.svg" alt="" className="w-[220px] opacity-90 md:w-[380px]" />
    </div>
  );
}

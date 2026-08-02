export function HeroFallback() {
  return (
    <div
      className="absolute inset-0 z-0 bg-black bg-[radial-gradient(circle_at_center,_#1a1a1a,_#000000_70%)]"
      aria-hidden="true"
    >
      {/* Replace with a poster image or lightweight pre-rendered camera
          video once the asset is supplied, e.g.:
          <video autoPlay muted loop playsInline poster="/images/hero-poster.jpg">
            <source src="/video/hero-camera-fallback.mp4" type="video/mp4" />
          </video> */}
    </div>
  );
}

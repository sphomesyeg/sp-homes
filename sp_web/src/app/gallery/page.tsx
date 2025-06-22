const Gallery = () => {
  const gallery = "/images/sp-gallery.jpg";

  return (
    <div
      className="gallery_wrapper relative w-full object-cover h-[240px] md:h-[480px] lg:h-[520px]"
      style={{
        backgroundImage: `url(${gallery})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Text Overlay */}
      <div className="relative flex items-center justify-center text-center h-full w-full z-20">
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-col items-center justify-center text-white">
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide drop-shadow-[6px_2px_6px_rgba(0,0,0,0.6)]">
            GALLERY
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

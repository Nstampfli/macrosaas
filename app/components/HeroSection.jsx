const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center bg-blue-900 text-white">
      <h1 className="text-5xl font-bold text-primary mb-4">Automate Your Macros with Ease</h1>
      <p className="text-lg text-gray-300 mb-6">
        Create powerful, custom AutoHotkey macros for <span className="text-primary font-bold">Windows</span> only.
      </p>
      <a href="#macro-form" className="px-6 py-3 bg-primary font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300">
        Start Creating
      </a>
    </section>
  );
};

export default HeroSection;

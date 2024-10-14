const TutorialSection = () => {
  return (
    <section id="tutorial" className="mt-16 text-center bg-blue-800 py-12 text-white">
      <h2 className="text-3xl font-bold text-primary mb-6">How to Install & Use</h2>

      <div className="text-left max-w-3xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary">1. Install AutoHotkey</h3>
          <p className="text-gray-300 mt-2">
            Download and install AutoHotkey from the official website by clicking
            <a href="https://www.autohotkey.com" className="text-primary underline"> here</a>.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary">2. Customize Your Macro</h3>
          <p className="text-gray-300 mt-2">
            Use the form above to configure your macro by selecting the keys and delays.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary">3. Download and Run</h3>
          <p className="text-gray-300 mt-2">
            Click &quot;Generate Macro File&quot; to download the .ahk file. Then, simply double-click the file to run your macro.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary">4. Stop the Macro</h3>
          <p className="text-gray-300 mt-2">
            To stop the macro easily, find the AutoHotkey icon in the system tray by clicking the small arrow on the right of your taskbar.
            Right-click the AutoHotkey logo and select &quot;Exit&quot; to stop the script.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;

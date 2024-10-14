"use client";

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MacroForm from './components/MacroForm';
import TutorialSection from './components/TutorialSection';
import Footer from './components/Footer';
import { generateAhk } from './lib/generateAhk';

export default function Home() {
  const handleGenerate = (macroData) => {
    generateAhk(macroData);  // Appelle la fonction avec les données de macro
  };  

  return (
    <div>
      <Header />
      <HeroSection />
      <MacroForm onGenerate={handleGenerate} />
      <TutorialSection />
      <Footer />
    </div>
  );
}

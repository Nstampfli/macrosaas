"use client";
import { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const MacroForm = ({ onGenerate }) => {
  const [macroType, setMacroType] = useState('single');
  const [actions, setActions] = useState([{ key: '', delay: 200 }]);
  const [fileName, setFileName] = useState('macro');
  const [triggerKey, setTriggerKey] = useState(''); // Nouvelle clé pour déclencher la macro
  const [repeatDelay, setRepeatDelay] = useState(1000); // Pour le mode infini
  const [isListening, setIsListening] = useState(null); // Pour savoir quel input attend une touche
  const [isListeningTrigger, setIsListeningTrigger] = useState(false); // Pour la touche déclencheuse

  // Fonction pour écouter les touches et boutons
  const handleKeyCapture = (event) => {
    if (isListening !== null || isListeningTrigger) {
      event.preventDefault();
      let key = '';

      if (event.key && event.key.length === 1) {
        key = event.key === ' ' ? 'Space' : event.key.toUpperCase(); // Afficher "Space" pour la barre d'espace
      } else {
        switch (event.key) {
          case 'Enter':
            key = 'Enter';
            break;
          case 'Shift':
            key = 'Shift';
            break;
          default:
            key = event.key;
        }
      }

      // Gérer les clics de souris sans réinitialiser pour clic gauche
      if (event.type === 'mousedown') {
        // Utiliser uniquement l'événement 'mousedown' pour capter la touche
        switch (event.button) {
          case 0:
            key = 'LButton'; // Clic gauche
            break;
          case 1:
            key = 'MButton'; // Clic milieu
            break;
          case 2:
            key = 'RButton'; // Clic droit
            break;
          default:
            key = `Button${event.button}`;
        }
      }

      if (isListeningTrigger) {
        setTriggerKey(key);
        setIsListeningTrigger(false); // Arrêter d'écouter pour la clé déclencheuse
      } else {
        const updatedActions = [...actions];
        updatedActions[isListening].key = key;
        setActions(updatedActions);
        setIsListening(null); // Arrêter l'écoute après la capture
      }
    }
  };

  const startListeningForKey = (index) => {
    setIsListening(index); // Démarre l'écoute pour cet index
  };

  const startListeningForTriggerKey = () => {
    setIsListeningTrigger(true); // Démarre l'écoute pour la clé déclencheuse
  };

  const handleDelayChange = (index, delay) => {
    const updatedActions = [...actions];
    updatedActions[index].delay = delay;
    setActions(updatedActions);
  };

  const addAction = () => {
    setActions([...actions, { key: '', delay: 200 }]);
  };

  const removeAction = (index) => {
    const updatedActions = actions.filter((_, i) => i !== index);
    setActions(updatedActions);
  };

  // Utiliser useEffect pour capturer les événements globaux de touches et de souris
  useEffect(() => {
    if (isListening !== null || isListeningTrigger) {
      window.addEventListener('keydown', handleKeyCapture);
      window.addEventListener('mousedown', handleKeyCapture);
    }

    // Nettoyer les événements après capture
    return () => {
      window.removeEventListener('keydown', handleKeyCapture);
      window.removeEventListener('mousedown', handleKeyCapture);
    };
  }, [isListening, isListeningTrigger, handleKeyCapture]);

  return (
    <section id="macro-form" className="w-full max-w-2xl mx-auto mt-16">
      <div className="bg-blue-800 p-8 rounded-lg shadow-xl text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Create Your Macro</h2>

        <div className="mb-6">
          <label className="block mb-2 text-lg">Macro Mode</label>
          <select
            value={macroType}
            onChange={(e) => setMacroType(e.target.value)}
            className="w-full p-2 bg-black border border-gray-700 rounded"
          >
            <option value="single">Single Combination</option>
            <option value="infinite">Infinite Spam</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg">File Name (without .ahk)</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg">Macro Trigger Key</label>
          <input
            type="text"
            value={isListeningTrigger ? 'Press a key...' : triggerKey}
            placeholder="Click to set trigger key"
            className={`w-full p-2 bg-black border border-gray-700 rounded cursor-pointer ${isListeningTrigger ? 'border-yellow-400' : ''}`}
            onClick={startListeningForTriggerKey}
            readOnly
          />
        </div>

        {/* Boucle pour afficher les actions */}
        {actions.map((action, index) => (
          <div key={index} className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-1 text-white">{`Action ${index + 1}`}</h3>
            <div className="flex items-center justify-between bg-blue-900 border border-primary rounded-lg p-4 shadow-lg">
              <div className="flex space-x-4 items-center w-full">
                <div className="w-full">
                  <label className="block mb-2 text-sm">Key</label>
                  <input
                    type="text"
                    value={isListening === index ? 'Press a key...' : action.key}
                    placeholder="Click to capture"
                    className={`w-full p-2 bg-black border border-gray-700 rounded cursor-pointer ${isListening === index ? 'border-yellow-400' : ''}`}
                    onClick={() => startListeningForKey(index)}
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm">{`Delay after key (ms)`}</label>
                  <input
                    type="number"
                    placeholder="Delay (ms)"
                    value={action.delay}
                    onChange={(e) => handleDelayChange(index, e.target.value)}
                    className="w-full p-2 bg-black border border-gray-700 rounded"
                  />
                </div>
              </div>
              <button
                onClick={() => removeAction(index)}
                className="text-red-500 hover:text-red-700 flex items-center justify-center ml-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addAction}
          className="w-full p-3 bg-blue-700 text-white rounded-lg flex justify-center items-center space-x-2 hover:bg-blue-600 transition-all duration-300 mb-4"
        >
          <FaPlus /> <span>Add Action</span>
        </button>

        {macroType === 'infinite' && (
          <div className="mb-6">
            <label className="block mb-2 text-lg">Delay between repeats (ms)</label>
            <input
              type="number"
              value={repeatDelay}
              onChange={(e) => setRepeatDelay(e.target.value)}
              className="w-full p-2 bg-black border border-gray-700 rounded"
            />
          </div>
        )}

        <button
          onClick={() => onGenerate({ macroType, actions, fileName, triggerKey, repeatDelay })}
          className="w-full p-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
        >
          Generate Macro File
        </button>
      </div>
    </section>
  );
};

export default MacroForm;

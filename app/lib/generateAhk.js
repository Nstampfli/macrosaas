export const generateAhk = ({ macroType, actions, fileName, triggerKey, repeatDelay }) => {
    let ahkScript = `; AutoHotkey Script for Macro\n#Persistent\n#SingleInstance Force\n\n`;
  
    // Définir la touche déclencheuse
    ahkScript += `${triggerKey}::\n`;
  
    // Si le mode est "single", exécuter la séquence d'actions une seule fois
    if (macroType === 'single') {
      actions.forEach((action, index) => {
        ahkScript += `Send, ${action.key}\n`;  // Envoie la touche capturée
        ahkScript += `Sleep, ${action.delay}\n`;  // Délai après la touche
      });
    } else if (macroType === 'infinite') {
      // Mode infini : boucle sur les actions jusqu'à la désactivation avec le délai entre répétitions
      ahkScript += `Loop {\n`;
      actions.forEach((action) => {
        ahkScript += `Send, ${action.key}\n`;  // Envoie la touche
        ahkScript += `Sleep, ${action.delay}\n`;  // Délai après chaque touche
      });
      ahkScript += `Sleep, ${repeatDelay}\n`;  // Délai entre chaque boucle
      ahkScript += `}\n`;
    }
  
    // Arrêter la macro quand la touche déclencheuse est appuyée à nouveau
    ahkScript += `return\n`;
  
    // Écrire le fichier AHK dans un fichier .ahk avec le nom du fichier
    const blob = new Blob([ahkScript], { type: 'text/plain;charset=utf-8' });
    const fileNameWithExt = `${fileName}.ahk`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileNameWithExt;
    a.click();
  };
  
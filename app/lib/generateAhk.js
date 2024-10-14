const specialKeys = {
    Space: " ",       // Remplacer par un espace réel
    Enter: "{Enter}", // Touche entrée
    Tab: "{Tab}",     // Touche tabulation
    Backspace: "{Backspace}", // Touche backspace
    Escape: "{Escape}", // Touche échappement
    Shift: "+",       // Shift
    Ctrl: "^",        // Contrôle
    Alt: "!",         // Alt
    LButton: "{LButton}", // Clic gauche
    RButton: "{RButton}", // Clic droit
    // Ajoute d'autres touches ici si nécessaire
  };
  
  const getAHKKey = (key) => {
    return specialKeys[key] || key; // Si la touche est spéciale, on retourne sa version AHK, sinon on la retourne telle quelle
  };
  
  export const generateAhk = ({ macroType, actions, fileName, triggerKey, repeatDelay }) => {
    let ahkScript = `; AutoHotkey Script for Macro\n#Persistent\n#SingleInstance Force\n\n`;
    
    // Variable pour gérer l'effet de toggle (pause/play)
    ahkScript += `global toggle := false\n`;
  
    // Définir la touche déclencheuse
    ahkScript += `${getAHKKey(triggerKey)}::\n`;
    ahkScript += `if (toggle) {\n`;
    ahkScript += `  SetTimer, SpamMacro, Off\n`; // Désactiver la boucle
    ahkScript += `  toggle := false\n`;          // Mettre la variable à "false"
    ahkScript += `  return\n`;
    ahkScript += `} else {\n`;
    ahkScript += `  SetTimer, SpamMacro, 20\n`;  // Activer la boucle
    ahkScript += `  toggle := true\n`;           // Mettre la variable à "true"
    ahkScript += `  return\n`;
    ahkScript += `}\n\n`;
  
    // Mode infini : Boucle sur les actions avec effet toggle
    ahkScript += `SpamMacro:\n`;
    actions.forEach((action) => {
      ahkScript += `Send, ${getAHKKey(action.key)}\n`; // Envoie la touche
      ahkScript += `Sleep, ${action.delay}\n`;         // Attendre le délai spécifié
    });
    ahkScript += `Sleep, ${repeatDelay}\n`;            // Délai entre chaque répétition de la boucle
    ahkScript += `return\n`;
  
    // Fin du script
    ahkScript += `return\n`;
  
    // Générer le fichier AHK
    const blob = new Blob([ahkScript], { type: 'text/plain;charset=utf-8' });
    const fileNameWithExt = `${fileName}.ahk`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileNameWithExt;
    a.click();
  };
  
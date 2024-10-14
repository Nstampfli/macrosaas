// Fonction pour générer le fichier .ahk
export const generateAhk = (macroData) => {
    const { macroType, actions, fileName, triggerKey, repeatDelay } = macroData;
  
    // Crée le contenu de base du fichier AHK
    let ahkScript = `
    ; Script AHK généré automatiquement
    #Persistent
    #SingleInstance Force
    SetTitleMatchMode, 2
    `;
  
    // Vérifier que la touche de déclenchement existe
    if (triggerKey) {
      ahkScript += `
      ; Définir la touche de déclenchement pour activer/désactiver la macro
      ${triggerKey}::
      Toggle := !Toggle
      If Toggle {
        SoundBeep, 750, 200 ; Son lors de l'activation
        SetTimer, RunMacro, ${repeatDelay || 20} ; Démarrer la macro avec répétition si en mode infini
      } Else {
        SoundBeep, 500, 200 ; Son lors de la pause
        SetTimer, RunMacro, Off
      }
      Return
      `;
    }
  
    // Fonction principale pour exécuter la macro
    ahkScript += `
    RunMacro:
    `;
  
    // Vérifier et ajouter les actions dans le fichier AHK
    actions.forEach((action, index) => {
      if (action.key) {
        // Traitement spécial pour les touches
        let keyToSend;
  
        switch (action.key) {
          case 'Space':
            keyToSend = '{Space}';
            break;
          case 'Enter':
            keyToSend = '{Enter}';
            break;
          case 'Tab':
            keyToSend = '{Tab}';
            break;
          case 'Shift':
            keyToSend = '+';
            break;
          case 'Ctrl':
            keyToSend = '^';
            break;
          case 'Alt':
            keyToSend = '!';
            break;
          case 'LButton':
            keyToSend = '{LButton}'; // Clic gauche
            break;
          case 'RButton':
            keyToSend = '{RButton}'; // Clic droit
            break;
          case 'MButton':
            keyToSend = '{MButton}'; // Clic milieu
            break;
          default:
            keyToSend = action.key; // Gérer les autres touches normalement
            break;
        }
  
        ahkScript += `Send, ${keyToSend}\n`;
        ahkScript += `Sleep, ${action.delay || 200}\n`; // Ajouter le délai entre chaque action
      }
    });
  
    if (macroType === 'infinite') {
      ahkScript += `Return\n`;
    } else {
      ahkScript += `ExitApp\n`; // Quitte le script après la première exécution pour les macros non infinies
    }
  
    // Sauvegarder le fichier avec l'extension .ahk
    const blob = new Blob([ahkScript], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.ahk`;
    link.click();
  };
  
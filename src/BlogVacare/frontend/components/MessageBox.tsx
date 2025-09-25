/**
 * Paramètres en entrée de la fonction
 */
interface MessageBoxProps {
    message: string;
    type?: 'info' | 'error' | 'loading';
}

/**
 * Message Box affichée à l'écran lors d'une erreur ou d'un chargement de page
 * @param param0 
 * @returns 
 */
export default function MessageBox({ message, type = 'info' }: MessageBoxProps) {
  
    const baseClass = 'rounded-md p-4 text-center text-lg font-semibold max-w-md mx-auto select-none';
    let typeClass = '';

    // Couleurs selon le type de message
    switch (type) {
        case 'error':
        typeClass = 'bg-red-100 text-red-700 border border-red-400';
        break;
        case 'loading':
        typeClass = 'bg-blue-100 text-blue-700 border border-blue-400 animate-pulse';
        break;
        default:
        typeClass = 'bg-gray-100 text-gray-700 border border-gray-300';
    }

    return (
        <div className={`${baseClass} ${typeClass}`}>
        {message}
        </div>
    );
}

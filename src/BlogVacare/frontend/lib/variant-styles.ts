import { SiteVariant } from '@BlogsFront/contexts/VariantContext';

/**
 * Helper pour récupérer les classes CSS selon la variante du site, permet aussi de centraliser les styles du site
 */
export function getVariantStyles(variant: SiteVariant) {
  const styles = {
    modern: {
      // Header/Footer
      header: "bg-gradient-to-b from-primary to-green-700 shadow-lg rounded-b-xl p-4 text-white text-center",
      headerLien: "hover:underline px-3 py-1 hover:bg-white/20",
      headerNav: "",
      headerUtilisateur: "text-primary-light font-semibold",
      footer: "bg-gradient-to-b from-green-700 to-primary shadow-lg rounded-t-xl p-4 text-white text-center mt-auto font-bold",

      // Messages d'erreur/d'information
      messageBase: "rounded-md p-4 text-center text-lg font-semibold max-w-md mx-auto select-none",
      messageErreur: 'bg-red-100 text-red-700 border border-red-400',
      messageChargement: 'bg-blue-100 text-blue-700 border border-blue-400 animate-pulse',
      messageDefaut:'bg-gray-100 text-gray-700 border border-gray-300',

      // Accès restreint
      accesRestreintDiv: "p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md border-2 border-orange-200",
      accesRestreintConteneurH3: "flex items-center gap-3 mb-3",
      accesRestreintH3: "text-xl font-bold text-orange-900",
      accesRestreintMessage: "text-orange-800 mb-4",
      accesRestreintLien: "inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg",

      // Formulaire de connexion
      formConnexionDiv: "space-y-6 p-8 bg-white rounded-xl shadow-2xl border border-primary-light/20",
      formConnexionTitre: "text-3xl font-bold text-primary-dark mb-2",
      formConnexionSousTitre: "text-neutral-dark/70 text-sm",
      formConnexionConteneurChamp: "space-y-2",
      formConnexionLabel: "block text-sm font-semibold text-neutral-dark",
      formConnexionChamps: "w-full px-4 py-3 border-2 border-primary-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white hover:border-primary-light/50",
      formConnexionSoumission: "w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl",


      // Message de formulaire
      messageFormDiv: "p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-shake",
      messageFormConteneur: "flex items-center gap-2",
      messageFormContenu: "text-sm font-medium",

      // Formulaires du site (style commun)
      formContainer: "space-y-4 p-6 bg-slate-50 rounded-lg shadow-md",
      formH3: "text-xl font-bold text-primary-dark",
      formLabel: "block, text-sm font-medium text-neutral-dark mb-1",
      formInput: "w-full px-3 py-2 my-3 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
      formBouton: "flex-1 bg-primary-light hover:bg-primary-dark text-black hover:text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50",


      // Liste de dossiers
      listeDossiersDiv: "bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 max-w-4xl mx-auto",
      listeDossiersUl: "divide-y divide-stone-200",
      listeDossiersLi: "py-5 hover:bg-stone-50 transition px-4 rounded-md",
      listeDossierItem: "text-left p-4 w-full rounded-lg border border-stone-200 bg-gradient-to-b from-white via-neutral-50 to-stone-100 shadow-sm hover:shadow-lg hover:border-primary hover:scale-[1.01] transition-all duration-300 group",
      listeDossierLienConteneur:"flex items-center justify-between mb-2 border-b border-stone-300 pb-2",
      listeDosierLien:"text-xl font-bold text-primary-dark hover:text-cyan-600 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-cyan-600 group-hover:after:w-full after:transition-all after:duration-300",
      listeDossierItemSoustitre: "text-neutral-dark text-base leading-relaxed",
      
      // Liste de blogs
      listeBlogsAucunBlogConteneur: "flex flex-col items-center justify-center p-8 bg-white border-2 border-stone-200/10 rounded-lg shadow-primary-dark/80 max-w-4xl mx-auto",
      listeBlogsAucunBlogContenu: "text-center text-gray-500 text-lg font-medium py-8",
      listeBlogsConteneur: "grid grid-cols-1 md:grid-cols-2 gap-6 p-2 bg-white border-2 border-stone-200/10 rounded-lg shadow-primary-dark/80 max-w-4xl mx-auto",
      BlogItemConteneur: "p-4 border border-neutral-light rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white max-w-md",
      BlogItemSousConteneur: "flex flex-col gap-1",
      BlogItemLien: "text-lg font-semibold text-primary-dark hover:underline border-b-2 border-primary-dark/50 pb-1",
      BlogItemSpan: "text-sm text-neutral-dark italic",
      BlogItemContenu: "text-neutral-700 mt-2 line-clamp-4",

      // Liste de messages
      messageList: "flex flex-col gap-3 p-4 mx-auto max-w-4xl",
      messageItem: "flex gap-4 rounded-lg bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg",
      messageImgConteneur: "flex-none w-2/12 bg-gradient-to-r from-gray-300/50 to-white flex justify-center p-1",
      messageImg: "w-24 h-24 rounded-full object-cover p-4",
      messageConteneur: "flex-1 flex flex-col pr-2 p-4",
      messagecontenuPseudo: "font-semibold text-primary-dark col border-b-2 border-gray-400/15",
      messageContenu: "bg-white p-2 rounded-md text-neutral-dark pr-5 whitespace-pre-line",
      messageDate: "text-xs text-neutral dark:text-neutral-dark mt-1 pl-2",


      // Containers
      pageContainer: "bg-neutral-light text-neutral-dark font-sans flex flex-col min-h-screen",
    },
    
    old: {
      // Header/Footer
      header: "bg-green-800 text-white text-center border-1 border-black",
      headerNav: "bg-[#7a997a] pb-2.5 pt-1",
      headerLien: "hover:underline px-2 py-1 mx-2.5 text-white font-bold hover:bg-green-800",
      headerUtilisateur: "text-white font-bold",
      footer: "bg-green-800 text-white font-bold p-2.5 text-center border-2 border-black mt-auto",

      // Messages d'erreur/d'information
      messageBase: "rounded-md p-4 text-center text-lg font-semibold max-w-md mx-auto select-none",
      messageErreur: 'bg-red-100 text-red-700 border border-red-400',
      messageChargement: 'bg-blue-100 text-blue-700 border border-blue-400 animate-pulse',
      messageDefaut:'bg-gray-100 text-gray-700 border border-gray-300',

      // Accès restreint
      accesRestreintDiv: "p-4 bg-white border-2 border-gray-400 my-4 text-black",
      accesRestreintConteneurH3: "mb-2.5",
      accesRestreintH3: "text-base font-bold text-black m-0 mb-2",
      accesRestreintMessage: "text-black mb-2.5 text-sm leading-relaxed",
      accesRestreintLien: "inline-block bg-green-700 hover:bg-green-700/80 text-white font-bold py-1.5 px-3 border-2 border-gray-200 cursor-pointer no-underline",

      // Formulaire de connexion
      formConnexionDiv: "p-4 bg-white border-2 border-gray-400 my-4",
      formConnexionTitre: "text-lg font-bold text-black m-0 mb-2",
      formConnexionSousTitre: "text-black text-sm mb-4",
      formConnexionConteneurChamp: "mb-2",
      formConnexionLabel: "block font-bold text-black text-sm mb-0.5",
      formConnexionChamps: "w-full px-1 py-1 border-2 border-gray-400 bg-white text-black text-sm focus:outline-none focus:bg-yellow-100",
      formConnexionSoumission: "bg-green-700 hover:bg-green-700/80 text-white font-bold py-1.5 px-3 border-2 border-gray-200 cursor-pointer mt-1.5 disabled:opacity-50",

      // Message de formulaire
      messageFormDiv: "p-2.5 bg-red-100 border-2 border-red-300 text-red-800 text-sm my-2",
      messageFormConteneur: "flex items-center gap-2",
      messageFormContenu: "text-sm font-normal",

      // Formulaires du site (style commun)
      formContainer: "p-4 bg-white border-2 border-gray-400 max-w-3xl mb-2.5 text-black",
      formH3: "text-base font-bold text-black m-0 mb-2.5",
      formLabel: "block font-bold text-black text-sm my-2 mt-2",
      formInput: "w-full px-1 py-1 my-0.5 mb-2 border-2 border-gray-400 bg-white text-black text-sm focus:outline-none focus:bg-yellow-100",
      formBouton: "bg-green-700 hover:bg-green-700/80 text-white font-bold py-1.5 px-3 border-2 border-gray-200 cursor-pointer mt-1.5 disabled:opacity-50",

      // Liste de dossiers
      listeDossiersDiv: "bg-white border-2 border-gray-400 p-4 my-4 max-w-3xl mx-auto flex flex-col items-center",
      listeDossiersUl: "w-full",
      listeDossiersLi: "mb-2.5",
      listeDossierItem: "bg-white border-2 border-gray-400 mb-1.5 w-full",
      listeDossierLienConteneur: "bg-[#7a997a] text-white p-2.5 px-4 font-bold border-b border-gray-400 flex justify-between items-center",
      listeDosierLien: "text-white no-underline font-bold text-base hover:underline",
      listeDossierItemSoustitre: "bg-gray-50 text-black p-2 px-2.5 font-normal border-t border-gray-400 text-sm leading-relaxed",
      
      // Liste de blogs
      listeBlogsAucunBlogConteneur: "bg-white border-2 border-gray-400 p-4 my-4 max-w-3xl mx-auto text-center",
      listeBlogsAucunBlogContenu: "text-black text-base py-8",
      listeBlogsConteneur: "bg-white border-2 border-gray-400 p-4 my-4 max-w-3xl mx-auto",
      BlogItemConteneur: "bg-white border-2 border-gray-400 mb-2.5 w-full",
      BlogItemSousConteneur: "flex flex-col",
      BlogItemLien: "bg-[#749c74] text-white p-2.5 px-4 font-bold border-b border-gray-400 no-underline hover:underline text-base block",
      BlogItemSpan: "text-black px-2.5 border-b-1 border-gray-300 text-sm font-normal float-right",
      BlogItemContenu: "bg-[#f9f9f9] text-black p-2 px-2.5 text-sm leading-relaxed",

      // Liste de messages
      messageList: "flex flex-col gap-3 p-4 mx-auto max-w-4xl border-2 border-gray-400 bg-white",
      messageItem: "bg-white border-2 border-gray-400 mb-2.5 table w-full",
      messageImgConteneur: "table-cell w-24 p-2 bg-gray-200/80 border-r border-gray-400 align-top text-center",
      messageImg: "w-[60px] h-[60px] border-2 border-gray-400 bg-white block mx-auto",
      messageConteneur: "table-cell align-top",
      messagecontenuPseudo: "block bg-gray-700/90 w-full text-white p-1.5 px-2.5 font-bold border-b border-gray-400 text-sm",
      messageContenu: "p-2.5 bg-white text-black leading-relaxed whitespace-pre-line text-sm",
      messageDate: "block text-right text-xs text-black border-t border-gray-400 p-1.5 px-2.5 bg-gray-200/60",

      // Containers
      pageContainer: "bg-neutral-light text-black flex flex-col min-h-screen text-base leading-relaxed",
    }
  };
  
  return styles[variant];
}
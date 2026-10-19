export const THEME_KEY = "theme"

/** Runs before the first paint, so a stored choice never flashes the other theme. Without one, CSS follows the system. */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`

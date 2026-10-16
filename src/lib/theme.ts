import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'piffy:theme'

export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
    return true
  } catch {
    return false
  }
}

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => setThemeState(readTheme()), [])

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-theme', next)
    persistTheme(next)
    setThemeState(next)
  }, [])

  return { theme, setTheme }
}

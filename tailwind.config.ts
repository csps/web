/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "index.html",
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      screens: {
        '3xl': '1920px',
      },
      colors: {
        'csps-primary': '#4A2558',
        'csps-secondary': '#D4A923',
        'csps-tertiary': '#06203F',

        'primary-10': 'var(--md-ref-palette-primary10)',
        'primary-20': 'var(--md-ref-palette-primary20)',
        'primary-25': 'var(--md-ref-palette-primary25)',
        'primary-30': 'var(--md-ref-palette-primary30)',
        'primary-35': 'var(--md-ref-palette-primary35)',
        'primary-40': 'var(--md-ref-palette-primary40)',
        'primary-50': 'var(--md-ref-palette-primary50)',
        'primary-60': 'var(--md-ref-palette-primary60)',
        'primary-70': 'var(--md-ref-palette-primary70)',
        'primary-80': 'var(--md-ref-palette-primary80)',
        'primary-90': 'var(--md-ref-palette-primary90)',
        'primary-95': 'var(--md-ref-palette-primary95)',

        'secondary-10': 'var(--md-ref-palette-secondary10)',
        'secondary-20': 'var(--md-ref-palette-secondary20)',
        'secondary-25': 'var(--md-ref-palette-secondary25)',
        'secondary-30': 'var(--md-ref-palette-secondary30)',
        'secondary-35': 'var(--md-ref-palette-secondary35)',
        'secondary-40': 'var(--md-ref-palette-secondary40)',
        'secondary-50': 'var(--md-ref-palette-secondary50)',
        'secondary-60': 'var(--md-ref-palette-secondary60)',
        'secondary-70': 'var(--md-ref-palette-secondary70)',
        'secondary-80': 'var(--md-ref-palette-secondary80)',
        'secondary-90': 'var(--md-ref-palette-secondary90)',
        'secondary-95': 'var(--md-ref-palette-secondary95)',

        'tertiary-10': 'var(--md-ref-palette-tertiary10)',
        'tertiary-20': 'var(--md-ref-palette-tertiary20)',
        'tertiary-25': 'var(--md-ref-palette-tertiary25)',
        'tertiary-30': 'var(--md-ref-palette-tertiary30)',
        'tertiary-35': 'var(--md-ref-palette-tertiary35)',
        'tertiary-40': 'var(--md-ref-palette-tertiary40)',
        'tertiary-50': 'var(--md-ref-palette-tertiary50)',
        'tertiary-60': 'var(--md-ref-palette-tertiary60)',
        'tertiary-70': 'var(--md-ref-palette-tertiary70)',
        'tertiary-80': 'var(--md-ref-palette-tertiary80)',
        'tertiary-90': 'var(--md-ref-palette-tertiary90)',
        'tertiary-95': 'var(--md-ref-palette-tertiary95)',
        
        'neutral-10': 'var(--md-ref-palette-neutral10)',
        'neutral-20': 'var(--md-ref-palette-neutral20)',
        'neutral-25': 'var(--md-ref-palette-neutral25)',
        'neutral-30': 'var(--md-ref-palette-neutral30)',
        'neutral-35': 'var(--md-ref-palette-neutral35)',
        'neutral-40': 'var(--md-ref-palette-neutral40)',
        'neutral-50': 'var(--md-ref-palette-neutral50)',
        'neutral-60': 'var(--md-ref-palette-neutral60)',
        'neutral-70': 'var(--md-ref-palette-neutral70)',
        'neutral-80': 'var(--md-ref-palette-neutral80)',
        'neutral-90': 'var(--md-ref-palette-neutral90)',
        'neutral-95': 'var(--md-ref-palette-neutral95)',

        'primary': 'var(--md-sys-color-primary)',
        'on-primary': 'var(--md-sys-color-on-primary)',
        'primary-container': 'var(--md-sys-color-primary-container)',
        'on-primary-container': 'var(--md-sys-color-on-primary-container)',
        'secondary': 'var(--md-sys-color-secondary)',
        'on-secondary': 'var(--md-sys-color-on-secondary)',
        'secondary-container': 'var(--md-sys-color-secondary-container)',
        'on-secondary-container': 'var(--md-sys-color-on-secondary-container)',
        'tertiary': 'var(--md-sys-color-tertiary)',
        'on-tertiary': 'var(--md-sys-color-on-tertiary)',
        'tertiary-container': 'var(--md-sys-color-tertiary-container)',
        'on-tertiary-container': 'var(--md-sys-color-on-tertiary-container)',
        'error': 'var(--md-sys-color-error)',
        'on-error': 'var(--md-sys-color-on-error)',
        'error-container': 'var(--md-sys-color-error-container)',
        'on-error-container': 'var(--md-sys-color-on-error-container)',
        'background': 'var(--md-sys-color-background)',
        'on-background': 'var(--md-sys-color-on-background)',
        'surface': 'var(--md-sys-color-surface)',
        'on-surface': 'var(--md-sys-color-on-surface)',
        'surface-variant': 'var(--md-sys-color-surface-variant)',
        'on-surface-variant': 'var(--md-sys-color-on-surface-variant)',
        'outline': 'var(--md-sys-color-outline)',
        'inverse-surface': 'var(--md-sys-color-inverse-surface)',
        'inverse-on-surface': 'var(--md-sys-color-inverse-on-surface)',
        'inverse-primary': 'var(--md-sys-color-inverse-primary)',
        'shadow': 'var(--md-sys-color-shadow)',
        'surface-tint': 'var(--md-sys-color-surface-tint)',
        'outline-variant': 'var(--md-sys-color-outline-variant)',
        'scrim': 'var(--md-sys-color-scrim)',
      }
    },
  },
  plugins: [],
}
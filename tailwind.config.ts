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

        "primary": "var(--md-sys-color-primary)",
        "on-primary": "var(--md-sys-color-on-primary)",
        "primary-container": "var(--md-sys-color-primary-container)",
        "on-primary-container": "var(--md-sys-color-on-primary-container)",
        "primary-fixed": "var(--md-sys-color-primary-fixed)",
        "on-primary-fixed": "var(--md-sys-color-on-primary-fixed)",
        "primary-fixed-dim": "var(--md-sys-color-primary-fixed-dim)",
        "on-primary-fixed-variant": "var(--md-sys-color-on-primary-fixed-variant)",
        "secondary": "var(--md-sys-color-secondary)",
        "on-secondary": "var(--md-sys-color-on-secondary)",
        "secondary-container": "var(--md-sys-color-secondary-container)",
        "on-secondary-container": "var(--md-sys-color-on-secondary-container)",
        "secondary-fixed": "var(--md-sys-color-secondary-fixed)",
        "on-secondary-fixed": "var(--md-sys-color-on-secondary-fixed)",
        "secondary-fixed-dim": "var(--md-sys-color-secondary-fixed-dim)",
        "on-secondary-fixed-variant": "var(--md-sys-color-on-secondary-fixed-variant)",
        "tertiary": "var(--md-sys-color-tertiary)",
        "on-tertiary": "var(--md-sys-color-on-tertiary)",
        "tertiary-container": "var(--md-sys-color-tertiary-container)",
        "on-tertiary-container": "var(--md-sys-color-on-tertiary-container)",
        "tertiary-fixed": "var(--md-sys-color-tertiary-fixed)",
        "on-tertiary-fixed": "var(--md-sys-color-on-tertiary-fixed)",
        "tertiary-fixed-dim": "var(--md-sys-color-tertiary-fixed-dim)",
        "on-tertiary-fixed-variant": "var(--md-sys-color-on-tertiary-fixed-variant)",
        "error": "var(--md-sys-color-error)",
        "error-container": "var(--md-sys-color-error-container)",
        "on-error": "var(--md-sys-color-on-error)",
        "on-error-container": "var(--md-sys-color-on-error-container)",
        "background": "var(--md-sys-color-background)",
        "on-background": "var(--md-sys-color-on-background)",
        "outline": "var(--md-sys-color-outline)",
        "inverse-on-surface": "var(--md-sys-color-inverse-on-surface)",
        "inverse-surface": "var(--md-sys-color-inverse-surface)",
        "inverse-primary": "var(--md-sys-color-inverse-primary)",
        "shadow": "var(--md-sys-color-shadow)",
        "surface-tint": "var(--md-sys-color-surface-tint)",
        "outline-variant": "var(--md-sys-color-outline-variant)",
        "scrim": "var(--md-sys-color-scrim)",
        "surface": "var(--md-sys-color-surface)",
        "on-surface": "var(--md-sys-color-on-surface)",
        "surface-variant": "var(--md-sys-color-surface-variant)",
        "on-surface-variant": "var(--md-sys-color-on-surface-variant)",
        "surface-container-highest": "var(--md-sys-color-surface-container-highest)",
        "surface-container-high": "var(--md-sys-color-surface-container-high)",
        "surface-container": "var(--md-sys-color-surface-container)",
        "surface-container-low": "var(--md-sys-color-surface-container-low)",
        "surface-container-lowest": "var(--md-sys-color-surface-container-lowest)",
        "surface-dim": "var(--md-sys-color-surface-dim)",
        "surface-bright": "var(--md-sys-color-surface-bright)",

          /* primary */
        "primary4": "#1e002b",
        "primary5": "#220030",
        "primary6": "#260035",
        "primary10": "#320046",
        "primary12": "#39004e",
        "primary17": "#450d5a",
        "primary20": "#4c1661",
        "primary22": "#511b66",
        "primary24": "#56216b",
        "primary25": "#58236d",
        "primary30": "#652f7a",
        "primary35": "#723c87",
        "primary40": "#7f4894",
        "primary50": "#9a61ae",
        "primary60": "#b67aca",
        "primary70": "#d294e7",
        "primary80": "#edb1ff",
        "primary87": "#f5ccff",
        "primary90": "#f9d8ff",
        "primary92": "#fbdfff",
        "primary94": "#fde7ff",
        "primary95": "#feebff",
        "primary96": "#ffeffe",
        "primary98": "#fff7fb",
        "primary99": "#fffbff",

        /* secondary */
        "secondary4": "#150a19",
        "secondary5": "#180c1c",
        "secondary6": "#1b0f1f",
        "secondary10": "#241727",
        "secondary12": "#281b2c",
        "secondary17": "#332537",
        "secondary20": "#392c3d",
        "secondary22": "#3e3042",
        "secondary24": "#433446",
        "secondary25": "#453649",
        "secondary30": "#514254",
        "secondary35": "#5d4d60",
        "secondary40": "#69596d",
        "secondary50": "#837186",
        "secondary60": "#9d8ba0",
        "secondary70": "#b9a5bb",
        "secondary80": "#d5c0d7",
        "secondary87": "#e9d3eb",
        "secondary90": "#f1dcf3",
        "secondary92": "#f7e1f9",
        "secondary94": "#fde7ff",
        "secondary95": "#feebff",
        "secondary96": "#ffeffe",
        "secondary98": "#fff7fb",
        "secondary99": "#fffbff",
        
        /* tertiary */
        "tertiary4": "#220505",
        "tertiary5": "#250707",
        "tertiary6": "#280909",
        "tertiary10": "#331110",
        "tertiary12": "#381514",
        "tertiary17": "#441f1e",
        "tertiary20": "#4c2524",
        "tertiary22": "#512928",
        "tertiary24": "#572e2c",
        "tertiary25": "#59302e",
        "tertiary30": "#663b39",
        "tertiary35": "#744644",
        "tertiary40": "#81524f",
        "tertiary50": "#9d6a67",
        "tertiary60": "#ba8380",
        "tertiary70": "#d79d99",
        "tertiary80": "#f5b7b4",
        "tertiary87": "#ffcfcb",
        "tertiary90": "#ffdad7",
        "tertiary92": "#ffe1df",
        "tertiary94": "#ffe9e7",
        "tertiary95": "#ffedeb",
        "tertiary96": "#fff0ef",
        "tertiary98": "#fff8f7",
        "tertiary99": "#fffbff",
      }
    },
  },
  plugins: [],
}
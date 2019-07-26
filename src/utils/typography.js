import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Quicksand', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Droid Sans', 'Open Sans', 'Roboto', 'Georgia', 'serif'],
  googleFonts: [
    {
      name: 'Quicksand',
      styles: [
        '700',
      ],
    },
    {
      name: 'Droid Sans',
      styles: [
        '400',
        '700',
      ],
    },
  ],
})

export const { scale, rhythm, options } = typography
export default typography

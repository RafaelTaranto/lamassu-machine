module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': false
      }
    })
  ],
}

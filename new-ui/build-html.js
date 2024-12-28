const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, 'src')
const publicDir = path.join(__dirname, 'public/assets/images')

// Read and compile the main template
const template = fs.readFileSync(path.join(srcDir, 'templates', 'index.html'), 'utf-8')

// Read screen contents
const screens = {}
fs.readdirSync(path.join(srcDir, 'screens')).forEach(file => {
  const name = path.basename(file, '.html')
  screens[name] = fs.readFileSync(path.join(srcDir, 'screens', file), 'utf-8')
})

// Read SVG contents
const svgs = {}
fs.readdirSync(path.join(publicDir)).forEach(file => {
  const name = path.basename(file, '.svg')
  svgs[name] = fs.readFileSync(path.join(publicDir, file), 'utf-8')
})

const html = ejs.render(template, { screens }, {
  filename: path.join(srcDir, 'templates', 'index.html')
})

const htmlWithSvg = ejs.render(html, { svgs }, {
  filename: path.join(srcDir, 'templates', 'index.html')
})

// Write the result to dist/index.html
fs.writeFileSync(path.join('./', 'index.html'), htmlWithSvg)

console.log('HTML built successfully')
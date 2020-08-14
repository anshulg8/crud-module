const fs = require('fs')
const path = require('path')

function validateDirs() {
  let dir = ['./src', './src/routes', './src/models']
  for (let i = 0; i < dir.length; i++) {
    if (!fs.existsSync(dir[i])){
      fs.mkdirSync(dir[i])
    }
  }
}

function validateFiles(model) {
  let files = [`./src/routes/${model}.js`, `./src/models/${model}.js`]
  for (let i = 0; i < files.length; i++) {
    if (fs.existsSync(files[i])){
      console.log('File already exist')
      return
    }
  }
}

function createModelAsync(file, model) {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw err

    let newValue = data.replace(/Model/g, model)
    location = path.join(__dirname, `/src/models/${model}.js`)

    fs.writeFile(location, newValue, 'utf-8', (err) => {
      if (err) throw err
    })
  })
}

function createRouteAsync(file, model) {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw err

    let newValue = data.replace(/Model/g, model)
    location = path.join(__dirname, `/src/routes/${model}.js`)

    fs.writeFile(location, newValue, 'utf-8', (err) => {
      if (err) throw err
    })
  })
}

function tryMe(model){
  validateDirs()
  validateFiles(model)
  createModelAsync('./model.js', model)
  createRouteAsync('./controller.js', model)
}

export { tryMe }
const fs = require("fs")
const path = require("path")
const cons = require("consolidate")

const writeFiles = ({ packageName, code, mod }) => {
  cons["lodash"]("scripts/_README.md", {packageName, code, mod}, (_, md) =>
    fs.writeFile(`./packages/${packageName}/README.md`, md, (_, __) =>
      console.log(`${packageName} README.md written.`)))

  cons["lodash"]("scripts/_index.html", {packageName, code, mod}, (_, html) =>
    fs.writeFile(`./packages/${packageName}/index.html`, html, (_, __) =>
      console.log(`${packageName} index.html written.`)))
}

fs.readdir("./packages", (err, packages) => {
  if (err) throw err;
  return packages.filter((file) =>
    fs.statSync(path.join("./packages", file)).isDirectory()
  ).forEach(packageName => {
    if (err) throw err;
    return fs.readFile(`./packages/${packageName}/package.json`, "utf8", (err, mod) => {
      if (err) throw err;
      return fs.readFile(`./packages/${packageName}/${packageName}.css`, "utf8", (err, code) => {
        if (err) throw err;
        return writeFiles({packageName, code, mod: JSON.parse(mod)})
      })
    })
  })
})

fs.readdir("./packages", (err, packages) => {
  if (err) throw err;
  return cons["lodash"]("scripts/_package_index.html", {packages}, (err, html) => {
    if (err) throw err;
    fs.writeFile(`./index.html`, html, (_, __) => console.log(`index.html written.`))
  })
})

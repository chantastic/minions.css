const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

const insertMediaQuery = (data, query) =>
`/*!minions.css*/
@media ${query} {${data.replace(/\/\*.+?\*\//, "").replace(/\n$/, "")}
}
`

const insertSuffixes = (data, breakpointName) =>
  data.replace(/{/g, `\\\@${breakpointName}{`)

const writeLibVariants = (packageName, file, rootPath) => {
  const libs = {
    // @custom-media --xs-query (min-width: 320px);
    cssnext: {
      "mn": "(--mn-query)",
      "xs": "(--xs-query)",
      "sm": "(--sm-query)",
      "md": "(--md-query)",
      "lg": "(--lg-query)",
      "xl": "(--xl-query)",
    },
    // @xs-query: ~"(min-width:320px)";
    less: {
      "mn": "@xs-query",
      "xs": "@xs-query",
      "sm": "@xs-query",
      "md": "@xs-query",
      "lg": "@xs-query",
      "xl": "@xs-query",
    },
    // $xs-query: "(min-width: 320px)";
    scss: {
      "mn": "#{$xs-query}",
      "xs": "#{$xs-query}",
      "sm": "#{$xs-query}",
      "md": "#{$xs-query}",
      "lg": "#{$xs-query}",
      "xl": "#{$xs-query}",
    },
  }

  ;["cssnext", "less", "scss"].forEach(lib =>
    mkdirp(`${rootPath}/${packageName}/lib/${lib}/`, () =>
      Object.keys(libs[lib]).map(variant =>
        fs.writeFile(
          `${rootPath}/${packageName}/lib/${lib}/${packageName}--${variant}.css`,
          insertMediaQuery(insertSuffixes(file, variant), libs[lib][variant]),
          "utf8",
          err => {
            if (err) throw err
            console.log(`writing ${lib} ${packageName} ${variant} variant`)
          }
        )
      )
    )
  )
}

const writeDistVariants = (packageName, file, rootPath) => {
  const distributions = {
    bootstrap: {
      "xs": "0px",
      "sm": "567px",
      "md": "768px",
      "lg": "992px",
      "xl": "1200px",
    },
    material: {
      "mn": "0px",
      "xs": "480px",
      "sm": "600px",
      "md": "720px",
      "lg": "960px",
      "xl": "1200px",
    },
  }

  ;["bootstrap", "material"].forEach(dist =>
    mkdirp(`${rootPath}/${packageName}/dist/${dist}/`, () =>
      Object.keys(distributions[dist]).map(variant =>
        fs.writeFile(
          `${rootPath}/${packageName}/dist/${dist}/${packageName}--${variant}.css`,
          insertMediaQuery(insertSuffixes(file, variant), `min-width: ${distributions[dist][variant]}`),
          "utf8",
          err => {
            if (err) throw err
            console.log(`writing ${dist} ${packageName} ${variant} variant`)
          }
        )
      )
    )
  )
}

const packagesPath = "./packages"

fs.readdir(packagesPath, (err, packages) => {
  if (err) throw err
  return packages.filter(file =>
    fs.statSync(path.join(packagesPath, file)).isDirectory()
  ).forEach(packageName =>
    fs.readFile(`${packagesPath}/${packageName}/${packageName}.css`, "utf8", (err, data) => {
      if (err) throw err
      writeLibVariants(packageName, data, packagesPath)
      writeDistVariants(packageName, data, packagesPath)
    })
  )
})

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
      "mn": "screen and (--mn-query)",
      "xs": "screen and (--xs-query)",
      "sm": "screen and (--sm-query)",
      "md": "screen and (--md-query)",
      "lg": "screen and (--lg-query)",
      "xl": "screen and (--xl-query)",
      "print": "screen and (--print-query)",
    },
    // @xs-query: ~"(min-width:320px)";
    less: {
      "mn": "screen and @mn-query",
      "xs": "screen and @xs-query",
      "sm": "screen and @sm-query",
      "md": "screen and @md-query",
      "lg": "screen and @lg-query",
      "xl": "screen and @xl-query",
      "print": "screen and @print-query",
    },
    // $xs-query: "(min-width: 320px)";
    scss: {
      "mn": "screen and #{$mn-query}",
      "xs": "screen and #{$xs-query}",
      "sm": "screen and #{$sm-query}",
      "md": "screen and #{$md-query}",
      "lg": "screen and #{$lg-query}",
      "xl": "screen and #{$xl-query}",
      "print": "screen and #{$print-query}",
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
      "xs": "screen and (min-width: 0px)",
      "sm": "screen and (min-width: 567px)",
      "md": "screen and (min-width: 768px)",
      "lg": "screen and (min-width: 992px)",
      "xl": "screen and (min-width: 1200px)",
      "print": "print",
    },
    material: {
      "mn": "screen and (min-width: 0px)",
      "xs": "screen and (min-width: 480px)",
      "sm": "screen and (min-width: 600px)",
      "md": "screen and (min-width: 720px)",
      "lg": "screen and (min-width: 960px)",
      "xl": "screen and (min-width: 1200px)",
      "print": "print",
    },
  }

  ;["bootstrap", "material"].forEach(dist =>
    mkdirp(`${rootPath}/${packageName}/dist/${dist}/`, () =>
      Object.keys(distributions[dist]).map(variant =>
        fs.writeFile(
          `${rootPath}/${packageName}/dist/${dist}/${packageName}--${variant}.css`,
          insertMediaQuery(insertSuffixes(file, variant), distributions[dist][variant]),
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

## Getting Started

Commence development by initiating the the following commands:

For a production build, change NODE_ENV to "production" in config/config.json, then run :

```bash
npm i --legacy-peer-deps
```

```bash
npm run build
```

To serve the production build, execute:

```bash
npm run serve
```

## Documentation

Explore the complete documentation at [https://catalyst.1mg.com](https://catalyst.1mg.com).

## Changes

1. `react-server-dom-webpack/plugin`
   When this plugin is adding entries of client component in the manifest files in the `recordModule()` function, we are emitting a extra chunk of the client component built for the server component, and modifying the ssr-manifest.json to link the new chunk

```
 function recordModule(id, module) {
    const entrypoint = module.rawRequest
    if (resolvedClientFiles.has(module.resource)) {
        const filePath = pathToFileURL(module.resource).href
        const serverChunkName = `rsc-${id}.js`
        const serverConfig = getConfig({
            entrypoint,
            output: serverChunkName,
        })
        const compiler = webpack(serverConfig)
        compiler.run((err) => {
            console.log("Webpack compile error:", err)
        })
        const moduleRootPath = filePath.split("/src/")[0]
        const newPath = path.join(moduleRootPath, "build", "rsc", `rsc-${id}.js`)

        const ssrExports = {}
        clientManifest[filePath] = { id, chunks, name: "*" }
        ssrExports["*"] = { specifier: newPath, name: "*" }
        moduleMap[id] = ssrExports
    }
}

```

2. While building our RSC server, we have added a plugin that checks if an import is a client component, and excludes it from bundling

```
class ExcludeClientComponent {
    apply(compiler) {
        compiler.hooks.normalModuleFactory.tap("ExcludeClientComponent", (nmf) => {
            nmf.hooks.factorize.tapAsync("ExcludeClientComponent", (resolveData, callback) => {
                if (!resolveData.request) return callback()

                const filePath = path.resolve(resolveData.context, resolveData.request)
                const absolutePath = "file://" + filePath + ".js"

                if (manifest[absolutePath]) {
                    const id = manifest[absolutePath].id
                    const externalModule = new compiler.webpack.ExternalModule(filePath, "commonjs")
                    return callback(null, externalModule)
                }

                callback()
            })
        })
    }
}
```

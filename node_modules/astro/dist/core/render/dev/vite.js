import npath from "path";
import { unwrapId } from "../../util.js";
import { STYLE_EXTENSIONS } from "../util.js";
const fileExtensionsToSSR = /* @__PURE__ */ new Set([".astro", ".md"]);
const STRIP_QUERY_PARAMS_REGEX = /\?.*$/;
async function* crawlGraph(viteServer, _id, isRootFile, scanned = /* @__PURE__ */ new Set()) {
  const id = unwrapId(_id);
  const importedModules = /* @__PURE__ */ new Set();
  const moduleEntriesForId = isRootFile ? viteServer.moduleGraph.getModulesByFile(id) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([viteServer.moduleGraph.getModuleById(id)]);
  for (const entry of moduleEntriesForId) {
    if (!entry) {
      continue;
    }
    if (id === entry.id) {
      scanned.add(id);
      const entryIsStyle = STYLE_EXTENSIONS.has(npath.extname(id));
      for (const importedModule of entry.importedModules) {
        if (importedModule.id) {
          const importedModulePathname = importedModule.id.replace(STRIP_QUERY_PARAMS_REGEX, "");
          if (entryIsStyle && !STYLE_EXTENSIONS.has(npath.extname(importedModulePathname))) {
            continue;
          }
          if (fileExtensionsToSSR.has(npath.extname(importedModulePathname))) {
            const mod = viteServer.moduleGraph.getModuleById(importedModule.id);
            if (!(mod == null ? void 0 : mod.ssrModule)) {
              try {
                await viteServer.ssrLoadModule(importedModule.id);
              } catch {
              }
            }
          }
        }
        importedModules.add(importedModule);
      }
    }
  }
  for (const importedModule of importedModules) {
    if (!importedModule.id || scanned.has(importedModule.id)) {
      continue;
    }
    yield importedModule;
    yield* crawlGraph(viteServer, importedModule.id, false, scanned);
  }
}
export {
  crawlGraph
};

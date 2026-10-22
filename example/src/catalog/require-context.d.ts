// Metro의 require.context (transformer.unstable_allowRequireContext)
interface MetroRequireContext {
  keys(): string[];
  (id: string): unknown;
}

interface NodeRequire {
  context(
    directory: string,
    recursive?: boolean,
    filter?: RegExp
  ): MetroRequireContext;
}

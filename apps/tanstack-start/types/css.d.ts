declare module "csstype" {
  interface Properties {
    [key: `--${string}`]: string | number | undefined;
  }
}

declare module "*?url" {
  const src: string;
  export default src;
}

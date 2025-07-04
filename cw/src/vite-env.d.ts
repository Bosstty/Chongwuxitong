// src/vite-env.d.ts
/// <reference types="vite/client" />
declare interface ImportMeta {
    readonly glob: (pattern: string) => Record<string, () => Promise<{ default: string }>>;
}

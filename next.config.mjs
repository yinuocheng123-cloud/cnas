import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 明确限定构建追踪根目录，避免上级目录 lockfile 影响部署产物判断。
  outputFileTracingRoot: projectRoot,
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;

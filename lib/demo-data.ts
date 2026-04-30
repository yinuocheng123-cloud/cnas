/*
 * 文件说明：该文件保留 Demo 数据入口的兼容导出。
 * 功能说明：将旧的 demo 数据入口映射到当前杭育 CNAS 站点数据，避免后续代理误以为这里还有独立数据源。
 *
 * 结构概览：
 *   第一部分：兼容导出
 */

// ========== 第一部分：兼容导出 ==========
export { articles as demoItems, homeStats as demoMetrics } from "./site-data";

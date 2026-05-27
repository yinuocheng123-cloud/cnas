/*
 * 文件说明：该文件实现 CNAS 内容控制台登录页。
 * 功能说明：展示账号密码登录表单，提交到服务端 route 校验，前端不保存也不展示密码。
 *
 * 结构概览：
 *   第一部分：页面参数
 *   第二部分：登录页渲染
 */

// ========== 第一部分：页面参数 ==========
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";
  const next = params.next?.startsWith("/admin") ? params.next : "/admin";

  // ========== 第二部分：登录页渲染 ==========
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07172b] px-5 py-10 text-[#142033]">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b78b49]">CNAS Content Console</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0b1d35]">CNAS内容控制台登录</h1>
        <p className="mt-3 text-sm leading-6 text-[#667085]">请输入后台账号和密码。登录状态通过 httpOnly cookie 保存，密码不会暴露到前端脚本。</p>

        {hasError ? (
          <div className="mt-5 rounded-2xl border border-[#f6c3b7] bg-[#fff4f0] px-4 py-3 text-sm text-[#b42318]">
            账号或密码不正确，请重新输入。
          </div>
        ) : null}

        <form className="mt-6 space-y-4" action="/admin/login/actions" method="post">
          <input type="hidden" name="next" value={next} />
          <label className="block">
            <span className="text-sm font-semibold text-[#344054]">账号</span>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]"
              name="username"
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#344054]">密码</span>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="w-full rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132b4d]" type="submit">
            登录后台
          </button>
        </form>
      </section>
    </main>
  );
}

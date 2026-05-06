/*
 * 文件说明：该文件实现通用区块标题组件。
 * 功能说明：统一栏目标题和说明文字的排版层级。
 *
 * 结构概览：
 *   第一部分：SectionTitle 组件
 */

// ========== 第一部分：SectionTitle 组件 ==========
export function SectionTitle({
  title,
  description,
  descriptionClassName,
}: {
  title: string;
  description?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-heading">{title}</h2>
      {description ? <p className={descriptionClassName ?? "max-w-2xl text-copy"}>{description}</p> : null}
    </div>
  );
}

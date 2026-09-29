export function cleanMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/<!--[\s\S]*?-->/g, "") // comments
    .replace(/<[^>]+>/g, "") // inline HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // image embeds
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, "") // linked badges/shields
    .replace(/^\s*[-*]\s*\[[^\]]+\]\(#[^)]+\)\s*$/gm, "") // TOC anchors
    .replace(/```([\s\S]*?)```/g, (m, body) => {
      // trim overly long code blocks to preserve token budget
      const lines = body.split("\n");
      return lines.length > 40
        ? "```" + lines.slice(0, 40).join("\n") + "\n// …[truncated for indexing]\n```"
        : m;
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

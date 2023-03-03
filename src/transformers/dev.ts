import { createContentTransformer } from "./transformer";

const devToTransformer = createContentTransformer({
  applyInlineFormatting(type, attrs, content) {
    switch (type) {
      case "link":
        return `[${content}](${attrs.href})`;
      case "bold":
        return `**${content}**`;

      case "code":
        return `\`${content}\``;

      case "italic":
        return `*${content}*`;

      case "strike":
        return `~~${content}~~`;

      default:
        return content;
    }
  },
  transformNode(type, attrs, content) {
    switch (type) {
      case "paragraph":
        return `\n${content}\n`;
      case "heading":
        return `\n${"#".repeat(Number(attrs?.level || 1))} ${content}\n`;
      case "blockquote":
        return `\n> ${content}\n`;
      case "image":
        return `\n![${attrs?.alt || ""}](${attrs?.src || ""})\n`;
      case "code-block":
        return `\n\`\`\`${attrs?.lang || ""}\n${content}\n\`\`\`\n`;
      case "embed":
        return `\n{% embed ${attrs?.src || ""} %}\n`;
      case "bulletList":
        return `\n${content
          .split("\n")
          .filter((listItem) => listItem)
          .map((listItem) => `- ${listItem}`)
          .join("\n\n")}\n`;
      case "orderedList":
        return `\n${content
          .split("\n")
          .filter((listItem) => listItem)
          .map(
            (listItem, index) =>
              `${Number(attrs.start ?? 1) + index}. ${listItem}`
          )
          .join("\n\n")}\n`;
      case "horizontalRule":
        return `\n---\n`;
      default:
        return content;
    }
  },
});

export { devToTransformer };

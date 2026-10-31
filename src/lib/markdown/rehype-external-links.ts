// mdsvex rehype plugin: absolute http(s) links in posts open in a new tab.

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

export function rehypeExternalLinks() {
  return (tree: HastNode) => {
    const visit = (node: HastNode) => {
      const href = node.properties?.href;
      if (node.tagName === 'a' && typeof href === 'string' && /^https?:\/\//.test(href)) {
        node.properties = { ...node.properties, target: '_blank', rel: 'noopener' };
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

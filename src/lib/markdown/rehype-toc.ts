// mdsvex rehype plugin: gives every h2 an id and adds the list to the front matter as `toc`,
// so `metadata.toc` feeds the "On this page" navigation. Runs at build time only.

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

export interface TocEntry {
  id: string;
  text: string;
}

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function rehypeToc() {
  return (tree: HastNode, file: { data: { fm?: Record<string, unknown> } }) => {
    const toc: TocEntry[] = [];
    const seen = new Map<string, number>();
    const visit = (node: HastNode) => {
      if (node.type === 'element' && node.tagName === 'h2') {
        const text = textOf(node).trim();
        const base = slugify(text) || 'section';
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        const id = count ? `${base}-${count + 1}` : base;
        node.properties = { ...node.properties, id };
        toc.push({ id, text });
        return;
      }
      node.children?.forEach(visit);
    };
    visit(tree);
    if (file.data.fm) file.data.fm.toc = toc;
  };
}

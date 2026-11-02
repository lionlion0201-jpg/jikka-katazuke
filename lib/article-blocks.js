/**
 * 記事ページの見た目の部品を、ビルド時に HTML へ付ける(2026-11-02)。
 *
 * 記事の Markdown には手を入れずに済むよう、決まった書き出しの段落と見出しを目印にする。
 * 週次パイプラインが書く新しい記事も、同じ書き方に従えば自動で同じ見た目になる。
 *
 * - 「先に結論をまとめると、」で始まる段落 → 結論の囲み(.summary-box)
 * - 「## 依頼する前に確認したいこと」の直後のリスト(前置きの1段落は可) → チェックリスト(.checklist)
 */
function addArticleBlocks(content, outputPath) {
  if (!outputPath || !outputPath.endsWith(".html") || !outputPath.includes("/posts/")) return content;

  content = content.replace(
    /<p>先に結論をまとめると、([\s\S]*?)<\/p>/,
    '<div class="summary-box"><p class="summary-label">この記事の結論</p><p>$1</p></div>'
  );

  content = content.replace(
    /(<h2[^>]*>依頼する前に確認したいこと<\/h2>\s*(?:<p>[^<]*<\/p>\s*)?)<ul>([\s\S]*?)<\/ul>/,
    '<section class="checklist">$1<ul>$2</ul></section>'
  );

  return content;
}

module.exports = { addArticleBlocks };

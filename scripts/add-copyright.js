#!/usr/bin/env node

/**
 * すべてのcontent/配下のMarkdownファイルに著作権表示を追加するスクリプト
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const TERMS_PATH = 'docs/terms-of-use.md';

// 著作権表示のテンプレート
const COPYRIGHT_NOTICE = `

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../docs/terms-of-use.md)をご覧ください。
`;

// READMEファイル用の著作権表示（パスが異なる）
const COPYRIGHT_NOTICE_README = `

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
`;

// サブディレクトリのREADME用
const COPYRIGHT_NOTICE_SUBDIR_README = `

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
`;

function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function getRelativeDepth(filePath) {
  const relativePath = path.relative(path.join(__dirname, '..', 'content'), filePath);
  const depth = relativePath.split(path.sep).length - 1;
  return depth;
}

function getCopyrightNotice(filePath) {
  const depth = getRelativeDepth(filePath);
  const fileName = path.basename(filePath);
  
  if (fileName === 'README.md') {
    if (depth === 0) {
      // content/直下のREADME
      return COPYRIGHT_NOTICE_README;
    } else {
      // サブディレクトリのREADME
      return COPYRIGHT_NOTICE_SUBDIR_README;
    }
  } else {
    // 通常のコンテンツファイル
    if (depth === 0) {
      return COPYRIGHT_NOTICE;
    } else if (depth === 1) {
      return COPYRIGHT_NOTICE;
    } else {
      // 深い階層のファイル
      const relativePath = '../'.repeat(depth) + TERMS_PATH;
      return `

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](${relativePath})をご覧ください。
`;
    }
  }
}

function addCopyrightToFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 既に著作権表示がある場合はスキップ
    if (content.includes('Copyright © 2024 Honeycome Inc.') || 
        content.includes('著作権表示')) {
      console.log(`⏭️  スキップ: ${filePath} (既に著作権表示があります)`);
      return false;
    }

    // ファイルの最後に著作権表示を追加
    const copyrightNotice = getCopyrightNotice(filePath);
    content = content.trimEnd() + copyrightNotice;
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 追加完了: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ エラー: ${filePath}`, error.message);
    return false;
  }
}

function main() {
  console.log('📝 著作権表示の追加を開始します...\n');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ エラー: ${CONTENT_DIR} が見つかりません`);
    process.exit(1);
  }

  const markdownFiles = getAllMarkdownFiles(CONTENT_DIR);
  console.log(`📄 ${markdownFiles.length}個のMarkdownファイルが見つかりました\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  markdownFiles.forEach(file => {
    const result = addCopyrightToFile(file);
    if (result === true) {
      successCount++;
    } else if (result === false && !file.includes('Copyright')) {
      skipCount++;
    } else {
      errorCount++;
    }
  });

  console.log(`\n📊 処理結果:`);
  console.log(`  ✅ 追加完了: ${successCount}ファイル`);
  console.log(`  ⏭️  スキップ: ${skipCount}ファイル`);
  console.log(`  ❌ エラー: ${errorCount}ファイル`);
  console.log(`\n✨ 処理が完了しました！`);
}

main();

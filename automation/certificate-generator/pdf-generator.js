const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * PDF修了証を生成するクラス
 */
class PDFGenerator {
  constructor() {
    this.browser = null;
  }

  /**
   * ブラウザを起動
   */
  async launchBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    return this.browser;
  }

  /**
   * ブラウザを閉じる
   */
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * HTMLファイルからPDFを生成
   */
  async generateFromHTML(htmlPath, outputPath) {
    try {
      const browser = await this.launchBrowser();
      const page = await browser.newPage();

      // HTMLファイルを読み込む
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      
      // データURLとして読み込む
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
      await page.goto(dataUrl, { waitUntil: 'networkidle0' });

      // PDFを生成
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0mm',
          right: '0mm',
          bottom: '0mm',
          left: '0mm'
        }
      });

      await page.close();
      return outputPath;
    } catch (error) {
      console.error('PDF生成中にエラーが発生しました:', error);
      throw error;
    }
  }

  /**
   * HTML文字列から直接PDFを生成
   */
  async generateFromHTMLString(htmlContent, outputPath) {
    try {
      const browser = await this.launchBrowser();
      const page = await browser.newPage();

      // データURLとして読み込む
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
      await page.goto(dataUrl, { waitUntil: 'networkidle0' });

      // PDFを生成
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0mm',
          right: '0mm',
          bottom: '0mm',
          left: '0mm'
        }
      });

      await page.close();
      return outputPath;
    } catch (error) {
      console.error('PDF生成中にエラーが発生しました:', error);
      throw error;
    }
  }

  /**
   * 修了証のPDFを生成
   */
  async generateCertificate(htmlContent, outputDir, filename) {
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${filename}.pdf`);
    await this.generateFromHTMLString(htmlContent, outputPath);

    return outputPath;
  }
}

module.exports = PDFGenerator;

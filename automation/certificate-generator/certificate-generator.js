const fs = require('fs');
const path = require('path');

/**
 * 修了証を生成するクラス
 */
class CertificateGenerator {
  constructor(data, templatesDir) {
    this.data = data;
    this.templatesDir = templatesDir || path.join(__dirname, 'templates');
  }

  /**
   * コース名を日本語に変換
   */
  getCourseName(course) {
    const courseNames = {
      'common': '共通基礎',
      'web': 'Webエンジニアコース',
      'mobile': 'モバイルエンジニアコース',
      'iot': 'IoTエンジニアコース'
    };
    return courseNames[course] || course;
  }

  /**
   * 日付をフォーマット
   */
  formatDate(dateString) {
    if (!dateString) return new Date().toISOString().split('T')[0];
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return dateString;
    }
  }

  /**
   * Markdown修了証を生成
   */
  generateMarkdown() {
    const templatePath = path.join(this.templatesDir, 'certificate-template.md');
    let template = fs.readFileSync(templatePath, 'utf8');

    const replacements = {
      '{{STUDENT_NAME}}': this.data.basicInfo.studentName || '研修生',
      '{{COURSE_NAME}}': this.getCourseName(this.data.course),
      '{{COMPLETION_DATE}}': this.formatDate(this.data.completionDate),
      '{{MENTOR_NAME}}': this.data.basicInfo.mentorName || 'メンター',
      '{{ISSUE_DATE}}': this.formatDate(new Date()),
      '{{SIGNATURE_DATE}}': this.formatDate(new Date())
    };

    Object.keys(replacements).forEach(key => {
      template = template.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), replacements[key]);
    });

    return template;
  }

  /**
   * HTML修了証を生成（PDF生成用）
   */
  generateHTML() {
    const templatePath = path.join(this.templatesDir, 'certificate-template.html');
    let template = fs.readFileSync(templatePath, 'utf8');

    const replacements = {
      '{{STUDENT_NAME}}': this.data.basicInfo.studentName || '研修生',
      '{{COURSE_NAME}}': this.getCourseName(this.data.course),
      '{{COMPLETION_DATE}}': this.formatDate(this.data.completionDate),
      '{{MENTOR_NAME}}': this.data.basicInfo.mentorName || 'メンター',
      '{{ISSUE_DATE}}': this.formatDate(new Date())
    };

    Object.keys(replacements).forEach(key => {
      template = template.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), replacements[key]);
    });

    return template;
  }

  /**
   * 修了証をファイルに保存
   */
  save(outputDir, studentName, course) {
    const date = this.formatDate(new Date());
    const filename = `certificate-${course}-${date}`;

    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Markdown版を保存
    const markdown = this.generateMarkdown();
    const mdPath = path.join(outputDir, `${filename}.md`);
    fs.writeFileSync(mdPath, markdown, 'utf8');

    // HTML版を保存（PDF生成用）
    const html = this.generateHTML();
    const htmlPath = path.join(outputDir, `${filename}.html`);
    fs.writeFileSync(htmlPath, html, 'utf8');

    return {
      markdown: mdPath,
      html: htmlPath,
      filename: filename
    };
  }
}

module.exports = CertificateGenerator;

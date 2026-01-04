const DataCollector = require('./data-collector');
const CompletionDetector = require('./completion-detector');
const CertificateGenerator = require('./certificate-generator');
const ReportGenerator = require('./report-generator');
const PDFGenerator = require('./pdf-generator');
const fs = require('fs');
const path = require('path');

/**
 * 修了証と評価レポート生成のメインエントリーポイント
 */
class CertificateSystem {
  constructor(studentName, course, githubToken = null, owner = null, repo = null) {
    this.studentName = studentName;
    this.course = course;
    this.githubToken = githubToken;
    this.owner = owner;
    this.repo = repo;
  }

  /**
   * すべての処理を実行
   */
  async generate() {
    try {
      console.log(`[${this.studentName}] ${this.course}コースの修了証と評価レポートを生成します...`);

      // 1. 完了を検知
      const detector = new CompletionDetector(this.studentName, this.course);
      const completion = await detector.checkCompletion();

      if (!completion.isCompleted) {
        console.log(`[${this.studentName}] コースが完了していません。`);
        return {
          success: false,
          message: 'コースが完了していません',
          completion: completion
        };
      }

      // 2. 既に修了証が生成されているか確認
      if (detector.hasCertificateGenerated()) {
        console.log(`[${this.studentName}] 既に修了証が生成されています。`);
        return {
          success: false,
          message: '既に修了証が生成されています',
          completion: completion
        };
      }

      // 3. データを収集
      console.log(`[${this.studentName}] データを収集しています...`);
      const dataCollector = new DataCollector(this.studentName, this.course, this.githubToken);
      const data = await dataCollector.collectAll(this.owner, this.repo);
      data.course = this.course;
      data.completionDate = completion.completionDate;

      // 4. 修了証を生成
      console.log(`[${this.studentName}] 修了証を生成しています...`);
      const certGenerator = new CertificateGenerator(data);
      const outputDir = path.join('progress', 'students', this.studentName, 'certificates');
      const certFiles = certGenerator.save(outputDir, this.studentName, this.course);

      // 5. PDF修了証を生成
      console.log(`[${this.studentName}] PDF修了証を生成しています...`);
      const pdfGenerator = new PDFGenerator();
      try {
        const htmlContent = fs.readFileSync(certFiles.html, 'utf8');
        const pdfPath = await pdfGenerator.generateCertificate(
          htmlContent,
          outputDir,
          certFiles.filename
        );
        await pdfGenerator.closeBrowser();
        certFiles.pdf = pdfPath;
      } catch (error) {
        console.warn(`[${this.studentName}] PDF生成に失敗しました:`, error.message);
        // PDF生成に失敗しても続行
      }

      // 6. 評価レポートを生成
      console.log(`[${this.studentName}] 評価レポートを生成しています...`);
      const reportGenerator = new ReportGenerator(data);
      const reportDir = path.join('progress', 'students', this.studentName, 'reports');
      const reportPath = reportGenerator.save(reportDir, this.studentName, this.course);

      console.log(`[${this.studentName}] 生成が完了しました。`);

      return {
        success: true,
        certificate: certFiles,
        report: reportPath,
        data: data
      };
    } catch (error) {
      console.error(`[${this.studentName}] エラーが発生しました:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

/**
 * 全研修生のリストを取得
 */
function getAllStudents() {
  const studentsDir = path.join('progress', 'students');
  if (!fs.existsSync(studentsDir)) {
    return [];
  }
  
  return fs.readdirSync(studentsDir).filter(item => {
    const itemPath = path.join(studentsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
}

/**
 * 一括生成を実行
 */
async function generateAll(course, githubToken = null, owner = null, repo = null) {
  const students = getAllStudents();
  
  if (students.length === 0) {
    console.log('研修生が見つかりませんでした。');
    return { success: false, message: '研修生が見つかりませんでした' };
  }

  console.log(`${students.length}名の研修生の修了証と評価レポートを生成します...`);
  
  const results = [];
  for (const studentName of students) {
    try {
      const system = new CertificateSystem(studentName, course, githubToken, owner, repo);
      const result = await system.generate();
      results.push({
        studentName,
        ...result
      });
    } catch (error) {
      console.error(`[${studentName}] エラー:`, error);
      results.push({
        studentName,
        success: false,
        error: error.message
      });
    }
  }

  const successCount = results.filter(r => r.success).length;
  const failCount = results.length - successCount;

  console.log(`\n生成完了: 成功 ${successCount}件, 失敗 ${failCount}件`);

  return {
    success: true,
    total: results.length,
    successCount,
    failCount,
    results
  };
}

// コマンドライン実行時の処理
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('使用方法: node index.js <student-name|all> <course> [github-token] [owner] [repo]');
    console.error('例: node index.js yamada common');
    console.error('例: node index.js all common  # 全研修生を一括生成');
    process.exit(1);
  }

  const studentName = args[0];
  const course = args[1];
  const githubToken = args[2] || process.env.GITHUB_TOKEN || null;
  const owner = args[3] || process.env.GITHUB_OWNER || null;
  const repo = args[4] || process.env.GITHUB_REPO || null;

  // 一括生成
  if (studentName === 'all') {
    generateAll(course, githubToken, owner, repo)
      .then(result => {
        if (result.success) {
          console.log('✅ 一括生成完了');
          console.log(`成功: ${result.successCount}件, 失敗: ${result.failCount}件`);
          process.exit(0);
        } else {
          console.error('❌ 一括生成失敗:', result.message || result.error);
          process.exit(1);
        }
      })
      .catch(error => {
        console.error('❌ エラー:', error);
        process.exit(1);
      });
  } else {
    // 単一生成
    const system = new CertificateSystem(studentName, course, githubToken, owner, repo);
    system.generate()
      .then(result => {
        if (result.success) {
          console.log('✅ 生成成功');
          console.log('修了証:', result.certificate);
          console.log('評価レポート:', result.report);
          process.exit(0);
        } else {
          console.error('❌ 生成失敗:', result.message || result.error);
          process.exit(1);
        }
      })
      .catch(error => {
        console.error('❌ エラー:', error);
        process.exit(1);
      });
  }
}

module.exports = CertificateSystem;

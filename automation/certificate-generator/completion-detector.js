const fs = require('fs');
const path = require('path');
const DataCollector = require('./data-collector');

/**
 * コース完了を検知するクラス
 */
class CompletionDetector {
  constructor(studentName, course) {
    this.studentName = studentName;
    this.course = course;
    this.dataCollector = new DataCollector(studentName, course);
  }

  /**
   * 共通基礎コースの完了を判定
   */
  isCommonCourseCompleted(categories) {
    // 全10カテゴリが完了しているか確認
    const requiredCategories = 10;
    const completedCategories = categories.filter(cat => cat.isCompleted);
    
    if (completedCategories.length < requiredCategories) {
      return false;
    }

    // 各カテゴリのテストと課題が完了しているか確認
    // 進捗ファイルのテーブルから「テスト」と「課題」列を確認
    const content = this.dataCollector.readProgressFile();
    const commonSectionStart = content.indexOf('## 共通基礎');
    if (commonSectionStart === -1) return false;

    const commonSectionEnd = content.indexOf('---', commonSectionStart + 1);
    const commonSection = commonSectionEnd !== -1
      ? content.substring(commonSectionStart, commonSectionEnd)
      : content.substring(commonSectionStart);

    // 各行をチェック
    const rows = commonSection.match(/\|\s*\d+\s*\|\s*[^|]+\s*\|\s*[^|]+\s*\|\s*[^|]+\s*\|\s*[^|]+\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g);
    if (!rows) return false;

    let allCompleted = true;
    rows.forEach(row => {
      const parts = row.split('|').map(p => p.trim()).filter(p => p);
      if (parts.length >= 7) {
        const testStatus = parts[5]; // テスト列
        const exerciseStatus = parts[6]; // 課題列
        
        // テストと課題の両方が完了している必要がある
        if (!testStatus.includes('✅') || !exerciseStatus.includes('✅')) {
          allCompleted = false;
        }
      }
    });

    return allCompleted;
  }

  /**
   * Web/モバイル/IoTコースの完了を判定
   */
  isSpecializedCourseCompleted(categories, capstoneEvaluation) {
    // 全5カテゴリ（応用演習含む）が完了しているか確認
    const requiredCategories = 5;
    const completedCategories = categories.filter(cat => cat.isCompleted);
    
    if (completedCategories.length < requiredCategories) {
      return false;
    }

    // 応用演習の評価が完了しているか確認
    if (!capstoneEvaluation || !capstoneEvaluation.scores) {
      return false;
    }

    // 応用演習の評価項目がすべて記入されているか確認
    const requiredEvalItems = ['機能', 'コード品質', '設計', 'プレゼン'];
    const hasAllEvalItems = requiredEvalItems.every(item => 
      capstoneEvaluation.scores[item] && capstoneEvaluation.scores[item].stars > 0
    );

    return hasAllEvalItems;
  }

  /**
   * コース完了を判定
   */
  async checkCompletion() {
    try {
      const data = await this.dataCollector.collectAll();
      
      let isCompleted = false;
      let completionDate = null;

      if (this.course === 'common') {
        isCompleted = this.isCommonCourseCompleted(data.categories);
      } else if (['web', 'mobile', 'iot'].includes(this.course)) {
        isCompleted = this.isSpecializedCourseCompleted(
          data.categories,
          data.capstoneEvaluation
        );
      }

      // 完了日を取得（最後に完了したカテゴリの日付）
      if (isCompleted && data.categories.length > 0) {
        const completedCategories = data.categories
          .filter(cat => cat.isCompleted && cat.completionDate)
          .sort((a, b) => {
            const dateA = new Date(a.completionDate);
            const dateB = new Date(b.completionDate);
            return dateB - dateA; // 降順
          });
        
        if (completedCategories.length > 0) {
          completionDate = completedCategories[0].completionDate;
        }
      }

      return {
        isCompleted: isCompleted,
        completionDate: completionDate,
        data: data
      };
    } catch (error) {
      console.error('完了判定中にエラーが発生しました:', error);
      return {
        isCompleted: false,
        completionDate: null,
        data: null,
        error: error.message
      };
    }
  }

  /**
   * 既に修了証が生成されているか確認
   */
  hasCertificateGenerated() {
    const certificateDir = path.join(
      'progress',
      'students',
      this.studentName,
      'certificates'
    );

    if (!fs.existsSync(certificateDir)) {
      return false;
    }

    // このコースの修了証ファイルを検索
    const files = fs.readdirSync(certificateDir);
    const coursePattern = new RegExp(`certificate-${this.course}-.*\\.(pdf|md)$`);
    
    return files.some(file => coursePattern.test(file));
  }
}

module.exports = CompletionDetector;

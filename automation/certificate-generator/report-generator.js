const fs = require('fs');
const path = require('path');

/**
 * 評価レポートを生成するクラス
 */
class ReportGenerator {
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
   * 期間を計算
   */
  calculateDuration(startDate, completionDate) {
    if (!startDate || !completionDate) return '不明';
    
    try {
      const start = new Date(startDate);
      const end = new Date(completionDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return `${diffDays}日`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        const days = diffDays % 30;
        return days > 0 ? `${months}ヶ月${days}日` : `${months}ヶ月`;
      } else {
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        return months > 0 ? `${years}年${months}ヶ月` : `${years}年`;
      }
    } catch (e) {
      return '不明';
    }
  }

  /**
   * カテゴリサマリーを生成
   */
  generateCategoriesSummary() {
    if (!this.data.categories || this.data.categories.length === 0) {
      return '完了カテゴリなし';
    }

    const completed = this.data.categories.filter(cat => cat.isCompleted);
    return `完了: ${completed.length}/${this.data.categories.length}カテゴリ`;
  }

  /**
   * テスト結果テーブルを生成
   */
  generateTestResultsTable() {
    if (!this.data.testResults || this.data.testResults.length === 0) {
      return 'テスト結果なし';
    }

    let table = '| カテゴリ | 実施日 | 結果 |\n';
    table += '|----------|--------|------|\n';

    this.data.testResults.forEach(result => {
      table += `| ${result.category} | ${result.date || '-'} | ${result.result} |\n`;
    });

    return table;
  }

  /**
   * テスト統計を計算
   */
  calculateTestStatistics() {
    if (!this.data.testResults || this.data.testResults.length === 0) {
      return { average: 0, max: 0, min: 0 };
    }

    const scores = this.data.testResults
      .filter(r => r.score && r.score.percentage)
      .map(r => r.score.percentage);

    if (scores.length === 0) {
      return { average: 0, max: 0, min: 0 };
    }

    return {
      average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      max: Math.max(...scores),
      min: Math.min(...scores)
    };
  }

  /**
   * 苦手分野を分析
   */
  analyzeWeakAreas() {
    if (!this.data.testResults || this.data.testResults.length === 0) {
      return 'データ不足のため分析できません';
    }

    const weakAreas = this.data.testResults
      .filter(r => r.score && r.score.percentage < 70)
      .map(r => `- ${r.category}: ${r.score.percentage}%`);

    if (weakAreas.length === 0) {
      return '特に苦手分野は見られませんでした。';
    }

    return `以下の分野で改善の余地があります:\n\n${weakAreas.join('\n')}`;
  }

  /**
   * PR統計テーブルを生成
   */
  generatePRStatisticsTable() {
    if (!this.data.prStatistics) {
      return 'PR統計データなし';
    }

    const stats = this.data.prStatistics;
    let table = '| 項目 | 値 |\n';
    table += '|------|------|\n';
    table += `| 総PR数 | ${stats.total}件 |\n`;
    table += `| 承認済み | ${stats.merged}件 |\n`;
    table += `| 承認率 | ${stats.total > 0 ? Math.round((stats.merged / stats.total) * 100) : 0}% |\n`;
    
    if (stats.averageReviewTime !== null) {
      table += `| 平均レビュー時間 | ${Math.round(stats.averageReviewTime * 10) / 10}時間 |\n`;
    }
    
    table += `| 再提出回数 | ${stats.resubmissionCount}回 |\n`;

    return table;
  }

  /**
   * メンターフィードバックセクションを生成
   */
  generateMentorFeedbackSection() {
    if (!this.data.oneOnOneMemos || this.data.oneOnOneMemos.length === 0) {
      return '1on1メモが記録されていません';
    }

    let section = '';
    this.data.oneOnOneMemos.forEach(memo => {
      section += `### ${memo.date}\n\n`;
      if (memo.motivation) {
        section += `**モチベーション**: ${memo.motivation}\n\n`;
      }
      if (memo.feedback) {
        section += `**フィードバック**:\n${memo.feedback}\n\n`;
      }
      section += '---\n\n';
    });

    return section;
  }

  /**
   * 成長ポイントを抽出
   */
  extractGrowthPoints() {
    if (!this.data.oneOnOneMemos || this.data.oneOnOneMemos.length === 0) {
      return 'データ不足のため抽出できません';
    }

    // フィードバックから成長ポイントを抽出（簡易版）
    const positiveKeywords = ['成長', '向上', '改善', '良くなった', '理解', '習得'];
    const growthPoints = [];

    this.data.oneOnOneMemos.forEach(memo => {
      if (memo.feedback) {
        positiveKeywords.forEach(keyword => {
          if (memo.feedback.includes(keyword)) {
            growthPoints.push(`- ${memo.date}: ${memo.feedback.substring(0, 100)}...`);
          }
        });
      }
    });

    return growthPoints.length > 0 
      ? growthPoints.join('\n')
      : '1on1メモから成長ポイントを抽出できませんでした。';
  }

  /**
   * 自己診断の推移を生成（簡易版）
   */
  generateSelfAssessmentCharts() {
    if (!this.data.selfAssessments || this.data.selfAssessments.length === 0) {
      return {
        motivation: 'データなし',
        difficulty: 'データなし',
        energy: 'データなし',
        averages: { motivation: 0, difficulty: 0, energy: 0 }
      };
    }

    const assessments = this.data.selfAssessments.filter(a => 
      a.motivation !== null || a.difficulty !== null || a.energy !== null
    );

    if (assessments.length === 0) {
      return {
        motivation: 'データなし',
        difficulty: 'データなし',
        energy: 'データなし',
        averages: { motivation: 0, difficulty: 0, energy: 0 }
      };
    }

    // 平均値を計算
    const motivationScores = assessments.filter(a => a.motivation !== null).map(a => a.motivation);
    const difficultyScores = assessments.filter(a => a.difficulty !== null).map(a => a.difficulty);
    const energyScores = assessments.filter(a => a.energy !== null).map(a => a.energy);

    const avgMotivation = motivationScores.length > 0
      ? (motivationScores.reduce((a, b) => a + b, 0) / motivationScores.length).toFixed(1)
      : 0;
    const avgDifficulty = difficultyScores.length > 0
      ? (difficultyScores.reduce((a, b) => a + b, 0) / difficultyScores.length).toFixed(1)
      : 0;
    const avgEnergy = energyScores.length > 0
      ? (energyScores.reduce((a, b) => a + b, 0) / energyScores.length).toFixed(1)
      : 0;

    // 簡易チャート（テキストベース）
    const motivationChart = this.generateTextChart(motivationScores, 'モチベーション');
    const difficultyChart = this.generateTextChart(difficultyScores, '難易度');
    const energyChart = this.generateTextChart(energyScores, 'エネルギーレベル');

    return {
      motivation: motivationChart,
      difficulty: difficultyChart,
      energy: energyChart,
      averages: {
        motivation: parseFloat(avgMotivation),
        difficulty: parseFloat(avgDifficulty),
        energy: parseFloat(avgEnergy)
      }
    };
  }

  /**
   * テキストチャートを生成
   */
  generateTextChart(scores, label) {
    if (scores.length === 0) return 'データなし';

    let chart = `\`\`\`\n${label}の推移:\n`;
    scores.forEach((score, index) => {
      const bars = '█'.repeat(score);
      chart += `${index + 1}: ${bars} (${score}/5)\n`;
    });
    chart += '```\n';

    return chart;
  }

  /**
   * 応用演習評価セクションを生成
   */
  generateCapstoneEvaluationSection() {
    if (!this.data.capstoneEvaluation) {
      return '応用演習の評価が記録されていません';
    }

    const evaluation = this.data.capstoneEvaluation;
    let section = '';

    if (evaluation.theme) {
      section += `**テーマ**: ${evaluation.theme}\n\n`;
    }
    if (evaluation.repository) {
      section += `**リポジトリ**: ${evaluation.repository}\n\n`;
    }
    if (evaluation.deployUrl) {
      section += `**デプロイURL**: ${evaluation.deployUrl}\n\n`;
    }

    if (evaluation.scores) {
      section += '### 評価結果\n\n';
      section += '| 項目 | 評価 | コメント |\n';
      section += '|------|------|----------|\n';
      
      Object.keys(evaluation.scores).forEach(item => {
        const score = evaluation.scores[item];
        section += `| ${item} | ${score.score} | ${score.comment || '-'} |\n`;
      });
    }

    return section;
  }

  /**
   * カテゴリ詳細テーブルを生成
   */
  generateCategoriesDetailTable() {
    if (!this.data.categories || this.data.categories.length === 0) {
      return 'カテゴリデータなし';
    }

    let table = '| カテゴリ | 状態 | 完了日 |\n';
    table += '|----------|------|--------|\n';

    this.data.categories.forEach(cat => {
      table += `| ${cat.name} | ${cat.status} | ${cat.completionDate || '-'} |\n`;
    });

    return table;
  }

  /**
   * 評価レポートを生成
   */
  generate() {
    const templatePath = path.join(this.templatesDir, 'report-template.md');
    let template = fs.readFileSync(templatePath, 'utf8');

    const testStats = this.calculateTestStatistics();
    const selfAssessmentCharts = this.generateSelfAssessmentCharts();
    const duration = this.calculateDuration(
      this.data.basicInfo.startDate,
      this.data.completionDate
    );

    // 推定学習時間（簡易計算: 1カテゴリあたり平均20時間）
    const completedCategories = this.data.categories.filter(cat => cat.isCompleted).length;
    const estimatedHours = completedCategories * 20;
    const averageHoursPerCategory = completedCategories > 0 ? 20 : 0;

    const replacements = {
      '{{STUDENT_NAME}}': this.data.basicInfo.studentName || '研修生',
      '{{COURSE_NAME}}': this.getCourseName(this.data.course),
      '{{REPORT_DATE}}': this.formatDate(new Date()),
      '{{START_DATE}}': this.data.basicInfo.startDate || '不明',
      '{{COMPLETION_DATE}}': this.formatDate(this.data.completionDate),
      '{{DURATION}}': duration,
      '{{MENTOR_NAME}}': this.data.basicInfo.mentorName || 'メンター',
      '{{CATEGORIES_SUMMARY}}': this.generateCategoriesSummary(),
      '{{ESTIMATED_HOURS}}': estimatedHours,
      '{{AVERAGE_HOURS_PER_CATEGORY}}': averageHoursPerCategory,
      '{{TEST_RESULTS_TABLE}}': this.generateTestResultsTable(),
      '{{AVERAGE_TEST_SCORE}}': testStats.average,
      '{{MAX_TEST_SCORE}}': testStats.max,
      '{{MIN_TEST_SCORE}}': testStats.min,
      '{{WEAK_AREAS_ANALYSIS}}': this.analyzeWeakAreas(),
      '{{PR_STATISTICS_TABLE}}': this.generatePRStatisticsTable(),
      '{{TOTAL_PRS}}': this.data.prStatistics ? this.data.prStatistics.total : 0,
      '{{APPROVAL_RATE}}': this.data.prStatistics && this.data.prStatistics.total > 0
        ? Math.round((this.data.prStatistics.merged / this.data.prStatistics.total) * 100)
        : 0,
      '{{AVERAGE_REVIEW_TIME}}': this.data.prStatistics && this.data.prStatistics.averageReviewTime !== null
        ? Math.round(this.data.prStatistics.averageReviewTime * 10) / 10
        : '不明',
      '{{RESUBMISSION_COUNT}}': this.data.prStatistics ? this.data.prStatistics.resubmissionCount : 0,
      '{{MENTOR_FEEDBACK_SECTION}}': this.generateMentorFeedbackSection(),
      '{{GROWTH_POINTS}}': this.extractGrowthPoints(),
      '{{IMPROVEMENT_AREAS}}': '1on1メモから改善点を抽出できませんでした。',
      '{{MOTIVATION_CHART}}': selfAssessmentCharts.motivation,
      '{{DIFFICULTY_CHART}}': selfAssessmentCharts.difficulty,
      '{{ENERGY_CHART}}': selfAssessmentCharts.energy,
      '{{AVERAGE_MOTIVATION}}': selfAssessmentCharts.averages.motivation,
      '{{AVERAGE_DIFFICULTY}}': selfAssessmentCharts.averages.difficulty,
      '{{AVERAGE_ENERGY}}': selfAssessmentCharts.averages.energy,
      '{{CAPSTONE_EVALUATION_SECTION}}': this.generateCapstoneEvaluationSection(),
      '{{CAPSTONE_THEME}}': this.data.capstoneEvaluation ? (this.data.capstoneEvaluation.theme || '-') : '-',
      '{{CAPSTONE_REPOSITORY}}': this.data.capstoneEvaluation ? (this.data.capstoneEvaluation.repository || '-') : '-',
      '{{CAPSTONE_DEPLOY_URL}}': this.data.capstoneEvaluation ? (this.data.capstoneEvaluation.deployUrl || '-') : '-',
      '{{CAPSTONE_SCORES_TABLE}}': this.data.capstoneEvaluation && this.data.capstoneEvaluation.scores
        ? this.generateCapstoneEvaluationSection()
        : '評価データなし',
      '{{OVERALL_EVALUATION}}': 'メンターからの総評が記録されていません。',
      '{{RECOMMENDATIONS}}': '今後の学習推奨事項が記録されていません。',
      '{{CATEGORIES_DETAIL_TABLE}}': this.generateCategoriesDetailTable(),
      '{{ONEONONE_MEMOS_SECTION}}': this.generateMentorFeedbackSection(),
      '{{REPORT_GENERATED_AT}}': new Date().toISOString()
    };

    Object.keys(replacements).forEach(key => {
      template = template.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), replacements[key]);
    });

    return template;
  }

  /**
   * レポートをファイルに保存
   */
  save(outputDir, studentName, course) {
    const date = this.formatDate(new Date());
    const filename = `report-${course}-${date}`;

    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const report = this.generate();
    const reportPath = path.join(outputDir, `${filename}.md`);
    fs.writeFileSync(reportPath, report, 'utf8');

    return reportPath;
  }
}

module.exports = ReportGenerator;

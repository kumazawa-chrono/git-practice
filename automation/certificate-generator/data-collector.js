const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

/**
 * 進捗ファイルからデータを収集
 */
class DataCollector {
  constructor(studentName, course, githubToken = null) {
    this.studentName = studentName;
    this.course = course;
    this.progressPath = path.join('progress', 'students', studentName, 'progress.md');
    this.octokit = githubToken ? new Octokit({ auth: githubToken }) : null;
  }

  /**
   * 進捗ファイルを読み込む
   */
  readProgressFile() {
    if (!fs.existsSync(this.progressPath)) {
      throw new Error(`進捗ファイルが見つかりません: ${this.progressPath}`);
    }
    return fs.readFileSync(this.progressPath, 'utf8');
  }

  /**
   * 基本情報を抽出
   */
  extractBasicInfo(content) {
    const info = {};
    
    // 受講者名
    const nameMatch = content.match(/\|\s*受講者名\s*\|\s*([^|]+)\s*\|/);
    if (nameMatch) info.studentName = nameMatch[1].trim();
    
    // 開始日
    const startDateMatch = content.match(/\|\s*開始日\s*\|\s*([^|]+)\s*\|/);
    if (startDateMatch) info.startDate = startDateMatch[1].trim();
    
    // 選択コース
    const courseMatch = content.match(/\|\s*選択コース\s*\|\s*([^|]+)\s*\|/);
    if (courseMatch) info.selectedCourse = courseMatch[1].trim();
    
    // メンター名
    const mentorMatch = content.match(/\|\s*メンター\s*\|\s*([^|]+)\s*\|/);
    if (mentorMatch) info.mentorName = mentorMatch[1].trim();
    
    return info;
  }

  /**
   * カテゴリの完了状態を抽出
   */
  extractCategoryStatus(content, courseType) {
    const categories = [];
    
    let sectionStart = -1;
    if (courseType === 'common') {
      sectionStart = content.indexOf('## 共通基礎');
    } else if (courseType === 'web') {
      sectionStart = content.indexOf('### Webエンジニアコース');
    } else if (courseType === 'mobile') {
      sectionStart = content.indexOf('### モバイルエンジニアコース');
    } else if (courseType === 'iot') {
      sectionStart = content.indexOf('### IoTエンジニアコース');
    }
    
    if (sectionStart === -1) return categories;
    
    const sectionEnd = content.indexOf('---', sectionStart + 1);
    const section = sectionEnd !== -1 
      ? content.substring(sectionStart, sectionEnd)
      : content.substring(sectionStart);
    
    // テーブル行を抽出
    const rows = section.match(/\|\s*\d+\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g);
    if (rows) {
      rows.forEach(row => {
        const parts = row.split('|').map(p => p.trim()).filter(p => p);
        if (parts.length >= 3) {
          const categoryName = parts[1];
          const status = parts[2];
          const completionDateMatch = row.match(/\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/);
          const completionDate = completionDateMatch && completionDateMatch[4] !== '-' 
            ? completionDateMatch[4].trim() 
            : null;
          
          categories.push({
            name: categoryName,
            status: status,
            isCompleted: status.includes('✅'),
            completionDate: completionDate
          });
        }
      });
    }
    
    return categories;
  }

  /**
   * テスト結果を抽出
   */
  extractTestResults(content) {
    const results = [];
    
    const testSectionStart = content.indexOf('## 理解度チェックテスト結果');
    if (testSectionStart === -1) return results;
    
    const testSectionEnd = content.indexOf('---', testSectionStart + 1);
    const testSection = testSectionEnd !== -1
      ? content.substring(testSectionStart, testSectionEnd)
      : content.substring(testSectionStart);
    
    const rows = testSection.match(/\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g);
    if (rows) {
      rows.forEach((row, index) => {
        if (index === 0) return; // ヘッダー行をスキップ
        
        const parts = row.split('|').map(p => p.trim()).filter(p => p);
        if (parts.length >= 3 && parts[1] !== '実施日') {
          const category = parts[0];
          const date = parts[1];
          const result = parts[2];
          
          // スコアを抽出（例: "8/10 (80%)"）
          const scoreMatch = result.match(/(\d+)\/(\d+)\s*\((\d+)%\)/);
          const score = scoreMatch ? {
            correct: parseInt(scoreMatch[1]),
            total: parseInt(scoreMatch[2]),
            percentage: parseInt(scoreMatch[3])
          } : null;
          
          results.push({
            category: category,
            date: date !== '-' ? date : null,
            result: result,
            score: score
          });
        }
      });
    }
    
    return results;
  }

  /**
   * 1on1メモを抽出
   */
  extract1on1Memos(content) {
    const memos = [];
    
    const memoSectionStart = content.indexOf('## 1on1メモ');
    if (memoSectionStart === -1) return memos;
    
    const memoSection = content.substring(memoSectionStart);
    
    // 各1on1セクションを抽出
    const memoMatches = memoSection.match(/###\s*([^\n]+)\n\n([\s\S]*?)(?=###|$)/g);
    if (memoMatches) {
      memoMatches.forEach(match => {
        const dateMatch = match.match(/###\s*([^\n]+)/);
        const date = dateMatch ? dateMatch[1].trim() : null;
        
        const motivationMatch = match.match(/\*\*モチベーション\*\*:\s*([^\n]+)/);
        const motivation = motivationMatch ? motivationMatch[1].trim() : null;
        
        const feedbackMatch = match.match(/\*\*メンターからのフィードバック\*\*:\s*([^\n]+)/);
        const feedback = feedbackMatch ? feedbackMatch[1].trim() : null;
        
        if (date) {
          memos.push({
            date: date,
            motivation: motivation,
            feedback: feedback,
            content: match
          });
        }
      });
    }
    
    return memos;
  }

  /**
   * 自己診断データを抽出
   */
  extractSelfAssessments(content) {
    const assessments = [];
    
    const assessmentSectionStart = content.indexOf('## 毎日の自己診断');
    if (assessmentSectionStart === -1) return assessments;
    
    const assessmentSection = content.substring(assessmentSectionStart);
    
    // 各日の自己診断を抽出
    const dayMatches = assessmentSection.match(/###\s*([^\n]+)\n\n([\s\S]*?)(?=###|---|$)/g);
    if (dayMatches) {
      dayMatches.forEach(match => {
        const dateMatch = match.match(/###\s*([^\n]+)/);
        const date = dateMatch ? dateMatch[1].trim() : null;
        
        const motivationMatch = match.match(/\*\*モチベーション\*\*:\s*(\d+)\/5/);
        const motivation = motivationMatch ? parseInt(motivationMatch[1]) : null;
        
        const energyMatch = match.match(/\*\*体調・エネルギーレベル\*\*:\s*(\d+)\/5/);
        const energy = energyMatch ? parseInt(energyMatch[1]) : null;
        
        const difficultyMatch = match.match(/\*\*難易度の感じ方\*\*:\s*(\d+)\/5/);
        const difficulty = difficultyMatch ? parseInt(difficultyMatch[1]) : null;
        
        const progressMatch = match.match(/\*\*進捗の実感\*\*:\s*(\d+)\/5/);
        const progress = progressMatch ? parseInt(progressMatch[1]) : null;
        
        if (date && (motivation !== null || energy !== null || difficulty !== null || progress !== null)) {
          assessments.push({
            date: date,
            motivation: motivation,
            energy: energy,
            difficulty: difficulty,
            progress: progress
          });
        }
      });
    }
    
    return assessments;
  }

  /**
   * 応用演習の評価を抽出
   */
  extractCapstoneEvaluation(content) {
    const evaluation = {};
    
    const capstoneSectionStart = content.indexOf('## 応用演習');
    if (capstoneSectionStart === -1) return null;
    
    const capstoneSection = content.substring(capstoneSectionStart);
    
    const themeMatch = capstoneSection.match(/\*\*テーマ\*\*:\s*([^\n]+)/);
    evaluation.theme = themeMatch ? themeMatch[1].trim() : null;
    
    const repoMatch = capstoneSection.match(/リポジトリ:\s*\[URL\]\(([^)]+)\)/);
    evaluation.repository = repoMatch ? repoMatch[1].trim() : null;
    
    const deployMatch = capstoneSection.match(/デプロイURL:\s*\[URL\]\(([^)]+)\)/);
    evaluation.deployUrl = deployMatch ? deployMatch[1].trim() : null;
    
    // 評価テーブルを抽出
    const evalRows = capstoneSection.match(/\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g);
    if (evalRows) {
      evaluation.scores = {};
      evalRows.forEach((row, index) => {
        if (index === 0) return; // ヘッダー行をスキップ
        
        const parts = row.split('|').map(p => p.trim()).filter(p => p);
        if (parts.length >= 3 && parts[0] !== '項目') {
          const item = parts[0];
          const score = parts[1];
          const comment = parts[2];
          
          // 星の数をカウント
          const starCount = (score.match(/⭐/g) || []).length;
          
          evaluation.scores[item] = {
            stars: starCount,
            score: score,
            comment: comment
          };
        }
      });
    }
    
    return Object.keys(evaluation).length > 0 ? evaluation : null;
  }

  /**
   * PR統計を取得（GitHub API使用）
   */
  async fetchPRStatistics(owner, repo) {
    if (!this.octokit) {
      console.warn('GitHub tokenが設定されていないため、PR統計を取得できません');
      return null;
    }

    try {
      const prs = await this.octokit.paginate(this.octokit.rest.pulls.list, {
        owner: owner,
        repo: repo,
        state: 'all',
        per_page: 100
      });

      // 研修生のPRをフィルタリング（ブランチ名にstudent/{studentName}を含む）
      const studentPRs = prs.filter(pr => 
        pr.head.ref.includes(`student/${this.studentName}`)
      );

      const stats = {
        total: studentPRs.length,
        open: studentPRs.filter(pr => pr.state === 'open').length,
        closed: studentPRs.filter(pr => pr.state === 'closed').length,
        merged: studentPRs.filter(pr => pr.merged).length,
        averageReviewTime: null,
        resubmissionCount: 0
      };

      // 平均レビュー時間を計算
      const reviewTimes = [];
      for (const pr of studentPRs) {
        if (pr.merged && pr.merged_at && pr.created_at) {
          const created = new Date(pr.created_at);
          const merged = new Date(pr.merged_at);
          const diffHours = (merged - created) / (1000 * 60 * 60);
          reviewTimes.push(diffHours);
        }
      }
      
      if (reviewTimes.length > 0) {
        stats.averageReviewTime = reviewTimes.reduce((a, b) => a + b, 0) / reviewTimes.length;
      }

      // 再提出回数を計算（同じタイトル/ブランチのPRが複数ある場合）
      const prTitles = {};
      studentPRs.forEach(pr => {
        const key = pr.title.toLowerCase();
        if (!prTitles[key]) prTitles[key] = 0;
        prTitles[key]++;
      });
      
      stats.resubmissionCount = Object.values(prTitles)
        .filter(count => count > 1)
        .reduce((sum, count) => sum + (count - 1), 0);

      return stats;
    } catch (error) {
      console.error('PR統計の取得に失敗しました:', error);
      return null;
    }
  }

  /**
   * すべてのデータを収集
   */
  async collectAll(owner = null, repo = null) {
    const content = this.readProgressFile();
    
    const data = {
      basicInfo: this.extractBasicInfo(content),
      categories: this.extractCategoryStatus(content, this.course),
      testResults: this.extractTestResults(content),
      oneOnOneMemos: this.extract1on1Memos(content),
      selfAssessments: this.extractSelfAssessments(content),
      capstoneEvaluation: this.extractCapstoneEvaluation(content),
      prStatistics: null
    };

    // PR統計を取得（GitHub情報が提供されている場合）
    if (owner && repo) {
      data.prStatistics = await this.fetchPRStatistics(owner, repo);
    }

    return data;
  }
}

module.exports = DataCollector;

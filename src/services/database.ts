// src/services/database.ts
import SQLite from 'react-native-sqlite-storage';
import { Platform } from "react-native";

// Enable promise-based API
SQLite.enablePromise(true);

type TimeRange = "1 Month" | "6 Months" | "1 Year" | "YTD";
type ReportData = {
  label: string;
  avgTimePerWeek: number;
  timesLastMonth: number;
  timesTillDate: number;
  phoneOffTime: string;
  sleepTime: number;
  anxietyScore: number;
  stressScore: number;
  depressionScore: number;
  appList: string;
  frontColor: string;
};

interface ScanAnswer {
  answer1_score: string;
  answer2_score: string;
  answer3_score: string;
  answer4_score: string;
  answer5_score: string;
  answer6_score: string;
  answer7_score: string;
  answer8_score: string;
  answer9_score: string;
  answer10_score: string;
  scan_title: string;
  total_score: string;
  result: string;
}

interface ScanAnswerFull extends ScanAnswer {
  pair_index: number;
  scan_date: string;
  scan_time: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
}

interface ScanProgress {
  completed: number;
  lastCompletedPairIndex: number;
}

export interface ScanResult {
  id: number;
  scan_title: string;
  total_score: number;
  interventions: string | null;
  scan_date: string;
  scan_time: string;
}

// Global database variable
let db: SQLite.SQLiteDatabase;

// Initialize database
const initializeDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (Platform.OS === 'web') {
    // Mock database for web
    return {
      executeSql: () => Promise.resolve([{ rows: { raw: () => [] } }]),
      transaction: (fn: any) => fn({
        executeSql: () => Promise.resolve([{ rows: { raw: () => [] } }])
      }),
      close: () => Promise.resolve(),
    } as any;
  }

  try {
    const database = await SQLite.openDatabase({
      name: 'insights.db',
      location: 'default',
    });
    return database;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

// Get database instance
const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await initializeDatabase();
  }
  return db;
};

// Helper function to execute SQL
const executeSql = async (sql: string, params: any[] = []): Promise<any[]> => {
  const database = await getDatabase();
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => {
          resolve(result.rows.raw());
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Helper function to generate consistent colors for categories
const getColorForCategory = (category: string): string => {
  const colors = [
    "#A9A0FC",
    "#C7B3F2",
    "#D9B7FA",
    "#EFC3F5",
    "#FFD1EE",
    "#FFCEB8",
  ];
  const hash = hashCode(category);
  return colors[Math.abs(hash) % colors.length];
};

// Helper function to generate hash code from string
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Initialize database tables
export const initDB = async (): Promise<void> => {
  try {
    // Drop the existing reports table to ensure the schema is fresh
    await executeSql("DROP TABLE IF EXISTS reports;");

    // Create the reports table with all required columns
    await executeSql(
      `CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        duration TEXT NOT NULL,
        avg_time_per_week REAL,
        times_last_month INTEGER,
        times_till_date INTEGER,
        phone_off_time TEXT,
        sleep_time REAL,
        anxiety_score INTEGER,
        stress_score INTEGER,
        depression_score INTEGER,
        app_list TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );

    // Create scan_answers table
    await executeSql(
      `CREATE TABLE IF NOT EXISTS scan_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scan_title TEXT NOT NULL,
        answer1_score TEXT,
        answer2_score TEXT,
        answer3_score TEXT,
        answer4_score TEXT,
        answer5_score TEXT,
        answer6_score TEXT,
        answer7_score TEXT,
        answer8_score TEXT,
        answer9_score TEXT,
        answer10_score TEXT,
        total_score TEXT,
        result TEXT,
        question1 TEXT,
        question2 TEXT,
        question3 TEXT,
        question4 TEXT,
        question5 TEXT,
        question6 TEXT,
        question7 TEXT,
        question8 TEXT,
        question9 TEXT,
        question10 TEXT,
        pair_index INTEGER,
        scan_date TEXT,
        scan_time TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

// Check if table exists and has data
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const result = await executeSql(
      "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name=?",
      [tableName]
    );
    return result[0]?.count > 0;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Insert report data
export const insertReportData = async (
  category: string,
  duration: TimeRange,
  data: Omit<ReportData, "label" | "frontColor">
): Promise<void> => {
  try {
    await executeSql(
      `INSERT INTO reports (
        category, duration, avg_time_per_week, times_last_month, 
        times_till_date, phone_off_time, sleep_time, anxiety_score,
        stress_score, depression_score, app_list
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        category,
        duration,
        data.avgTimePerWeek,
        data.timesLastMonth,
        data.timesTillDate,
        data.phoneOffTime,
        data.sleepTime,
        data.anxietyScore,
        data.stressScore,
        data.depressionScore,
        data.appList,
      ]
    );
  } catch (error) {
    console.error("Error inserting report data:", error);
    throw error;
  }
};

// Get reports by category and duration
export const getReportsByCategory = async (
  category: string,
  duration: TimeRange
): Promise<ReportData[]> => {
  try {
    const result = await executeSql(
      "SELECT * FROM reports WHERE category = ? AND duration = ?",
      [category, duration]
    );

    return result.map((item: any) => ({
      label: item.category,
      avgTimePerWeek: item.avg_time_per_week,
      timesLastMonth: item.times_last_month,
      timesTillDate: item.times_till_date,
      phoneOffTime: item.phone_off_time,
      sleepTime: item.sleep_time,
      anxietyScore: item.anxiety_score,
      stressScore: item.stress_score,
      depressionScore: item.depression_score,
      appList: item.app_list,
      frontColor: getColorForCategory(item.category),
    }));
  } catch (error) {
    console.error("Error getting reports by category:", error);
    return [];
  }
};

// Clear all reports
export const clearAllReports = async (): Promise<void> => {
  try {
    await executeSql("DELETE FROM reports;");
  } catch (error) {
    console.error("Error clearing all reports:", error);
    throw error;
  }
};

// Delete scan answers by title
export const deleteScanAnswers = async (scanTitle?: string): Promise<void> => {
  try {
    if (scanTitle) {
      await executeSql("DELETE FROM scan_answers WHERE scan_title = ?", [scanTitle]);
    } else {
      await executeSql("DELETE FROM scan_answers;");
    }
  } catch (error) {
    console.error("Error deleting scan answers:", error);
    throw error;
  }
};

// Get all reports
export const getAllReports = async (): Promise<any[]> => {
  try {
    return await executeSql("SELECT * FROM reports;");
  } catch (error) {
    console.error("Error getting all reports:", error);
    return [];
  }
};

// Save scan answers
export const saveScanAnswers = async (answers: ScanAnswerFull): Promise<void> => {
  try {
    await executeSql(
      `INSERT INTO scan_answers (
        scan_title, answer1_score, answer2_score, answer3_score, answer4_score,
        answer5_score, answer6_score, answer7_score, answer8_score, answer9_score,
        answer10_score, total_score, result, question1, question2, question3,
        question4, question5, question6, question7, question8, question9,
        question10, pair_index, scan_date, scan_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        answers.scan_title,
        answers.answer1_score,
        answers.answer2_score,
        answers.answer3_score,
        answers.answer4_score,
        answers.answer5_score,
        answers.answer6_score,
        answers.answer7_score,
        answers.answer8_score,
        answers.answer9_score,
        answers.answer10_score,
        answers.total_score,
        answers.result,
        answers.question1,
        answers.question2,
        answers.question3,
        answers.question4,
        answers.question5,
        answers.question6,
        answers.question7,
        answers.question8,
        answers.question9,
        answers.question10,
        answers.pair_index,
        answers.scan_date,
        answers.scan_time,
      ]
    );
  } catch (error) {
    console.error("Error saving scan answers:", error);
    throw error;
  }
};

// Get scan answers
export const getScanAnswers = async (scanTitle: string): Promise<ScanAnswer[]> => {
  try {
    const result = await executeSql(
      "SELECT * FROM scan_answers WHERE scan_title = ? ORDER BY created_at DESC",
      [scanTitle]
    );
    return result;
  } catch (error) {
    console.error("Error getting scan answers:", error);
    return [];
  }
};

// Get all scan answers with full details
export const getAllScanAnswers = async (): Promise<ScanAnswerFull[]> => {
  try {
    const result = await executeSql(
      "SELECT * FROM scan_answers ORDER BY created_at DESC"
    );
    
    return result.map((item: any) => ({
      answer1_score: item.answer1_score,
      answer2_score: item.answer2_score,
      answer3_score: item.answer3_score,
      answer4_score: item.answer4_score,
      answer5_score: item.answer5_score,
      answer6_score: item.answer6_score,
      answer7_score: item.answer7_score,
      answer8_score: item.answer8_score,
      answer9_score: item.answer9_score,
      answer10_score: item.answer10_score,
      scan_title: item.scan_title,
      total_score: item.total_score,
      result: item.result,
      question1: item.question1,
      question2: item.question2,
      question3: item.question3,
      question4: item.question4,
      question5: item.question5,
      question6: item.question6,
      question7: item.question7,
      question8: item.question8,
      question9: item.question9,
      question10: item.question10,
      pair_index: item.pair_index,
      scan_date: item.scan_date,
      scan_time: item.scan_time,
    }));
  } catch (error) {
    console.error("Error getting all scan answers:", error);
    return [];
  }
};

// Alias functions for backward compatibility
export const getAllScanResults = getAllScanAnswers;
export const saveScanResult = saveScanAnswers;
export const getScanResultsHistory = getAllScanAnswers;
export const saveScanAnswer = saveScanAnswers;
export const getScanProgress = getScanAnswers;
export const createTables = initDB;
export const getAllReportData = getAllReports;
export const clearAllReportData = clearAllReports;

// Export utility functions
export {
  getDatabase,
  executeSql,
  getColorForCategory,
  hashCode,
};

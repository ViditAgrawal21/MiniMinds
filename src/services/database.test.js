// src/services/database.test.js
import { 
  initDB, 
  getAllScanAnswers,
  saveScanAnswers,
  upgradeDatabase,
  getDatabaseVersion
} from './database';

// Mock the SQLite module
jest.mock('react-native-sqlite-storage', () => ({
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(callback => {
      callback({
        executeSql: jest.fn((query, params, success) => {
          // Mock different query responses
          if (query.includes('PRAGMA user_version')) {
            success(null, { rows: { raw: () => [{ user_version: 1 }] } });
          } else if (query.includes('SELECT * FROM scan_answers')) {
            success(null, { rows: { raw: () => [] } });
          } else {
            success(null, { rows: { raw: () => [] } });
          }
          return true;
        })
      });
      return Promise.resolve();
    }),
    executeSql: jest.fn(() => Promise.resolve([{ rows: { raw: () => [] } }])),
    close: jest.fn(() => Promise.resolve())
  }))
}));

// Mock the Platform module
jest.mock('react-native', () => ({
  Platform: {
    OS: 'android'
  }
}));

describe('Database Service', () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });
  
  test('initDB should initialize the database', async () => {
    await initDB();
    // This test verifies that initDB doesn't throw an error
    expect(true).toBeTruthy();
  });
  
  test('getDatabaseVersion should return a version number', async () => {
    const version = await getDatabaseVersion();
    expect(version).toBe(1); // Because we mocked it to return 1
  });
  
  test('getAllScanAnswers should return an array', async () => {
    const answers = await getAllScanAnswers();
    expect(Array.isArray(answers)).toBe(true);
  });

  test('saveScanAnswers should not throw an error', async () => {
    const mockData = {
      scan_title: 'Test Scan',
      answer1_score: '1',
      answer2_score: '2',
      answer3_score: '3',
      answer4_score: '4',
      answer5_score: '5',
      answer6_score: '6',
      answer7_score: '7',
      answer8_score: '8',
      answer9_score: '9',
      answer10_score: '10',
      total_score: '55',
      result: 'Moderate Risk',
      question1: 'Q1',
      question2: 'Q2',
      question3: 'Q3',
      question4: 'Q4',
      question5: 'Q5',
      question6: 'Q6',
      question7: 'Q7',
      question8: 'Q8',
      question9: 'Q9',
      question10: 'Q10',
      pair_index: 1,
      scan_date: '2023-07-15',
      scan_time: '12:30',
      interventions: 'Test Intervention'
    };
    
    // Should not throw an error
    await expect(saveScanAnswers(mockData)).resolves.not.toThrow();
  });
});

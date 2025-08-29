// Database debug utilities for testing save operations
import { 
  saveScanAnswers, 
  saveScanResultBasic, 
  getAllScanAnswers,
  initDB 
} from '@/services/database';

export const testDatabaseSave = async (): Promise<void> => {
  try {
    console.log('=== Starting Database Test ===');
    
    // Initialize database
    await initDB();
    console.log('Database initialized');
    
    // Test basic scan result save
    console.log('Testing basic scan result save...');
    await saveScanResultBasic('Test Scan', 42);
    console.log('Basic scan result saved successfully');
    
    // Test full scan answer save
    console.log('Testing full scan answer save...');
    const testScanData = {
      scan_title: 'Test Full Scan',
      answer1_score: '5',
      answer2_score: '4',
      answer3_score: '3',
      answer4_score: '2',
      answer5_score: '1',
      answer6_score: '5',
      answer7_score: '4',
      answer8_score: '3',
      answer9_score: '2',
      answer10_score: '1',
      total_score: '30',
      result: 'Test Result',
      question1: 'Test Question 1',
      question2: 'Test Question 2',
      question3: 'Test Question 3',
      question4: 'Test Question 4',
      question5: 'Test Question 5',
      question6: 'Test Question 6',
      question7: 'Test Question 7',
      question8: 'Test Question 8',
      question9: 'Test Question 9',
      question10: 'Test Question 10',
      pair_index: 4,
      scan_date: new Date().toLocaleDateString(),
      scan_time: new Date().toLocaleTimeString(),
      interventions: null,
    };
    
    await saveScanAnswers(testScanData);
    console.log('Full scan answer saved successfully');
    
    // Retrieve and display all scan answers
    const allAnswers = await getAllScanAnswers();
    console.log('Retrieved scan answers:', allAnswers.length);
    
    console.log('=== Database Test Complete ===');
  } catch (error) {
    console.error('=== Database Test Failed ===');
    console.error('Error:', error);
  }
};

export const logDatabaseInfo = async (): Promise<void> => {
  try {
    const allAnswers = await getAllScanAnswers();
    console.log('=== Database Info ===');
    console.log('Total scan answers:', allAnswers.length);
    allAnswers.forEach((answer, index) => {
      console.log(`${index + 1}. ${answer.scan_title} - Score: ${answer.total_score} - Date: ${answer.scan_date}`);
    });
  } catch (error) {
    console.error('Error getting database info:', error);
  }
};

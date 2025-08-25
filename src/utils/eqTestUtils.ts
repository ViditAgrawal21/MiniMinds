import AsyncStorage from "@react-native-async-storage/async-storage";

// Utility functions for EQ Test status and comprehensive report

export interface EQTestResult {
  date: string;
  time: string;
  score: number;
}

export interface TestCompletionStatus {
  isCompleted: boolean;
  lastCompletedDate?: string;
  latestScore?: number;
  isExpired: boolean;
}

export interface ComprehensiveReportData {
  empathy: TestCompletionStatus;
  motivation: TestCompletionStatus;
  selfAwareness: TestCompletionStatus;
  selfRegulation: TestCompletionStatus;
  socialSkills: TestCompletionStatus;
  allCompleted: boolean;
  overallScore: number;
}

// Check if a test was completed within the last 30 days
export const isTestValidForReport = (lastDate: string): boolean => {
  const testDate = new Date(lastDate);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return testDate >= thirtyDaysAgo;
};

// Get the latest test result for a specific test
export const getLatestTestResult = async (testId: number): Promise<EQTestResult | null> => {
  try {
    const key = `eq_test_${testId}_history`;
    const stored = await AsyncStorage.getItem(key);
    if (!stored) return null;
    
    const results: EQTestResult[] = JSON.parse(stored);
    if (results.length === 0) return null;
    
    // Sort by date (most recent first)
    results.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
    
    return results[0];
  } catch (error) {
    console.error(`Error fetching latest result for test ${testId}:`, error);
    return null;
  }
};

// Check completion status for a specific test
export const getTestCompletionStatus = async (testId: number): Promise<TestCompletionStatus> => {
  const latestResult = await getLatestTestResult(testId);
  
  if (!latestResult) {
    return {
      isCompleted: false,
      isExpired: false,
    };
  }
  
  const isValid = isTestValidForReport(latestResult.date);
  
  return {
    isCompleted: true,
    lastCompletedDate: latestResult.date,
    latestScore: latestResult.score,
    isExpired: !isValid,
  };
};

// Get comprehensive report data for all tests
export const getComprehensiveReportData = async (): Promise<ComprehensiveReportData> => {
  const testIds = [1, 2, 3, 4, 5]; // empathy, motivation, selfAwareness, selfRegulation, socialSkills
  const testKeys = ['empathy', 'motivation', 'selfAwareness', 'selfRegulation', 'socialSkills'];
  
  const statusPromises = testIds.map(id => getTestCompletionStatus(id));
  const statuses = await Promise.all(statusPromises);
  
  const reportData: ComprehensiveReportData = {
    empathy: statuses[0],
    motivation: statuses[1],
    selfAwareness: statuses[2],
    selfRegulation: statuses[3],
    socialSkills: statuses[4],
    allCompleted: false,
    overallScore: 0,
  };
  
  // Check if all tests are completed and valid
  const validTests = statuses.filter(status => status.isCompleted && !status.isExpired);
  reportData.allCompleted = validTests.length === 5;
  
  // Calculate overall score if all tests are completed
  if (reportData.allCompleted) {
    const totalScore = validTests.reduce((sum, status) => sum + (status.latestScore || 0), 0);
    reportData.overallScore = Math.round(totalScore / 5);
  }
  
  return reportData;
};

// Categorize score based on the requirements (Low: 30, Medium: 60, High: 90)
export const categorizeScore = (score: number): 'Low' | 'Medium' | 'High' => {
  if (score <= 30) return 'Low';
  if (score <= 60) return 'Medium';
  return 'High';
};

// Get test key by ID
export const getTestKeyById = (testId: number): string => {
  const testKeys = ['empathy', 'motivation', 'selfAwareness', 'selfRegulation', 'socialSkills'];
  return testKeys[testId - 1] || 'unknown';
};

// Get test ID by key
export const getTestIdByKey = (key: string): number => {
  const testKeys = ['empathy', 'motivation', 'selfAwareness', 'selfRegulation', 'socialSkills'];
  return testKeys.indexOf(key) + 1;
};

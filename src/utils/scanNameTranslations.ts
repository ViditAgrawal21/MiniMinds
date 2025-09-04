import { t } from "@/i18n/locales/i18n";

// Function to get translated scan name
export const getTranslatedScanName = (scanName: string): string => {
  // Direct translation mapping for better reliability
  switch (scanName) {
    case "Addictions":
      return t("conditionScans.addictions");
    case "Anger Management":
      return t("conditionScans.angerManagement");
    case "Common Psychological Issues":
      return t("conditionScans.commonPsychologicalIssuesQuestion");
    case "Environment Issues Affecting Mental Wellbeing":
      return t(
        "conditionScans.environmentIssuesAffectingMentalWellbeingQuestion"
      );
    case "Exam Stress":
      return t("conditionScans.examStressQuestion");
    case "Family and Relationship":
      return t("conditionScans.familyIssuesQuestion");
    case "Financial Mental Health":
      return t("conditionScans.financialMentalHealthQuestion");
    case "General Physical Fitness":
      return t("conditionScans.generalPhysicalFitnessQuestion");
    case "Internet and Social Media Issue":
      return t("conditionScans.internetAndSocialMediaQuestion");
    case "Internet Dependence":
    case "Internet dependence":
      return t("conditionScans.internetDependenceQuestion");
    case "Professional Mental Health":
      return t("conditionScans.professionalMentalHealthQuestion");
    case "Sex Life":
      return t("conditionScans.sexLifeQuestion");
    case "Sleep":
      return t("conditionScans.sleepQuestion");
    case "Social Mental Health":
      return t("conditionScans.socialMentalHealthQuestion");
    case "Stress":
      return t("conditionScans.stressQuestion");
    case "Suicidal Behaviour":
      return t("conditionScans.suicidalBehaviorQuestion");
    case "Youngster Issues":
      return t("conditionScans.youngsterIssuesQuestion");
    case "Job Insecurity":
      return t("conditionScans.jobInsecurityQuestion");
    default:
      return scanName; // Return original name if no translation found
  }
};

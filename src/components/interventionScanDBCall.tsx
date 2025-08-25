import { getAllScanResults } from "@/services/database";
import React, { lazy, Suspense } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { t } from "@/i18n/locales/i18n";

// import { lazy } from "react"; // Assuming lazy is imported

const Addictions_GiveMe10 = lazy(
  () => import("./interventionResultData/Addictions/Give_me_10"),
);
// const Addictions_ChatGive10CBT = lazy(
//   () => import("./interventionResultData/Addictions/chat give 10 CBT"),
// );
import * as Addictions_ChatGive10CBT from "./interventionResultData/Addictions/chat give 10 CBT";
// const Addictions_ChatGive10REB = lazy(
//   () => import("./interventionResultData/Addictions/chat give 10 REB"),
// );
import * as Addictions_ChatGive10REB from "./interventionResultData/Addictions/chat give 10 REB";
// const Addictions_Chat10Common = lazy(
//   () => import("./interventionResultData/Addictions/chat_10_common_"),
// );
import * as Addictions_Chat10Common from "./interventionResultData/Addictions/chat_10_common_";
const Addictions_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/Addictions/chat_Any_Softwa"),
);
// const Addictions_ChatGiveMeAn = lazy(
//   () => import("./interventionResultData/Addictions/chat_Give_me_an"),
// );
import * as Addictions_ChatGiveMeAn from "./interventionResultData/Addictions/chat_Give_me_an";
const Addictions_ChatIntroduce = lazy(
  () => import("./interventionResultData/Addictions/chat_Introduce_"),
);
const Addictions_ChatRelaxation = lazy(
  () => import("./interventionResultData/Addictions/chat_Relaxation"),
);
const Addictions_ChatYogaAndM = lazy(
  () => import("./interventionResultData/Addictions/chat_Yoga_and_m"),
);
// const Addictions_ChatLinkToUs = lazy(
//   () => import("./interventionResultData/Addictions/chat_link_to_us"),
// );
import * as Addictions_ChatLinkToUs from "./interventionResultData/Addictions/chat_link_to_us";
// const Addictions_RGiveMe10 = lazy(
//   () => import("./interventionResultData/Addictions/r_give_me_10"),
// );
import * as Addictions_RGiveMe10 from "./interventionResultData/Addictions/r_give_me_10";
// AngerManagement
const AngerManagement_GiveMe10 = lazy(
  () => import("./interventionResultData/AngerManagement/Give_me_10"),
);
// const AngerManagement_ChatGive10CBT = lazy(
//   () => import("./interventionResultData/AngerManagement/chat give 10 CBT"),
// );
import * as AngerManagement_ChatGive10CBT from "./interventionResultData/AngerManagement/chat give 10 CBT";
// const AngerManagement_ChatGive10REB = lazy(
//   () => import("./interventionResultData/AngerManagement/chat give 10 REB"),
// );
import * as AngerManagement_ChatGive10REB from "./interventionResultData/AngerManagement/chat give 10 REB";
// const AngerManagement_Chat10Common = lazy(
//   () => import("./interventionResultData/AngerManagement/chat_10_common_"),
// );
import * as AngerManagement_Chat10Common from "./interventionResultData/AngerManagement/chat_10_common_";
const AngerManagement_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/AngerManagement/chat_Any_Softwa"),
);
// const AngerManagement_ChatGiveMeAn = lazy(
//   () => import("./interventionResultData/AngerManagement/chat_Give_me_an"),
// );`
import * as AngerManagement_ChatGiveMeAn from "./interventionResultData/AngerManagement/chat_Give_me_an";
const AngerManagement_ChatIntroduce = lazy(
  () => import("./interventionResultData/AngerManagement/chat_Introduce_"),
);
const AngerManagement_ChatRelaxation = lazy(
  () => import("./interventionResultData/AngerManagement/chat_Relaxation"),
);
const AngerManagement_ChatYogaAndM = lazy(
  () => import("./interventionResultData/AngerManagement/chat_Yoga_and_m"),
);
import * as AngerManagement_ChatLinkToUs from "./interventionResultData/AngerManagement/chat_link_to_us";
// const AngerManagement_ChatLinkToUs = lazy(
//   () => import("./interventionResultData/AngerManagement/chat_link_to_us"),
// );
// const AngerManagement_RGiveMe10 = lazy(
//   () => import("./interventionResultData/AngerManagement/r_give_me_10"),
// );
import * as AngerManagement_RGiveMe10 from "./interventionResultData/AngerManagement/r_give_me_10";
// CommonPsychologicalIssues
const CommonPsychologicalIssues_GiveMe10 = lazy(
  () => import("./interventionResultData/CommonPsychologicalIssues/Give_me_10"),
);
// const CommonPsychologicalIssues_ChatGive10CBT = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat give 10 CBT"
//     ),
// );
import * as CommonPsychologicalIssues_ChatGive10CBT from "./interventionResultData/CommonPsychologicalIssues/chat give 10 CBT";
// const CommonPsychologicalIssues_ChatGive10REB = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat give 10 REB"
//     ),
// );
import * as CommonPsychologicalIssues_ChatGive10REB from "./interventionResultData/CommonPsychologicalIssues/chat give 10 REB";
// const CommonPsychologicalIssues_Chat10Common = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat_10_common_"
//     ),
// );
import * as CommonPsychologicalIssues_Chat10Common from "./interventionResultData/CommonPsychologicalIssues/chat_10_common_";
const CommonPsychologicalIssues_ChatAnySoftwa = lazy(
  () =>
    import(
      "./interventionResultData/CommonPsychologicalIssues/chat_Any_Softwa"
    ),
);
// const CommonPsychologicalIssues_ChatGiveMeAn = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat_Give_me_an"
//     ),
// );
import * as CommonPsychologicalIssues_ChatGiveMeAn from "./interventionResultData/CommonPsychologicalIssues/chat_Give_me_an";
const CommonPsychologicalIssues_ChatIntroduce = lazy(
  () =>
    import(
      "./interventionResultData/CommonPsychologicalIssues/chat_Introduce_"
    ),
);
const CommonPsychologicalIssues_ChatRelaxation = lazy(
  () =>
    import(
      "./interventionResultData/CommonPsychologicalIssues/chat_Relaxation"
    ),
);
const CommonPsychologicalIssues_ChatYogaAndM = lazy(
  () =>
    import(
      "./interventionResultData/CommonPsychologicalIssues/chat_Yoga_and_m"
    ),
);
// const CommonPsychologicalIssues_ChatLinkToUs = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat_link_to_us"
//     ),
// );
import * as CommonPsychologicalIssues_ChatLinkToUs from "./interventionResultData/CommonPsychologicalIssues/chat_link_to_us";
// const CommonPsychologicalIssues_RGiveMe10 = lazy(
//   () =>
//     import("./interventionResultData/CommonPsychologicalIssues/r_give_me_10"),
// );
import * as CommonPsychologicalIssues_RGiveMe10 from "./interventionResultData/CommonPsychologicalIssues/r_give_me_10";

// EnvironmentIssuesaffectingmentalwellbeing
const EnvironmentIssues_GiveMe10 = lazy(
  () =>
    import(
      "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/Give_me_10"
    ),
);
// const EnvironmentIssues_ChatGive10CBT = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 CBT"
//     ),
// );
import * as EnvironmentIssues_ChatGive10CBT from "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 CBT";
// const EnvironmentIssues_ChatGive10REB = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 REB"
//     ),
// );
import * as EnvironmentIssues_ChatGive10REB from "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 REB";
// const EnvironmentIssues_Chat10Common = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_10_common_"
//     ),
// );
import * as EnvironmentIssues_Chat10Common from "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_10_common_";
const EnvironmentIssues_ChatAnySoftwa = lazy(
  () =>
    import(
      "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Any_Softwa"
    ),
);
import * as EnvironmentIssues_ChatGiveMeAn from "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Give_me_an";
const EnvironmentIssues_ChatIntroduce = lazy(
  () =>
    import(
      "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Introduce_"
    ),
);
const EnvironmentIssues_ChatRelaxation = lazy(
  () =>
    import(
      "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Relaxation"
    ),
);
const EnvironmentIssues_ChatYogaAndM = lazy(
  () =>
    import(
      "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Yoga_and_m"
    ),
);
// const EnvironmentIssues_ChatLinkToUs = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_link_to_us"
//     ),
// );
import * as EnvironmentIssues_ChatLinkToUs from "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_link_to_us";
import * as EnvironmentIssues_RGiveMe10 from "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/r_give_me_10";

// FamilyandRelationship
const FamilyRelationship_GiveMe10 = lazy(
  () => import("./interventionResultData/FamilyandRelaitonship/Give_me_10"),
);
// const FamilyRelationship_ChatGive10CBT = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat give 10 CBT"),
// );
import * as FamilyRelationship_ChatGive10CBT from "./interventionResultData/FamilyandRelaitonship/chat give 10 CBT";
// const FamilyRelationship_ChatGive10REB = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat give 10 REB"),
// );
import * as FamilyRelationship_ChatGive10REB from "./interventionResultData/FamilyandRelaitonship/chat give 10 REB";
// const FamilyRelationship_Chat10Common = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat_10_common_"),
// );
import * as FamilyRelationship_Chat10Common from "./interventionResultData/FamilyandRelaitonship/chat_10_common_";
const FamilyRelationship_ChatAnySoftwa = lazy(
  () =>
    import("./interventionResultData/FamilyandRelaitonship/chat_Any_Softwa"),
);
// const FamilyRelationship_ChatGiveMeAn = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat_Give_me_an"),
// );
import * as FamilyRelationship_ChatGiveMeAn from "./interventionResultData/FamilyandRelaitonship/chat_Give_me_an";
const FamilyRelationship_ChatIntroduce = lazy(
  () =>
    import("./interventionResultData/FamilyandRelaitonship/chat_Introduce_"),
);
const FamilyRelationship_ChatRelaxation = lazy(
  () =>
    import("./interventionResultData/FamilyandRelaitonship/chat_Relaxation"),
);
const FamilyRelationship_ChatYogaAndM = lazy(
  () =>
    import("./interventionResultData/FamilyandRelaitonship/chat_Yoga_and_m"),
);
import * as FamilyRelationship_ChatLinkToUs from "./interventionResultData/FamilyandRelaitonship/chat_link_to_us";
import * as FamilyRelationship_RGiveMe10 from "./interventionResultData/FamilyandRelaitonship/r_give_me_10";

// FinancialMentalHealth
const FinancialMentalHealth_GiveMe10 = lazy(
  () => import("./interventionResultData/FinancialMentalHealth/Give_me_10"),
);
import * as FinancialMentalHealth_ChatGive10CBT from "./interventionResultData/FinancialMentalHealth/chat give 10 CBT";

import * as FinancialMentalHealth_ChatGive10REB from "./interventionResultData/FinancialMentalHealth/chat give 10 REB";
import * as FinancialMentalHealth_Chat10Common from "./interventionResultData/FinancialMentalHealth/chat_10_common_";
const FinancialMentalHealth_ChatAnySoftwa = lazy(
  () =>
    import("./interventionResultData/FinancialMentalHealth/chat_Any_Softwa"),
);
import * as FinancialMentalHealth_ChatGiveMeAn from "./interventionResultData/FinancialMentalHealth/chat_Give_me_an";
const FinancialMentalHealth_ChatIntroduce = lazy(
  () =>
    import("./interventionResultData/FinancialMentalHealth/chat_Introduce_"),
);
const FinancialMentalHealth_ChatRelaxation = lazy(
  () =>
    import("./interventionResultData/FinancialMentalHealth/chat_Relaxation"),
);
const FinancialMentalHealth_ChatYogaAndM = lazy(
  () =>
    import("./interventionResultData/FinancialMentalHealth/chat_Yoga_and_m"),
);
import * as FinancialMentalHealth_ChatLinkToUs from "./interventionResultData/FinancialMentalHealth/chat_link_to_us";
import * as FinancialMentalHealth_RGiveMe10 from "./interventionResultData/FinancialMentalHealth/r_Give_me_10";

// GeneralPhysicalFitness
const GeneralPhysicalFitness_GiveMe10 = lazy(
  () => import("./interventionResultData/GeneralPhysicalFitness/Give_me_10"),
);
import * as GeneralPhysicalFitness_ChatGive10CBT from "./interventionResultData/GeneralPhysicalFitness/chat give 10 CBT";
import * as GeneralPhysicalFitness_ChatGive10REB from "./interventionResultData/GeneralPhysicalFitness/chat give 10 REB";

import * as GeneralPhysicalFitness_Chat10Common from "./interventionResultData/GeneralPhysicalFitness/chat_10_common_";

const GeneralPhysicalFitness_ChatAnySoftwa = lazy(
  () =>
    import("./interventionResultData/GeneralPhysicalFitness/chat_Any_Softwa"),
);
import * as GeneralPhysicalFitness_ChatGiveMeAn from "./interventionResultData/GeneralPhysicalFitness/chat_Give_me_an";

const GeneralPhysicalFitness_ChatIntroduce = lazy(
  () =>
    import("./interventionResultData/GeneralPhysicalFitness/chat_Introduce_"),
);
const GeneralPhysicalFitness_ChatRelaxation = lazy(
  () =>
    import("./interventionResultData/GeneralPhysicalFitness/chat_Relaxation"),
);
const GeneralPhysicalFitness_ChatYogaAndM = lazy(
  () =>
    import("./interventionResultData/GeneralPhysicalFitness/chat_Yoga_and_m"),
);
import * as GeneralPhysicalFitness_ChatLinkToUs from "./interventionResultData/GeneralPhysicalFitness/chat_link_to_us";

import * as GeneralPhysicalFitness_RGiveMe10 from "./interventionResultData/GeneralPhysicalFitness/r_give_me_10";

// InternetDependence
const InternetDependence_GiveMe10 = lazy(
  () => import("./interventionResultData/InternetDependence/Give_me_10"),
);
import * as InternetDependence_ChatGive10CBT from "./interventionResultData/InternetDependence/chat give 10 CBT";

import * as InternetDependence_ChatGive10REB from "./interventionResultData/InternetDependence/chat give 10 REB";

import * as InternetDependence_Chat10Common from "./interventionResultData/InternetDependence/chat_10_common_";

const InternetDependence_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/InternetDependence/chat_Any_Softwa"),
);
import * as InternetDependence_ChatGiveMeAn from "./interventionResultData/InternetDependence/chat_Give_me_an";
const InternetDependence_ChatIntroduce = lazy(
  () => import("./interventionResultData/InternetDependence/chat_Introduce_"),
);
const InternetDependence_ChatRelaxation = lazy(
  () => import("./interventionResultData/InternetDependence/chat_Relaxation"),
);
const InternetDependence_ChatYogaAndM = lazy(
  () => import("./interventionResultData/InternetDependence/chat_Yoga_and_m"),
);
import * as InternetDependence_ChatLinkToUs from "./interventionResultData/InternetDependence/chat_link_to_us";

import * as InternetDependence_RGiveMe10 from "./interventionResultData/InternetDependence/r_give_me_10";

// InternetandSocialMediaIssue
const InternetSocialMediaIssue_GiveMe10 = lazy(
  () =>
    import("./interventionResultData/InternetandSocialMediaIssue/Give_me_10"),
);
import * as InternetSocialMediaIssue_ChatGive10CBT from "./interventionResultData/InternetandSocialMediaIssue/chat give 10 CBT";

import * as InternetSocialMediaIssue_ChatGive10REB from "./interventionResultData/InternetandSocialMediaIssue/chat give 10 REB";
import * as InternetSocialMediaIssue_Chat10Common from "./interventionResultData/InternetandSocialMediaIssue/chat_10_common_";
const InternetSocialMediaIssue_ChatAnySoftwa = lazy(
  () =>
    import(
      "./interventionResultData/InternetandSocialMediaIssue/chat_Any_Softwa"
    ),
);
import * as InternetSocialMediaIssue_ChatGiveMeAn from "./interventionResultData/InternetandSocialMediaIssue/chat_Give_me_an";
const InternetSocialMediaIssue_ChatIntroduce = lazy(
  () =>
    import(
      "./interventionResultData/InternetandSocialMediaIssue/chat_Introduce_"
    ),
);
const InternetSocialMediaIssue_ChatRelaxation = lazy(
  () =>
    import(
      "./interventionResultData/InternetandSocialMediaIssue/chat_Relaxation"
    ),
);
const InternetSocialMediaIssue_ChatYogaAndM = lazy(
  () =>
    import(
      "./interventionResultData/InternetandSocialMediaIssue/chat_Yoga_and_m"
    ),
);
import * as InternetSocialMediaIssue_ChatLinkToUs from "./interventionResultData/InternetandSocialMediaIssue/chat_link_to_us";
import * as InternetSocialMediaIssue_RGiveMe10 from "./interventionResultData/InternetandSocialMediaIssue/r_give_me_10";

// ProfessionalMentalHealth
const ProfessionalMentalHealth_GiveMe10 = lazy(
  () => import("./interventionResultData/ProfessionalMentalHealth/Give_me_10"),
);
import * as ProfessionalMentalHealth_ChatGive10CBT from "./interventionResultData/ProfessionalMentalHealth/chat give 10 CBT";
import * as ProfessionalMentalHealth_ChatGive10REB from "./interventionResultData/ProfessionalMentalHealth/chat give 10 REB";
import * as ProfessionalMentalHealth_Chat10Common from "./interventionResultData/ProfessionalMentalHealth/chat_10_common_";
const ProfessionalMentalHealth_ChatAnySoftwa = lazy(
  () =>
    import("./interventionResultData/ProfessionalMentalHealth/chat_Any_Softwa"),
);
import * as ProfessionalMentalHealth_ChatGiveMeAn from "./interventionResultData/ProfessionalMentalHealth/chat_Give_me_an";

const ProfessionalMentalHealth_ChatIntroduce = lazy(
  () =>
    import("./interventionResultData/ProfessionalMentalHealth/chat_Introduce_"),
);
const ProfessionalMentalHealth_ChatRelaxation = lazy(
  () =>
    import("./interventionResultData/ProfessionalMentalHealth/chat_Relaxation"),
);
const ProfessionalMentalHealth_ChatYogaAndM = lazy(
  () =>
    import("./interventionResultData/ProfessionalMentalHealth/chat_Yoga_and_m"),
);
import * as ProfessionalMentalHealth_ChatLinkToUs from "./interventionResultData/ProfessionalMentalHealth/chat_link_to_us";

import * as ProfessionalMentalHealth_RGiveMe10 from "./interventionResultData/ProfessionalMentalHealth/r_give_me_10";

// SexLife
const SexLife_GiveMe10 = lazy(
  () => import("./interventionResultData/SexLife/Give_me_10"),
);
import * as SexLife_ChatGive10CBT from "./interventionResultData/SexLife/chat give 10 CBT";
import * as SexLife_ChatGive10REB from "./interventionResultData/SexLife/chat give 10 REB";
import * as SexLife_Chat10Common from "./interventionResultData/SexLife/chat_10_common_";
const SexLife_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/SexLife/chat_Any_Softwa"),
);
import * as SexLife_ChatGiveMeAn from "./interventionResultData/SexLife/chat_Give_me_an";
const SexLife_ChatIntroduce = lazy(
  () => import("./interventionResultData/SexLife/chat_Introduce_"),
);
const SexLife_ChatRelaxation = lazy(
  () => import("./interventionResultData/SexLife/chat_Relaxation"),
);
const SexLife_ChatYogaAndM = lazy(
  () => import("./interventionResultData/SexLife/chat_Yoga_and_m"),
);
import * as SexLife_ChatLinkToUs from "./interventionResultData/SexLife/chat_link_to_us";

import * as SexLife_RGiveMe10 from "./interventionResultData/SexLife/r_give_me_10";
const Sleep_GiveMe10 = lazy(
  () => import("./interventionResultData/Sleep/Give_me_10"),
);
import * as Sleep_ChatGive10CBT from "./interventionResultData/Sleep/chat give 10 CBT";
import * as Sleep_ChatGive10REB from "./interventionResultData/Sleep/chat give 10 REB";
import * as Sleep_Chat10Common from "./interventionResultData/Sleep/chat_10_common_";
const Sleep_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/Sleep/chat_Any_Softwa"),
);
import * as Sleep_ChatGiveMeAn from "./interventionResultData/Sleep/chat_Give_me_an";
const Sleep_ChatIntroduce = lazy(
  () => import("./interventionResultData/Sleep/chat_Introduce_"),
);
const Sleep_ChatRelaxation = lazy(
  () => import("./interventionResultData/Sleep/chat_Relaxation"),
);
const Sleep_ChatYogaAndM = lazy(
  () => import("./interventionResultData/Sleep/chat_Yoga_and_m"),
);
import * as Sleep_ChatLinkToUs from "./interventionResultData/Sleep/chat_link_to_us";
import * as Sleep_RGiveMe10 from "./interventionResultData/Sleep/r_give_me_10";

// SocialMentalHealth
const SocialMentalHealth_GiveMe10 = lazy(
  () => import("./interventionResultData/SocialMentalHealth/Give_me_10"),
);
import * as SocialMentalHealth_ChatGive10CBT from "./interventionResultData/SocialMentalHealth/chat give 10 CBT";

import * as SocialMentalHealth_ChatGive10REB from "./interventionResultData/SocialMentalHealth/chat give 10 REB";

import * as SocialMentalHealth_Chat10Common from "./interventionResultData/SocialMentalHealth/chat_10_common_";

const SocialMentalHealth_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/SocialMentalHealth/chat_Any_Softwa"),
);
import * as SocialMentalHealth_ChatGiveMeAn from "./interventionResultData/SocialMentalHealth/chat_Give_me_an";
const SocialMentalHealth_ChatIntroduce = lazy(
  () => import("./interventionResultData/SocialMentalHealth/chat_Introduce_"),
);
const SocialMentalHealth_ChatRelaxation = lazy(
  () => import("./interventionResultData/SocialMentalHealth/chat_Relaxation"),
);
const SocialMentalHealth_ChatYogaAndM = lazy(
  () => import("./interventionResultData/SocialMentalHealth/chat_Yoga_and_m"),
);
import * as SocialMentalHealth_ChatLinkToUs from "./interventionResultData/SocialMentalHealth/chat_link_to_us";

import * as SocialMentalHealth_RGiveMe10 from "./interventionResultData/SocialMentalHealth/r_give_me_10";

// Stress
const Stress_GiveMe10 = lazy(
  () => import("./interventionResultData/Stress/Give_me_10"),
);
import * as Stress_ChatGive10CBT from "./interventionResultData/Stress/chat give 10 CBT";

import * as Stress_ChatGive10REB from "./interventionResultData/Stress/chat give 10 REB";

import * as Stress_Chat10Common from "./interventionResultData/Stress/chat_10_common_";

const Stress_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/Stress/chat_Any_Softwa"),
);
import * as Stress_ChatGiveMeAn from "./interventionResultData/Stress/chat_Give_me_an";

const Stress_ChatIntroduce = lazy(
  () => import("./interventionResultData/Stress/chat_Introduce_"),
);
const Stress_ChatRelaxation = lazy(
  () => import("./interventionResultData/Stress/chat_Relaxation"),
);
const Stress_ChatYogaAndM = lazy(
  () => import("./interventionResultData/Stress/chat_Yoga_and_m"),
);
import * as Stress_ChatLinkToUs from "./interventionResultData/Stress/chat_link_to_us";

import * as Stress_RGiveMe10 from "./interventionResultData/Stress/r_give_me_10";

// suicidalbehavior
const SuicidalBehavior_GiveMe10 = lazy(
  () => import("./interventionResultData/suicidalbehavior/Give_me_10"),
);
import * as SuicidalBehavior_ChatGive10CBT from "./interventionResultData/suicidalbehavior/chat give 10 CBT";
import * as SuicidalBehavior_ChatGive10REB from "./interventionResultData/suicidalbehavior/chat give 10 REB";
import * as SuicidalBehavior_Chat10Common from "./interventionResultData/suicidalbehavior/chat_10_common_";
const SuicidalBehavior_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/suicidalbehavior/chat_Any_Softwa"),
);
import * as SuicidalBehavior_ChatGiveMeAn from "./interventionResultData/suicidalbehavior/chat_Give_me_an";
const SuicidalBehavior_ChatIntroduce = lazy(
  () => import("./interventionResultData/suicidalbehavior/chat_Introduce_"),
);
const SuicidalBehavior_ChatRelaxation = lazy(
  () => import("./interventionResultData/suicidalbehavior/chat_Relaxation"),
);
const SuicidalBehavior_ChatYogaAndM = lazy(
  () => import("./interventionResultData/suicidalbehavior/chat_Yoga_and_m"),
);
import * as SuicidalBehavior_ChatLinkToUs from "./interventionResultData/suicidalbehavior/chat_link_to_us";
import * as SuicidalBehavior_RGiveMe10 from "./interventionResultData/suicidalbehavior/r_give_me_10";

// YoungsterIssues
const YoungsterIssues_GiveMe10 = lazy(
  () => import("./interventionResultData/YoungsterIssues/Give_me_10"),
);
import * as YoungsterIssues_ChatGive10CBT from "./interventionResultData/YoungsterIssues/chat give 10 CBT";
import * as YoungsterIssues_ChatGive10REB from "./interventionResultData/YoungsterIssues/chat give 10 REB";
import * as YoungsterIssues_Chat10Common from "./interventionResultData/YoungsterIssues/chat_10_common_";
const YoungsterIssues_ChatAnySoftwa = lazy(
  () => import("./interventionResultData/YoungsterIssues/chat_Any_Softwa"),
);
import * as YoungsterIssues_ChatGiveMeAn from "./interventionResultData/YoungsterIssues/chat_Give_me_an";
const YoungsterIssues_ChatIntroduce = lazy(
  () => import("./interventionResultData/YoungsterIssues/chat_Introduce_"),
);
const YoungsterIssues_ChatRelaxation = lazy(
  () => import("./interventionResultData/YoungsterIssues/chat_Relaxation"),
);
const YoungsterIssues_ChatYogaAndM = lazy(
  () => import("./interventionResultData/YoungsterIssues/chat_Yoga_and_m"),
);
import * as YoungsterIssues_ChatLinkToUs from "./interventionResultData/YoungsterIssues/chat_link_to_us";
import * as YoungsterIssues_RGiveMe10 from "./interventionResultData/YoungsterIssues/r_give_me_10";

// Lazy load all components
// Addictions
// const Addictions_GiveMe10 = lazy(
//   () => import("./interventionResultData/Addictions/Give_me_10"),
// );
// // const Addictions_ChatGive10CBT = lazy(
// //   () => import("./interventionResultData/Addictions/chat give 10 CBT"),
// // );
// const Addictions_ChatGive10CBT = import(
//   "./interventionResultData/Addictions/chat give 10 CBT"
// );
// // const Addictions_ChatGive10REB = lazy(
// //   () => import("./interventionResultData/Addictions/chat give 10 REB"),
// // );
// const Addictions_ChatGive10REB = import(
//   "./interventionResultData/Addictions/chat give 10 REB"
// );
// // const Addictions_Chat10Common = lazy(
// //   () => import("./interventionResultData/Addictions/chat_10_common_"),
// // );
// const Addictions_Chat10Common = import(
//   "./interventionResultData/Addictions/chat_10_common_"
// );
// const Addictions_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/Addictions/chat_Any_Softwa"),
// );
// // const Addictions_ChatGiveMeAn = lazy(
// //   () => import("./interventionResultData/Addictions/chat_Give_me_an"),
// // );
// const Addictions_ChatGiveMeAn = import(
//   "./interventionResultData/Addictions/chat_Give_me_an"
// );
// const Addictions_ChatIntroduce = lazy(
//   () => import("./interventionResultData/Addictions/chat_Introduce_"),
// );
// const Addictions_ChatRelaxation = lazy(
//   () => import("./interventionResultData/Addictions/chat_Relaxation"),
// );
// const Addictions_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/Addictions/chat_Yoga_and_m"),
// );
// // const Addictions_ChatLinkToUs = lazy(
// //   () => import("./interventionResultData/Addictions/chat_link_to_us"),
// // );
// const Addictions_ChatLinkToUs = import(
//   "./interventionResultData/Addictions/chat_link_to_us"
// );
// // const Addictions_RGiveMe10 = lazy(
// //   () => import("./interventionResultData/Addictions/r_give_me_10"),
// // );
// const Addictions_RGiveMe10 = import(
//   "./interventionResultData/Addictions/r_give_me_10"
// );
// // AngerManagement
// const AngerManagement_GiveMe10 = lazy(
//   () => import("./interventionResultData/AngerManagement/Give_me_10"),
// );
// // const AngerManagement_ChatGive10CBT = lazy(
// //   () => import("./interventionResultData/AngerManagement/chat give 10 CBT"),
// // );
// const AngerManagement_ChatGive10CBT = import(
//   "./interventionResultData/AngerManagement/chat give 10 CBT"
// );
// // const AngerManagement_ChatGive10REB = lazy(
// //   () => import("./interventionResultData/AngerManagement/chat give 10 REB"),
// // );
// const AngerManagement_ChatGive10REB = import(
//   "./interventionResultData/AngerManagement/chat give 10 REB"
// );
// // const AngerManagement_Chat10Common = lazy(
// //   () => import("./interventionResultData/AngerManagement/chat_10_common_"),
// // );
// const AngerManagement_Chat10Common = import(
//   "./interventionResultData/AngerManagement/chat_10_common_"
// );
// const AngerManagement_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/AngerManagement/chat_Any_Softwa"),
// );
// // const AngerManagement_ChatGiveMeAn = lazy(
// //   () => import("./interventionResultData/AngerManagement/chat_Give_me_an"),
// // );`
// const AngerManagement_ChatGiveMeAn = import(
//   "./interventionResultData/AngerManagement/chat_Give_me_an"
// );
// const AngerManagement_ChatIntroduce = lazy(
//   () => import("./interventionResultData/AngerManagement/chat_Introduce_"),
// );
// const AngerManagement_ChatRelaxation = lazy(
//   () => import("./interventionResultData/AngerManagement/chat_Relaxation"),
// );
// const AngerManagement_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/AngerManagement/chat_Yoga_and_m"),
// );
// const AngerManagement_ChatLinkToUs = import(
//   "./interventionResultData/AngerManagement/chat_link_to_us"
// );
// // const AngerManagement_ChatLinkToUs = lazy(
// //   () => import("./interventionResultData/AngerManagement/chat_link_to_us"),
// // );
// // const AngerManagement_RGiveMe10 = lazy(
// //   () => import("./interventionResultData/AngerManagement/r_give_me_10"),
// // );
// const AngerManagement_RGiveMe10 = import(
//   "./interventionResultData/AngerManagement/r_give_me_10"
// );
// // CommonPsychologicalIssues
// const CommonPsychologicalIssues_GiveMe10 = lazy(
//   () => import("./interventionResultData/CommonPsychologicalIssues/Give_me_10"),
// );
// // const CommonPsychologicalIssues_ChatGive10CBT = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/CommonPsychologicalIssues/chat give 10 CBT"
// //     ),
// // );
// const CommonPsychologicalIssues_ChatGive10CBT = import(
//   "./interventionResultData/CommonPsychologicalIssues/chat give 10 CBT"
// );
// // const CommonPsychologicalIssues_ChatGive10REB = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/CommonPsychologicalIssues/chat give 10 REB"
// //     ),
// // );
// const CommonPsychologicalIssues_ChatGive10REB = import(
//   "./interventionResultData/CommonPsychologicalIssues/chat give 10 REB"
// );
// // const CommonPsychologicalIssues_Chat10Common = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/CommonPsychologicalIssues/chat_10_common_"
// //     ),
// // );
// const CommonPsychologicalIssues_Chat10Common = import(
//   "./interventionResultData/CommonPsychologicalIssues/chat_10_common_"
// );
// const CommonPsychologicalIssues_ChatAnySoftwa = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat_Any_Softwa"
//     ),
// );
// // const CommonPsychologicalIssues_ChatGiveMeAn = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/CommonPsychologicalIssues/chat_Give_me_an"
// //     ),
// // );
// const CommonPsychologicalIssues_ChatGiveMeAn = import(
//   "./interventionResultData/CommonPsychologicalIssues/chat_Give_me_an"
// );
// const CommonPsychologicalIssues_ChatIntroduce = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat_Introduce_"
//     ),
// );
// const CommonPsychologicalIssues_ChatRelaxation = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat_Relaxation"
//     ),
// );
// const CommonPsychologicalIssues_ChatYogaAndM = lazy(
//   () =>
//     import(
//       "./interventionResultData/CommonPsychologicalIssues/chat_Yoga_and_m"
//     ),
// );
// // const CommonPsychologicalIssues_ChatLinkToUs = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/CommonPsychologicalIssues/chat_link_to_us"
// //     ),
// // );
// const CommonPsychologicalIssues_ChatLinkToUs = import(
//   "./interventionResultData/CommonPsychologicalIssues/chat_link_to_us"
// );
// // const CommonPsychologicalIssues_RGiveMe10 = lazy(
// //   () =>
// //     import("./interventionResultData/CommonPsychologicalIssues/r_give_me_10"),
// // );
// const CommonPsychologicalIssues_RGiveMe10 = import(
//   "./interventionResultData/CommonPsychologicalIssues/r_give_me_10"
// );

// // EnvironmentIssuesaffectingmentalwellbeing
// const EnvironmentIssues_GiveMe10 = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/Give_me_10"
//     ),
// );
// // const EnvironmentIssues_ChatGive10CBT = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 CBT"
// //     ),
// // );
// const EnvironmentIssues_ChatGive10CBT = import(
//   "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 CBT"
// );
// // const EnvironmentIssues_ChatGive10REB = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 REB"
// //     ),
// // );
// const EnvironmentIssues_ChatGive10REB = import(
//   "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat give 10 REB"
// );
// // const EnvironmentIssues_Chat10Common = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_10_common_"
// //     ),
// // );
// const EnvironmentIssues_Chat10Common = import(
//   "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_10_common_"
// );
// const EnvironmentIssues_ChatAnySoftwa = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Any_Softwa"
//     ),
// );
// const EnvironmentIssues_ChatGiveMeAn = import(
//   "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Give_me_an"
// );
// const EnvironmentIssues_ChatIntroduce = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Introduce_"
//     ),
// );
// const EnvironmentIssues_ChatRelaxation = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Relaxation"
//     ),
// );
// const EnvironmentIssues_ChatYogaAndM = lazy(
//   () =>
//     import(
//       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_Yoga_and_m"
//     ),
// );
// // const EnvironmentIssues_ChatLinkToUs = lazy(
// //   () =>
// //     import(
// //       "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_link_to_us"
// //     ),
// // );
// const EnvironmentIssues_ChatLinkToUs = import(
//   "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/chat_link_to_us"
// );
// const EnvironmentIssues_RGiveMe10 = import(
//   "./interventionResultData/EnvironmentIssuesaffectingmentalwellbeing/r_give_me_10"
// );

// // FamilyandRelationship
// const FamilyRelationship_GiveMe10 = lazy(
//   () => import("./interventionResultData/FamilyandRelaitonship/Give_me_10"),
// );
// // const FamilyRelationship_ChatGive10CBT = lazy(
// //   () =>
// //     import("./interventionResultData/FamilyandRelaitonship/chat give 10 CBT"),
// // );
// const FamilyRelationship_ChatGive10CBT = import(
//   "./interventionResultData/FamilyandRelaitonship/chat give 10 CBT"
// );
// // const FamilyRelationship_ChatGive10REB = lazy(
// //   () =>
// //     import("./interventionResultData/FamilyandRelaitonship/chat give 10 REB"),
// // );
// const FamilyRelationship_ChatGive10REB = import(
//   "./interventionResultData/FamilyandRelaitonship/chat give 10 REB"
// );
// // const FamilyRelationship_Chat10Common = lazy(
// //   () =>
// //     import("./interventionResultData/FamilyandRelaitonship/chat_10_common_"),
// // );
// const FamilyRelationship_Chat10Common = import(
//   "./interventionResultData/FamilyandRelaitonship/chat_10_common_"
// );
// const FamilyRelationship_ChatAnySoftwa = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat_Any_Softwa"),
// );
// // const FamilyRelationship_ChatGiveMeAn = lazy(
// //   () =>
// //     import("./interventionResultData/FamilyandRelaitonship/chat_Give_me_an"),
// // );
// const FamilyRelationship_ChatGiveMeAn = import(
//   "./interventionResultData/FamilyandRelaitonship/chat_Give_me_an"
// );
// const FamilyRelationship_ChatIntroduce = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat_Introduce_"),
// );
// const FamilyRelationship_ChatRelaxation = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat_Relaxation"),
// );
// const FamilyRelationship_ChatYogaAndM = lazy(
//   () =>
//     import("./interventionResultData/FamilyandRelaitonship/chat_Yoga_and_m"),
// );
// const FamilyRelationship_ChatLinkToUs = import(
//   "./interventionResultData/FamilyandRelaitonship/chat_link_to_us"
// );
// const FamilyRelationship_RGiveMe10 = import(
//   "./interventionResultData/FamilyandRelaitonship/r_give_me_10"
// );

// // FinancialMentalHealth
// const FinancialMentalHealth_GiveMe10 = lazy(
//   () => import("./interventionResultData/FinancialMentalHealth/Give_me_10"),
// );
// const FinancialMentalHealth_ChatGive10CBT = import(
//   "./interventionResultData/FinancialMentalHealth/chat give 10 CBT"
// );

// const FinancialMentalHealth_ChatGive10REB = import(
//   "./interventionResultData/FinancialMentalHealth/chat give 10 REB"
// );
// const FinancialMentalHealth_Chat10Common = import(
//   "./interventionResultData/FinancialMentalHealth/chat_10_common_"
// );
// const FinancialMentalHealth_ChatAnySoftwa = lazy(
//   () =>
//     import("./interventionResultData/FinancialMentalHealth/chat_Any_Softwa"),
// );
// const FinancialMentalHealth_ChatGiveMeAn = import(
//   "./interventionResultData/FinancialMentalHealth/chat_Give_me_an"
// );
// const FinancialMentalHealth_ChatIntroduce = lazy(
//   () =>
//     import("./interventionResultData/FinancialMentalHealth/chat_Introduce_"),
// );
// const FinancialMentalHealth_ChatRelaxation = lazy(
//   () =>
//     import("./interventionResultData/FinancialMentalHealth/chat_Relaxation"),
// );
// const FinancialMentalHealth_ChatYogaAndM = lazy(
//   () =>
//     import("./interventionResultData/FinancialMentalHealth/chat_Yoga_and_m"),
// );
// const FinancialMentalHealth_ChatLinkToUs = lazy(
//   () =>
//     import("./interventionResultData/FinancialMentalHealth/chat_link_to_us"),
// );
// const FinancialMentalHealth_RGiveMe10 = import(
//   "./interventionResultData/FinancialMentalHealth/r_Give_me_10"
// );

// // GeneralPhysicalFitness
// const GeneralPhysicalFitness_GiveMe10 = lazy(
//   () => import("./interventionResultData/GeneralPhysicalFitness/Give_me_10"),
// );
// const GeneralPhysicalFitness_ChatGive10CBT = import(
//   "./interventionResultData/GeneralPhysicalFitness/chat give 10 CBT"
// );
// const GeneralPhysicalFitness_ChatGive10REB = import(
//   "./interventionResultData/GeneralPhysicalFitness/chat give 10 REB"
// );

// const GeneralPhysicalFitness_Chat10Common = import(
//   "./interventionResultData/GeneralPhysicalFitness/chat_10_common_"
// );

// const GeneralPhysicalFitness_ChatAnySoftwa = lazy(
//   () =>
//     import("./interventionResultData/GeneralPhysicalFitness/chat_Any_Softwa"),
// );
// const GeneralPhysicalFitness_ChatGiveMeAn = import(
//   "./interventionResultData/GeneralPhysicalFitness/chat_Give_me_an"
// );

// const GeneralPhysicalFitness_ChatIntroduce = lazy(
//   () =>
//     import("./interventionResultData/GeneralPhysicalFitness/chat_Introduce_"),
// );
// const GeneralPhysicalFitness_ChatRelaxation = lazy(
//   () =>
//     import("./interventionResultData/GeneralPhysicalFitness/chat_Relaxation"),
// );
// const GeneralPhysicalFitness_ChatYogaAndM = lazy(
//   () =>
//     import("./interventionResultData/GeneralPhysicalFitness/chat_Yoga_and_m"),
// );
// const GeneralPhysicalFitness_ChatLinkToUs = import(
//   "./interventionResultData/GeneralPhysicalFitness/chat_link_to_us"
// );

// const GeneralPhysicalFitness_RGiveMe10 = () =>
//   import("./interventionResultData/GeneralPhysicalFitness/r_give_me_10");

// // InternetDependence
// const InternetDependence_GiveMe10 = lazy(
//   () => import("./interventionResultData/InternetDependence/Give_me_10"),
// );
// const InternetDependence_ChatGive10CBT = import(
//   "./interventionResultData/InternetDependence/chat give 10 CBT"
// );

// const InternetDependence_ChatGive10REB = import(
//   "./interventionResultData/InternetDependence/chat give 10 REB"
// );

// const InternetDependence_Chat10Common = import(
//   "./interventionResultData/InternetDependence/chat_10_common_"
// );

// const InternetDependence_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/InternetDependence/chat_Any_Softwa"),
// );
// const InternetDependence_ChatGiveMeAn = import(
//   "./interventionResultData/InternetDependence/chat_Give_me_an"
// );
// const InternetDependence_ChatIntroduce = lazy(
//   () => import("./interventionResultData/InternetDependence/chat_Introduce_"),
// );
// const InternetDependence_ChatRelaxation = lazy(
//   () => import("./interventionResultData/InternetDependence/chat_Relaxation"),
// );
// const InternetDependence_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/InternetDependence/chat_Yoga_and_m"),
// );
// const InternetDependence_ChatLinkToUs = import(
//   "./interventionResultData/InternetDependence/chat_link_to_us"
// );

// const InternetDependence_RGiveMe10 = import(
//   "./interventionResultData/InternetDependence/r_give_me_10"
// );

// // InternetandSocialMediaIssue
// const InternetSocialMediaIssue_GiveMe10 = lazy(
//   () =>
//     import("./interventionResultData/InternetandSocialMediaIssue/Give_me_10"),
// );
// const InternetSocialMediaIssue_ChatGive10CBT = import(
//   "./interventionResultData/InternetandSocialMediaIssue/chat give 10 CBT"
// );

// const InternetSocialMediaIssue_ChatGive10REB = import(
//   "./interventionResultData/InternetandSocialMediaIssue/chat give 10 REB"
// );
// const InternetSocialMediaIssue_Chat10Common = import(
//   "./interventionResultData/InternetandSocialMediaIssue/chat_10_common_"
// );
// const InternetSocialMediaIssue_ChatAnySoftwa = lazy(
//   () =>
//     import(
//       "./interventionResultData/InternetandSocialMediaIssue/chat_Any_Softwa"
//     ),
// );
// const InternetSocialMediaIssue_ChatGiveMeAn = import(
//   "./interventionResultData/InternetandSocialMediaIssue/chat_Give_me_an"
// );
// const InternetSocialMediaIssue_ChatIntroduce = lazy(
//   () =>
//     import(
//       "./interventionResultData/InternetandSocialMediaIssue/chat_Introduce_"
//     ),
// );
// const InternetSocialMediaIssue_ChatRelaxation = lazy(
//   () =>
//     import(
//       "./interventionResultData/InternetandSocialMediaIssue/chat_Relaxation"
//     ),
// );
// const InternetSocialMediaIssue_ChatYogaAndM = lazy(
//   () =>
//     import(
//       "./interventionResultData/InternetandSocialMediaIssue/chat_Yoga_and_m"
//     ),
// );
// const InternetSocialMediaIssue_ChatLinkToUs = import(
//   "./interventionResultData/InternetandSocialMediaIssue/chat_link_to_us"
// );
// const InternetSocialMediaIssue_RGiveMe10 = import(
//   "./interventionResultData/InternetandSocialMediaIssue/r_give_me_10"
// );

// // ProfessionalMentalHealth
// const ProfessionalMentalHealth_GiveMe10 = lazy(
//   () => import("./interventionResultData/ProfessionalMentalHealth/Give_me_10"),
// );
// const ProfessionalMentalHealth_ChatGive10CBT = import(
//   "./interventionResultData/ProfessionalMentalHealth/chat give 10 CBT"
// );
// const ProfessionalMentalHealth_ChatGive10REB = import(
//   "./interventionResultData/ProfessionalMentalHealth/chat give 10 REB"
// );
// const ProfessionalMentalHealth_Chat10Common = import(
//   "./interventionResultData/ProfessionalMentalHealth/chat_10_common_"
// );
// const ProfessionalMentalHealth_ChatAnySoftwa = lazy(
//   () =>
//     import("./interventionResultData/ProfessionalMentalHealth/chat_Any_Softwa"),
// );
// const ProfessionalMentalHealth_ChatGiveMeAn = import(
//   "./interventionResultData/ProfessionalMentalHealth/chat_Give_me_an"
// );

// const ProfessionalMentalHealth_ChatIntroduce = lazy(
//   () =>
//     import("./interventionResultData/ProfessionalMentalHealth/chat_Introduce_"),
// );
// const ProfessionalMentalHealth_ChatRelaxation = lazy(
//   () =>
//     import("./interventionResultData/ProfessionalMentalHealth/chat_Relaxation"),
// );
// const ProfessionalMentalHealth_ChatYogaAndM = lazy(
//   () =>
//     import("./interventionResultData/ProfessionalMentalHealth/chat_Yoga_and_m"),
// );
// const ProfessionalMentalHealth_ChatLinkToUs = import(
//   "./interventionResultData/ProfessionalMentalHealth/chat_link_to_us"
// );

// const ProfessionalMentalHealth_RGiveMe10 = import(
//   "./interventionResultData/ProfessionalMentalHealth/r_give_me_10"
// );

// // SexLife
// const SexLife_GiveMe10 = lazy(
//   () => import("./interventionResultData/SexLife/Give_me_10"),
// );
// const SexLife_ChatGive10CBT = import(
//   "./interventionResultData/SexLife/chat give 10 CBT"
// );
// const SexLife_ChatGive10REB = import(
//   "./interventionResultData/SexLife/chat give 10 REB"
// );
// const SexLife_Chat10Common = import(
//   "./interventionResultData/SexLife/chat_10_common_"
// );
// const SexLife_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/SexLife/chat_Any_Softwa"),
// );
// const SexLife_ChatGiveMeAn = import(
//   "./interventionResultData/SexLife/chat_Give_me_an"
// );
// const SexLife_ChatIntroduce = lazy(
//   () => import("./interventionResultData/SexLife/chat_Introduce_"),
// );
// const SexLife_ChatRelaxation = lazy(
//   () => import("./interventionResultData/SexLife/chat_Relaxation"),
// );
// const SexLife_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/SexLife/chat_Yoga_and_m"),
// );
// const SexLife_ChatLinkToUs = import(
//   "./interventionResultData/SexLife/chat_link_to_us"
// );

// const SexLife_RGiveMe10 = import(
//   "./interventionResultData/SexLife/r_give_me_10"
// );
// const Sleep_GiveMe10 = lazy(
//   () => import("./interventionResultData/Sleep/Give_me_10"),
// );
// const Sleep_ChatGive10CBT = import(
//   "./interventionResultData/Sleep/chat give 10 CBT"
// );
// const Sleep_ChatGive10REB = import(
//   "./interventionResultData/Sleep/chat give 10 REB"
// );
// const Sleep_Chat10Common = import(
//   "./interventionResultData/Sleep/chat_10_common_"
// );
// const Sleep_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/Sleep/chat_Any_Softwa"),
// );
// const Sleep_ChatGiveMeAn = import(
//   "./interventionResultData/Sleep/chat_Give_me_an"
// );
// const Sleep_ChatIntroduce = lazy(
//   () => import("./interventionResultData/Sleep/chat_Introduce_"),
// );
// const Sleep_ChatRelaxation = lazy(
//   () => import("./interventionResultData/Sleep/chat_Relaxation"),
// );
// const Sleep_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/Sleep/chat_Yoga_and_m"),
// );
// const Sleep_ChatLinkToUs = import(
//   "./interventionResultData/Sleep/chat_link_to_us"
// );
// const Sleep_RGiveMe10 = import("./interventionResultData/Sleep/r_give_me_10");

// // SocialMentalHealth
// const SocialMentalHealth_GiveMe10 = lazy(
//   () => import("./interventionResultData/SocialMentalHealth/Give_me_10"),
// );
// const SocialMentalHealth_ChatGive10CBT = import(
//   "./interventionResultData/SocialMentalHealth/chat give 10 CBT"
// );

// const SocialMentalHealth_ChatGive10REB = import(
//   "./interventionResultData/SocialMentalHealth/chat give 10 REB"
// );

// const SocialMentalHealth_Chat10Common = import(
//   "./interventionResultData/SocialMentalHealth/chat_10_common_"
// );

// const SocialMentalHealth_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/SocialMentalHealth/chat_Any_Softwa"),
// );
// const SocialMentalHealth_ChatGiveMeAn = import(
//   "./interventionResultData/SocialMentalHealth/chat_Give_me_an"
// );

// const SocialMentalHealth_ChatIntroduce = lazy(
//   () => import("./interventionResultData/SocialMentalHealth/chat_Introduce_"),
// );
// const SocialMentalHealth_ChatRelaxation = lazy(
//   () => import("./interventionResultData/SocialMentalHealth/chat_Relaxation"),
// );
// const SocialMentalHealth_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/SocialMentalHealth/chat_Yoga_and_m"),
// );
// const SocialMentalHealth_ChatLinkToUs = import(
//   "./interventionResultData/SocialMentalHealth/chat_link_to_us"
// );

// const SocialMentalHealth_RGiveMe10 = import(
//   "./interventionResultData/SocialMentalHealth/r_give_me_10"
// );

// // Stress
// const Stress_GiveMe10 = lazy(
//   () => import("./interventionResultData/Stress/Give_me_10"),
// );
// const Stress_ChatGive10CBT = import(
//   "./interventionResultData/Stress/chat give 10 CBT"
// );

// const Stress_ChatGive10REB = import(
//   "./interventionResultData/Stress/chat give 10 REB"
// );

// const Stress_Chat10Common = import(
//   "./interventionResultData/Stress/chat_10_common_"
// );

// const Stress_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/Stress/chat_Any_Softwa"),
// );
// const Stress_ChatGiveMeAn = import(
//   "./interventionResultData/Stress/chat_Give_me_an"
// );

// const Stress_ChatIntroduce = lazy(
//   () => import("./interventionResultData/Stress/chat_Introduce_"),
// );
// const Stress_ChatRelaxation = lazy(
//   () => import("./interventionResultData/Stress/chat_Relaxation"),
// );
// const Stress_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/Stress/chat_Yoga_and_m"),
// );
// const Stress_ChatLinkToUs = import(
//   "./interventionResultData/Stress/chat_link_to_us"
// );

// const Stress_RGiveMe10 = import("./interventionResultData/Stress/r_give_me_10");

// // suicidalbehavior
// const SuicidalBehavior_GiveMe10 = lazy(
//   () => import("./interventionResultData/suicidalbehavior/Give_me_10"),
// );
// const SuicidalBehavior_ChatGive10CBT = import(
//   "./interventionResultData/suicidalbehavior/chat give 10 CBT"
// );
// const SuicidalBehavior_ChatGive10REB = import(
//   "./interventionResultData/suicidalbehavior/chat give 10 REB"
// );
// const SuicidalBehavior_Chat10Common = import(
//   "./interventionResultData/suicidalbehavior/chat_10_common_"
// );
// const SuicidalBehavior_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/suicidalbehavior/chat_Any_Softwa"),
// );
// const SuicidalBehavior_ChatGiveMeAn = import(
//   "./interventionResultData/suicidalbehavior/chat_Give_me_an"
// );
// const SuicidalBehavior_ChatIntroduce = lazy(
//   () => import("./interventionResultData/suicidalbehavior/chat_Introduce_"),
// );
// const SuicidalBehavior_ChatRelaxation = lazy(
//   () => import("./interventionResultData/suicidalbehavior/chat_Relaxation"),
// );
// const SuicidalBehavior_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/suicidalbehavior/chat_Yoga_and_m"),
// );
// const SuicidalBehavior_ChatLinkToUs = import(
//   "./interventionResultData/suicidalbehavior/chat_link_to_us"
// );
// const SuicidalBehavior_RGiveMe10 = import(
//   "./interventionResultData/suicidalbehavior/r_give_me_10"
// );

// // YoungsterIssues
// const YoungsterIssues_GiveMe10 = lazy(
//   () => import("./interventionResultData/YoungsterIssues/Give_me_10"),
// );
// const YoungsterIssues_ChatGive10CBT = import(
//   "./interventionResultData/YoungsterIssues/chat give 10 CBT"
// );
// import * as YoungsterIssues_ChatGive10REB from "./interventionResultData/YoungsterIssues/chat give 10 REB";
// const YoungsterIssues_Chat10Common = import(
//   "./interventionResultData/YoungsterIssues/chat_10_common_"
// );
// const YoungsterIssues_ChatAnySoftwa = lazy(
//   () => import("./interventionResultData/YoungsterIssues/chat_Any_Softwa"),
// );
// const YoungsterIssues_ChatGiveMeAn = lazy(
//   () => import("./interventionResultData/YoungsterIssues/chat_Give_me_an"),
// );
// const YoungsterIssues_ChatIntroduce = lazy(
//   () => import("./interventionResultData/YoungsterIssues/chat_Introduce_"),
// );
// const YoungsterIssues_ChatRelaxation = lazy(
//   () => import("./interventionResultData/YoungsterIssues/chat_Relaxation"),
// );
// const YoungsterIssues_ChatYogaAndM = lazy(
//   () => import("./interventionResultData/YoungsterIssues/chat_Yoga_and_m"),
// );
// const YoungsterIssues_ChatLinkToUs = import(
//   "./interventionResultData/YoungsterIssues/chat_link_to_us"
// );
// const YoungsterIssues_RGiveMe10 = import(
//   "./interventionResultData/YoungsterIssues/r_give_me_10"
// );

// Create a component registry for dynamic loading
// export const ComponentRegistry = {
//   // Addictions
//   Addictions_GiveMe10: Addictions_GiveMe10,
//   Addictions_ChatGive10CBT: Addictions_ChatGive10CBT,
//   Addictions_ChatGive10REB: Addictions_ChatGive10REB,
//   Addictions_Chat10Common: Addictions_Chat10Common,
//   Addictions_ChatAnySoftwa: Addictions_ChatAnySoftwa,
//   Addictions_ChatGiveMeAn: Addictions_ChatGiveMeAn,
//   Addictions_ChatIntroduce: Addictions_ChatIntroduce,
//   Addictions_ChatRelaxation: Addictions_ChatRelaxation,
//   Addictions_ChatYogaAndM: Addictions_ChatYogaAndM,
//   Addictions_ChatLinkToUs: Addictions_ChatLinkToUs,
//   Addictions_RGiveMe10: Addictions_RGiveMe10,

//   // AngerManagement
//   AngerManagement_GiveMe10: AngerManagement_GiveMe10,
//   AngerManagement_ChatGive10CBT: AngerManagement_ChatGive10CBT,
//   AngerManagement_ChatGive10REB: AngerManagement_ChatGive10REB,
//   AngerManagement_Chat10Common: AngerManagement_Chat10Common,
//   AngerManagement_ChatAnySoftwa: AngerManagement_ChatAnySoftwa,
//   AngerManagement_ChatGiveMeAn: AngerManagement_ChatGiveMeAn,
//   AngerManagement_ChatIntroduce: AngerManagement_ChatIntroduce,
//   AngerManagement_ChatRelaxation: AngerManagement_ChatRelaxation,
//   AngerManagement_ChatYogaAndM: AngerManagement_ChatYogaAndM,
//   AngerManagement_ChatLinkToUs: AngerManagement_ChatLinkToUs,
//   AngerManagement_RGiveMe10: AngerManagement_RGiveMe10,

//   // CommonPsychologicalIssues
//   CommonPsychologicalIssues_GiveMe10: CommonPsychologicalIssues_GiveMe10,
//   CommonPsychologicalIssues_ChatGive10CBT:
//     CommonPsychologicalIssues_ChatGive10CBT,
//   CommonPsychologicalIssues_ChatGive10REB:
//     CommonPsychologicalIssues_ChatGive10REB,
//   CommonPsychologicalIssues_Chat10Common:
//     CommonPsychologicalIssues_Chat10Common,
//   CommonPsychologicalIssues_ChatAnySoftwa:
//     CommonPsychologicalIssues_ChatAnySoftwa,
//   CommonPsychologicalIssues_ChatGiveMeAn:
//     CommonPsychologicalIssues_ChatGiveMeAn,
//   CommonPsychologicalIssues_ChatIntroduce:
//     CommonPsychologicalIssues_ChatIntroduce,
//   CommonPsychologicalIssues_ChatRelaxation:
//     CommonPsychologicalIssues_ChatRelaxation,
//   CommonPsychologicalIssues_ChatYogaAndM:
//     CommonPsychologicalIssues_ChatYogaAndM,
//   CommonPsychologicalIssues_ChatLinkToUs:
//     CommonPsychologicalIssues_ChatLinkToUs,
//   CommonPsychologicalIssues_RGiveMe10: CommonPsychologicalIssues_RGiveMe10,

//   // EnvironmentIssues
//   EnvironmentIssues_GiveMe10: EnvironmentIssues_GiveMe10,
//   EnvironmentIssues_ChatGive10CBT: EnvironmentIssues_ChatGive10CBT,
//   EnvironmentIssues_ChatGive10REB: EnvironmentIssues_ChatGive10REB,
//   EnvironmentIssues_Chat10Common: EnvironmentIssues_Chat10Common,
//   EnvironmentIssues_ChatAnySoftwa: EnvironmentIssues_ChatAnySoftwa,
//   EnvironmentIssues_ChatGiveMeAn: EnvironmentIssues_ChatGiveMeAn,
//   EnvironmentIssues_ChatIntroduce: EnvironmentIssues_ChatIntroduce,
//   EnvironmentIssues_ChatRelaxation: EnvironmentIssues_ChatRelaxation,
//   EnvironmentIssues_ChatYogaAndM: EnvironmentIssues_ChatYogaAndM,
//   EnvironmentIssues_ChatLinkToUs: EnvironmentIssues_ChatLinkToUs,
//   EnvironmentIssues_RGiveMe10: EnvironmentIssues_RGiveMe10,

//   // FamilyRelationship
//   FamilyRelationship_GiveMe10: FamilyRelationship_GiveMe10,
//   FamilyRelationship_ChatGive10CBT: FamilyRelationship_ChatGive10CBT,
//   FamilyRelationship_ChatGive10REB: FamilyRelationship_ChatGive10REB,
//   FamilyRelationship_Chat10Common: FamilyRelationship_Chat10Common,
//   FamilyRelationship_ChatAnySoftwa: FamilyRelationship_ChatAnySoftwa,
//   FamilyRelationship_ChatGiveMeAn: FamilyRelationship_ChatGiveMeAn,
//   FamilyRelationship_ChatIntroduce: FamilyRelationship_ChatIntroduce,
//   FamilyRelationship_ChatRelaxation: FamilyRelationship_ChatRelaxation,
//   FamilyRelationship_ChatYogaAndM: FamilyRelationship_ChatYogaAndM,
//   FamilyRelationship_ChatLinkToUs: FamilyRelationship_ChatLinkToUs,
//   FamilyRelationship_RGiveMe10: FamilyRelationship_RGiveMe10,

//   // FinancialMentalHealth
//   FinancialMentalHealth_GiveMe10: FinancialMentalHealth_GiveMe10,
//   FinancialMentalHealth_ChatGive10CBT: FinancialMentalHealth_ChatGive10CBT,
//   FinancialMentalHealth_ChatGive10REB: FinancialMentalHealth_ChatGive10REB,
//   FinancialMentalHealth_Chat10Common: FinancialMentalHealth_Chat10Common,
//   FinancialMentalHealth_ChatAnySoftwa: FinancialMentalHealth_ChatAnySoftwa,
//   FinancialMentalHealth_ChatGiveMeAn: FinancialMentalHealth_ChatGiveMeAn,
//   FinancialMentalHealth_ChatIntroduce: FinancialMentalHealth_ChatIntroduce,
//   FinancialMentalHealth_ChatRelaxation: FinancialMentalHealth_ChatRelaxation,
//   FinancialMentalHealth_ChatYogaAndM: FinancialMentalHealth_ChatYogaAndM,
//   FinancialMentalHealth_ChatLinkToUs: FinancialMentalHealth_ChatLinkToUs,
//   FinancialMentalHealth_RGiveMe10: FinancialMentalHealth_RGiveMe10,

//   // GeneralPhysicalFitness
//   GeneralPhysicalFitness_GiveMe10: GeneralPhysicalFitness_GiveMe10,
//   GeneralPhysicalFitness_ChatGive10CBT: GeneralPhysicalFitness_ChatGive10CBT,
//   GeneralPhysicalFitness_ChatGive10REB: GeneralPhysicalFitness_ChatGive10REB,
//   GeneralPhysicalFitness_Chat10Common: GeneralPhysicalFitness_Chat10Common,
//   GeneralPhysicalFitness_ChatAnySoftwa: GeneralPhysicalFitness_ChatAnySoftwa
//   GeneralPhysicalFitness_ChatGiveMeAn: GeneralPhysicalFitness_ChatGiveMeAn,
//   GeneralPhysicalFitness_ChatIntroduce: GeneralPhysicalFitness_ChatIntroduce,
//   GeneralPhysicalFitness_ChatRelaxation: GeneralPhysicalFitness_ChatRelaxation,
//   GeneralPhysicalFitness_ChatYogaAndM: GeneralPhysicalFitness_ChatYogaAndM,
//   GeneralPhysicalFitness_ChatLinkToUs: GeneralPhysicalFitness_ChatLinkToUs,
//   GeneralPhysicalFitness_RGiveMe10: GeneralPhysicalFitness_RGiveMe10,

//   // InternetDependence
//   InternetDependence_GiveMe10: InternetDependence_GiveMe10,
//   InternetDependence_ChatGive10CBT: InternetDependence_ChatGive10CBT,
//   InternetDependence_ChatGive10REB: InternetDependence_ChatGive10REB,
//   InternetDependence_Chat10Common: InternetDependence_Chat10Common,
//   InternetDependence_ChatAnySoftwa: InternetDependence_ChatAnySoftwa,
//   InternetDependence_ChatGiveMeAn: InternetDependence_ChatGiveMeAn,
//   InternetDependence_ChatIntroduce: InternetDependence_ChatIntroduce,
//   InternetDependence_ChatRelaxation: InternetDependence_ChatRelaxation,
//   InternetDependence_ChatYogaAndM: InternetDependence_ChatYogaAndM,
//   InternetDependence_ChatLinkToUs: InternetDependence_ChatLinkToUs,
//   InternetDependence_RGiveMe10: InternetDependence_RGiveMe10,

//   // InternetSocialMediaIssue
//   InternetSocialMediaIssue_GiveMe10: InternetSocialMediaIssue_GiveMe10,
//   InternetSocialMediaIssue_ChatGive10CBT:
//     InternetSocialMediaIssue_ChatGive10CBT,
//   InternetSocialMediaIssue_ChatGive10REB:
//     InternetSocialMediaIssue_ChatGive10REB,
//   InternetSocialMediaIssue_Chat10Common: InternetSocialMediaIssue_Chat10Common,
//   InternetSocialMediaIssue_ChatAnySoftwa:
//     InternetSocialMediaIssue_ChatAnySoftwa,
//   InternetSocialMediaIssue_ChatGiveMeAn: InternetSocialMediaIssue_ChatGiveMeAn,
//   InternetSocialMediaIssue_ChatIntroduce:
//     InternetSocialMediaIssue_ChatIntroduce,
//   InternetSocialMediaIssue_ChatRelaxation:
//     InternetSocialMediaIssue_ChatRelaxation,
//   InternetSocialMediaIssue_ChatYogaAndM: InternetSocialMediaIssue_ChatYogaAndM,
//   InternetSocialMediaIssue_ChatLinkToUs: InternetSocialMediaIssue_ChatLinkToUs,
//   InternetSocialMediaIssue_RGiveMe10: InternetSocialMediaIssue_RGiveMe10,

//   // ProfessionalMentalHealth
//   ProfessionalMentalHealth_GiveMe10: ProfessionalMentalHealth_GiveMe10,
//   ProfessionalMentalHealth_ChatGive10CBT:
//     ProfessionalMentalHealth_ChatGive10CBT,
//   ProfessionalMentalHealth_ChatGive10REB:
//     ProfessionalMentalHealth_ChatGive10REB,
//   ProfessionalMentalHealth_Chat10Common: ProfessionalMentalHealth_Chat10Common,
//   ProfessionalMentalHealth_ChatAnySoftwa:
//     ProfessionalMentalHealth_ChatAnySoftwa,
//   ProfessionalMentalHealth_ChatGiveMeAn: ProfessionalMentalHealth_ChatGiveMeAn,
//   ProfessionalMentalHealth_ChatIntroduce:
//     ProfessionalMentalHealth_ChatIntroduce,
//   ProfessionalMentalHealth_ChatRelaxation:
//     ProfessionalMentalHealth_ChatRelaxation,
//   ProfessionalMentalHealth_ChatYogaAndM: ProfessionalMentalHealth_ChatYogaAndM,
//   ProfessionalMentalHealth_ChatLinkToUs: ProfessionalMentalHealth_ChatLinkToUs,
//   ProfessionalMentalHealth_RGiveMe10: ProfessionalMentalHealth_RGiveMe10,

//   // SexLife
//   SexLife_GiveMe10: SexLife_GiveMe10,
//   SexLife_ChatGive10CBT: SexLife_ChatGive10CBT,
//   SexLife_ChatGive10REB: SexLife_ChatGive10REB,
//   SexLife_Chat10Common: SexLife_Chat10Common,
//   SexLife_ChatAnySoftwa: SexLife_ChatAnySoftwa,
//   SexLife_ChatGiveMeAn: SexLife_ChatGiveMeAn,
//   SexLife_ChatIntroduce: SexLife_ChatIntroduce,
//   SexLife_ChatRelaxation: SexLife_ChatRelaxation,
//   SexLife_ChatYogaAndM: SexLife_ChatYogaAndM,
//   SexLife_ChatLinkToUs: SexLife_ChatLinkToUs,
//   SexLife_RGiveMe10: SexLife_RGiveMe10,

//   // Sleep
//   Sleep_GiveMe10: Sleep_GiveMe10,
//   Sleep_ChatGive10CBT: Sleep_ChatGive10CBT,
//   Sleep_ChatGive10REB: Sleep_ChatGive10REB,
//   Sleep_Chat10Common: Sleep_Chat10Common,
//   Sleep_ChatAnySoftwa: Sleep_ChatAnySoftwa,
//   Sleep_ChatGiveMeAn: Sleep_ChatGiveMeAn,
//   Sleep_ChatIntroduce: Sleep_ChatIntroduce,
//   Sleep_ChatRelaxation: Sleep_ChatRelaxation,
//   Sleep_ChatYogaAndM: Sleep_ChatYogaAndM,
//   Sleep_ChatLinkToUs: Sleep_ChatLinkToUs,
//   Sleep_RGiveMe10: Sleep_RGiveMe10,

//   // SocialMentalHealth
//   SocialMentalHealth_GiveMe10: SocialMentalHealth_GiveMe10,
//   SocialMentalHealth_ChatGive10CBT: SocialMentalHealth_ChatGive10CBT,
//   SocialMentalHealth_ChatGive10REB: SocialMentalHealth_ChatGive10REB,
//   SocialMentalHealth_Chat10Common: SocialMentalHealth_Chat10Common,
//   SocialMentalHealth_ChatAnySoftwa: SocialMentalHealth_ChatAnySoftwa,
//   SocialMentalHealth_ChatGiveMeAn: SocialMentalHealth_ChatGiveMeAn,
//   SocialMentalHealth_ChatIntroduce: SocialMentalHealth_ChatIntroduce,
//   SocialMentalHealth_ChatRelaxation: SocialMentalHealth_ChatRelaxation,
//   SocialMentalHealth_ChatYogaAndM: SocialMentalHealth_ChatYogaAndM,
//   SocialMentalHealth_ChatLinkToUs: SocialMentalHealth_ChatLinkToUs,
//   SocialMentalHealth_RGiveMe10: SocialMentalHealth_RGiveMe10,

//   // Stress
//   Stress_GiveMe10: Stress_GiveMe10,
//   Stress_ChatGive10CBT: Stress_ChatGive10CBT,
//   Stress_ChatGive10REB: Stress_ChatGive10REB,
//   Stress_Chat10Common: Stress_Chat10Common,
//   Stress_ChatAnySoftwa: Stress_ChatAnySoftwa,
//   Stress_ChatGiveMeAn: Stress_ChatGiveMeAn,
//   Stress_ChatIntroduce: Stress_ChatIntroduce,
//   Stress_ChatRelaxation: Stress_ChatRelaxation,
//   Stress_ChatYogaAndM: Stress_ChatYogaAndM,
//   Stress_ChatLinkToUs: Stress_ChatLinkToUs,
//   Stress_RGiveMe10: Stress_RGiveMe10,

//   // suicidalbehavior
//   SuicidalBehavior_GiveMe10: SuicidalBehavior_GiveMe10,
//   SuicidalBehavior_ChatGive10CBT: SuicidalBehavior_ChatGive10CBT,
//   SuicidalBehavior_ChatGive10REB: SuicidalBehavior_ChatGive10REB,
//   SuicidalBehavior_Chat10Common: SuicidalBehavior_Chat10Common,
//   SuicidalBehavior_ChatAnySoftwa: SuicidalBehavior_ChatAnySoftwa,
//   SuicidalBehavior_ChatGiveMeAn: SuicidalBehavior_ChatGiveMeAn,
//   SuicidalBehavior_ChatIntroduce: SuicidalBehavior_ChatIntroduce,
//   SuicidalBehavior_ChatRelaxation: SuicidalBehavior_ChatRelaxation,
//   SuicidalBehavior_ChatYogaAndM: SuicidalBehavior_ChatYogaAndM,
//   SuicidalBehavior_ChatLinkToUs: SuicidalBehavior_ChatLinkToUs,
//   SuicidalBehavior_RGiveMe10: SuicidalBehavior_RGiveMe10,

//   // YoungsterIssues
//   YoungsterIssues_GiveMe10: YoungsterIssues_GiveMe10,
//   YoungsterIssues_ChatGive10CBT: YoungsterIssues_ChatGive10CBT,
//   YoungsterIssues_ChatGive10REB: YoungsterIssues_ChatGive10REB,
//   YoungsterIssues_Chat10Common: YoungsterIssues_Chat10Common,
//   YoungsterIssues_ChatAnySoftwa: YoungsterIssues_ChatAnySoftwa,
//   YoungsterIssues_ChatGiveMeAn: YoungsterIssues_ChatGiveMeAn,
//   YoungsterIssues_ChatIntroduce: YoungsterIssues_ChatIntroduce,
//   YoungsterIssues_ChatRelaxation: YoungsterIssues_ChatRelaxation,
//   YoungsterIssues_ChatYogaAndM: YoungsterIssues_ChatYogaAndM,
//   YoungsterIssues_ChatLinkToUs: YoungsterIssues_ChatLinkToUs,
//   YoungsterIssues_RGiveMe10: YoungsterIssues_RGiveMe10,
// };

// Sample interventions data structure
export const interventionsData = {
  Addictions: {
    name: t("interventionsContent.categories.addictions"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <Addictions_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <Addictions_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <Addictions_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <Addictions_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <Addictions_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <Addictions_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <Addictions_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <Addictions_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Anger Management": {
    name: t("interventionsContent.categories.angerManagement"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <AngerManagement_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <AngerManagement_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <AngerManagement_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <AngerManagement_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <AngerManagement_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <AngerManagement_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <AngerManagement_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <AngerManagement_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Common Psychological Issues": {
    name: t("interventionsContent.categories.commonPsychologicalIssues"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <CommonPsychologicalIssues_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <CommonPsychologicalIssues_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <CommonPsychologicalIssues_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <CommonPsychologicalIssues_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <CommonPsychologicalIssues_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <CommonPsychologicalIssues_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => (
              <CommonPsychologicalIssues_ChatGive10CBT.default />
            ),
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => (
              <CommonPsychologicalIssues_ChatGive10REB.default />
            ),
          },
        ],
      },
    ],
  },

  "Environment Issues Affecting Mental Wellbeing": {
    name: t(
      "interventionsContent.categories.environmentIssuesAffectingMentalWellbeing",
    ),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <EnvironmentIssues_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <EnvironmentIssues_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <EnvironmentIssues_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <EnvironmentIssues_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGiveMe10"),
            component: () => <EnvironmentIssues_RGiveMe10.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <EnvironmentIssues_ChatGiveMeAn.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <EnvironmentIssues_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <EnvironmentIssues_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Family and Relationship": {
    name: t("interventionsContent.categories.familyAndRelationship"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <FamilyRelationship_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <FamilyRelationship_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <FamilyRelationship_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <FamilyRelationship_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <FamilyRelationship_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <FamilyRelationship_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <FamilyRelationship_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <FamilyRelationship_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Financial Mental Health": {
    name: t("interventionsContent.categories.financialMentalHealth"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <FinancialMentalHealth_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <FinancialMentalHealth_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <FinancialMentalHealth_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <FinancialMentalHealth_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <FinancialMentalHealth_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <FinancialMentalHealth_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <FinancialMentalHealth_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <FinancialMentalHealth_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "General Physical Fitness": {
    name: t("interventionsContent.categories.generalPhysicalFitness"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <GeneralPhysicalFitness_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <GeneralPhysicalFitness_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <GeneralPhysicalFitness_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <GeneralPhysicalFitness_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <GeneralPhysicalFitness_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <GeneralPhysicalFitness_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <GeneralPhysicalFitness_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <GeneralPhysicalFitness_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Internet Dependence": {
    name: t("interventionsContent.categories.internetDependence"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <InternetDependence_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <InternetDependence_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <InternetDependence_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <InternetDependence_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <InternetDependence_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <InternetDependence_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <InternetDependence_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <InternetDependence_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Internet and Social Media Issue": {
    name: t("interventionsContent.categories.internetAndSocialMediaIssue"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <InternetSocialMediaIssue_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <InternetSocialMediaIssue_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <InternetSocialMediaIssue_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <InternetSocialMediaIssue_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <InternetSocialMediaIssue_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <InternetSocialMediaIssue_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <InternetSocialMediaIssue_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <InternetSocialMediaIssue_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Professional Mental Health": {
    name: t("interventionsContent.categories.professionalMentalHealth"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <ProfessionalMentalHealth_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <ProfessionalMentalHealth_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <ProfessionalMentalHealth_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <ProfessionalMentalHealth_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <ProfessionalMentalHealth_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <ProfessionalMentalHealth_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <ProfessionalMentalHealth_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <ProfessionalMentalHealth_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Sex Life": {
    name: t("interventionsContent.categories.sexLife"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <SexLife_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <SexLife_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <SexLife_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <SexLife_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <SexLife_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <SexLife_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <SexLife_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <SexLife_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  Sleep: {
    name: t("interventionsContent.categories.sleep"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <Sleep_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <Sleep_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <Sleep_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <Sleep_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <Sleep_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <Sleep_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <Sleep_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <Sleep_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Social Mental Health": {
    name: t("interventionsContent.categories.socialMentalHealth"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <SocialMentalHealth_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <SocialMentalHealth_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <SocialMentalHealth_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <SocialMentalHealth_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <SocialMentalHealth_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <SocialMentalHealth_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <SocialMentalHealth_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <SocialMentalHealth_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  Stress: {
    name: t("interventionsContent.categories.stress"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <Stress_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <Stress_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <Stress_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <Stress_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <Stress_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <Stress_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <Stress_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <Stress_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Self-care hygiene": {
    name: t("interventionsContent.categories.selfCareHygiene"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <SuicidalBehavior_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <SuicidalBehavior_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <SuicidalBehavior_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <SuicidalBehavior_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <SuicidalBehavior_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <SuicidalBehavior_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <SuicidalBehavior_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <SuicidalBehavior_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },

  "Youngster Issues": {
    name: t("interventionsContent.categories.youngsterIssues"),
    interventions: [
      {
        name: t("interventionsContent.interventionNames.primary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatIntroduce"),
            component: () => <YoungsterIssues_ChatIntroduce />,
          },
          {
            name: t("interventionsContent.typeNames.chatGiveMeAn"),
            component: () => <YoungsterIssues_ChatGiveMeAn.default />,
          },
          {
            name: t("interventionsContent.typeNames.chat10Common"),
            component: () => <YoungsterIssues_Chat10Common.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart1"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatLinkToUs"),
            component: () => <YoungsterIssues_ChatLinkToUs.default />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart2"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatYogaAndM"),
            component: () => <YoungsterIssues_ChatYogaAndM />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.secondaryPart3"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatRelaxation"),
            component: () => <YoungsterIssues_ChatRelaxation />,
          },
        ],
      },
      {
        name: t("interventionsContent.interventionNames.tertiary"),
        type: [
          {
            name: t("interventionsContent.typeNames.chatGive10CBT"),
            component: () => <YoungsterIssues_ChatGive10CBT.default />,
          },
          {
            name: t("interventionsContent.typeNames.chatGive10REB"),
            component: () => <YoungsterIssues_ChatGive10REB.default />,
          },
        ],
      },
    ],
  },
};

async function interventionObject() {
  try {
    const data = await getAllScanResults();
    console.log("Scan results fetched successfully:", data.length);

    if (data.length === 0) {
      console.warn("No scan results found in the database");
      return [];
    }

    // Helper function to normalize strings for better matching
    const normalizeString = (str: string) => {
      if (!str) return "";
      return str
        .toLowerCase()
        .replace(/\s+/g, "") // Remove all spaces
        .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric
    };

    // Map scan results to include corresponding intervention objects
    return data.map((scan) => {
      // Find the intervention data that matches the scan title
      const scanTitle = scan.scan_title;

      if (!scanTitle) {
        console.warn("Scan missing title:", scan);
        return { ...scan, interventionData: null };
      }

      // Try exact match first
      let interventionData =
        interventionsData[scanTitle as keyof typeof interventionsData];

      // If no exact match, try case-insensitive match
      if (!interventionData) {
        const keys = Object.keys(interventionsData);
        const caseInsensitiveMatch = keys.find(
          (key) => key.toLowerCase() === scanTitle.toLowerCase(),
        );

        if (caseInsensitiveMatch) {
          interventionData =
            interventionsData[
              caseInsensitiveMatch as keyof typeof interventionsData
            ];
        }
      }

      // If still no match, try normalized matching (removing spaces and special chars)
      if (!interventionData) {
        const normalizedScanTitle = normalizeString(scanTitle);
        const keys = Object.keys(interventionsData);
        const normalizedMatch = keys.find(
          (key) => normalizeString(key) === normalizedScanTitle,
        );

        if (normalizedMatch) {
          interventionData =
            interventionsData[
              normalizedMatch as keyof typeof interventionsData
            ];
        }
      }

      // If still no match, try fuzzy matching (substring)
      if (!interventionData) {
        const keys = Object.keys(interventionsData);
        // Try to find a key that contains the scan title or vice versa
        const fuzzyMatch = keys.find(
          (key) =>
            key.toLowerCase().includes(scanTitle.toLowerCase()) ||
            scanTitle.toLowerCase().includes(key.toLowerCase()),
        );

        if (fuzzyMatch) {
          interventionData =
            interventionsData[fuzzyMatch as keyof typeof interventionsData];
          console.log(`Using fuzzy match: "${scanTitle}" -> "${fuzzyMatch}"`);
        }
      }

      if (!interventionData || !scan.interventions) {
        // Log detailed info about the failed match
        console.warn(
          `No intervention match found for scan title: "${scanTitle}"`,
        );
        console.warn(
          `Available intervention titles: ${Object.keys(interventionsData).join(", ")}`,
        );

        // Return scan with null interventionData if no match or no interventions
        return {
          ...scan,
          interventionData: null,
        };
      }

      // Parse the interventions string into an array of intervention names
      const interventionNames = scan.interventions
        .split(",")
        .map((name) => name.trim());

      // Filter the interventions to only include those with matching names
      const filteredInterventions = interventionData.interventions.filter(
        (intervention) => interventionNames.includes(intervention.name),
      );

      // Modify each intervention to replace the component string with the actual component reference
      const interventionsWithComponents = filteredInterventions.map(
        (intervention) => {
          // Map each type to replace the component string with its registry reference
          const typeWithComponents = intervention.type.map((type) => {
            // Use the component string to look up the actual component in the registry
            // Instead of trying to include the actual component, just keep the component name
            return {
              ...type,
              component: type.component, // Keep as string instead of trying to resolve
            };
          });

          // Return the intervention with updated types
          return {
            ...intervention,
            type: typeWithComponents,
          };
        },
      );

      // Return the scan with the filtered intervention data with proper component references
      return {
        ...scan,
        interventionData: {
          name: interventionData.name,
          interventions: interventionsWithComponents,
        },
      };
    });
  } catch (error) {
    console.error("Error in interventionObject:", error);
    return [];
  }
}

export default interventionObject;

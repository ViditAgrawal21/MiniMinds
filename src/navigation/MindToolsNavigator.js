import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import MindTools main screen
import MindToolsScreen from '../screens/main/MindTools/MindToolsScreen';

// Import all MindTools category screens
import AngerManagementScreen from '../screens/main/MindTools/AngerManagementScreen';
import StressScreen from '../screens/main/MindTools/StressScreen';
import InternetSocialMediaScreen from '../screens/main/MindTools/InternetSocialMediaScreen';
import FamilyRelationshipScreen from '../screens/main/MindTools/FamilyRelationshipScreen';
import SleepScreen from '../screens/main/MindTools/SleepScreen';
import SuicidalBehaviourScreen from '../screens/main/MindTools/SuicidalBehaviourScreen';
import SexLifeScreen from '../screens/main/MindTools/SexLifeScreen';
import AddictionsScreen from '../screens/main/MindTools/AddictionsScreen';
import CommonPsychologicalScreen from '../screens/main/MindTools/CommonPsychologicalScreen';
import EnvironmentIssuesScreen from '../screens/main/MindTools/EnvironmentIssuesScreen';
import FinancialMentalHealthScreen from '../screens/main/MindTools/FinancialMentalHealthScreen';
import PhysicalFitnessScreen from '../screens/main/MindTools/PhysicalFitnessScreen';
import InternetDependenceScreen from '../screens/main/MindTools/InternetDependenceScreen';
import ProfessionalMentalHealthScreen from '../screens/main/MindTools/ProfessionalMentalHealthScreen';
import SocialMentalHealthScreen from '../screens/main/MindTools/SocialMentalHealthScreen';
import YoungsterIssuesScreen from '../screens/main/MindTools/YoungsterIssuesScreen';
import EmotionalIntelligenceScreen from '../screens/main/MindTools/EmotionalIntelligenceScreen';
// Miniminds screens
import BullyingScreen from '../screens/main/MindTools/Miniminds Screen/BullyingScreen';
import SelfHarmBehaviourScreen from '../screens/main/MindTools/Miniminds Screen/SelfHarmBehaviourScreen';
import BunkingScreen from '../screens/main/MindTools/Miniminds Screen/BunkingScreen';
import LearningDisabilityScreen from '../screens/main/MindTools/Miniminds Screen/LearningDisability';

// Import intervention-related screens
import InterventionsScreen from '../screens/main/MindTools/InterventionsScreen';
import InterventionDetailScreen from '../screens/main/MindTools/InterventionDetailScreen';
import JournalEntriesScreen from '../screens/main/MindTools/JournalEntriesScreen';
import JournalHistoryScreen from '../screens/main/MindTools/JournalHistoryScreen';

// Import strategy screens
import CBTScreen from '../screens/main/MindTools/strategies/CBTScreen';
import REBTScreen from '../screens/main/MindTools/strategies/REBTScreen';
import CommonSuggestionsScreen from '../screens/main/MindTools/strategies/CommonSuggestionsScreen';
import RelaxationScreen from '../screens/main/MindTools/strategies/RelaxationScreen';
import YogaScreen from '../screens/main/MindTools/strategies/YogaScreen';

// Import EQ strategy screens
import EmpathyStrategyScreen from '../screens/main/MindTools/EQStrategies/EmpathyStrategyScreen';
import MotivationStrategyScreen from '../screens/main/MindTools/EQStrategies/MotivationStrategyScreen';
import SelfAwarenessStrategyScreen from '../screens/main/MindTools/EQStrategies/SelfAwarenessStrategyScreen';
import SelfRegulationStrategyScreen from '../screens/main/MindTools/EQStrategies/SelfRegulationStrategyScreen';
import SocialSkillsStrategyScreen from '../screens/main/MindTools/EQStrategies/SocialSkillsStrategyScreen';

const MindtoolsStack = createNativeStackNavigator();

const MindToolsNavigator = () => {
  return (
    <MindtoolsStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      
      {/* Main MindTools Screen */}
      <MindtoolsStack.Screen 
        name="MindToolsMain" 
        component={MindToolsScreen} 
      />
      
      {/* Category Screens */}
      <MindtoolsStack.Screen 
        name="AngerManagementScreen" 
        component={AngerManagementScreen} 
      />
      <MindtoolsStack.Screen 
        name="StressScreen" 
        component={StressScreen} 
      />
      <MindtoolsStack.Screen 
        name="InternetSocialMediaScreen" 
        component={InternetSocialMediaScreen} 
      />
      <MindtoolsStack.Screen 
        name="FamilyRelationshipScreen" 
        component={FamilyRelationshipScreen} 
      />
      <MindtoolsStack.Screen 
        name="SleepScreen" 
        component={SleepScreen} 
      />
      <MindtoolsStack.Screen 
        name="SuicidalBehaviourScreen" 
        component={SuicidalBehaviourScreen} 
      />
      <MindtoolsStack.Screen 
        name="SexLifeScreen" 
        component={SexLifeScreen} 
      />
      <MindtoolsStack.Screen 
        name="AddictionsScreen" 
        component={AddictionsScreen} 
      />
      <MindtoolsStack.Screen 
        name="CommonPsychologicalScreen" 
        component={CommonPsychologicalScreen} 
      />
      <MindtoolsStack.Screen 
        name="EnvironmentIssuesScreen" 
        component={EnvironmentIssuesScreen} 
      />
      <MindtoolsStack.Screen 
        name="FinancialMentalHealthScreen" 
        component={FinancialMentalHealthScreen} 
      />
      <MindtoolsStack.Screen 
        name="PhysicalFitnessScreen" 
        component={PhysicalFitnessScreen} 
      />
      <MindtoolsStack.Screen 
        name="InternetDependenceScreen" 
        component={InternetDependenceScreen} 
      />
      <MindtoolsStack.Screen 
        name="ProfessionalMentalHealthScreen" 
        component={ProfessionalMentalHealthScreen} 
      />
      <MindtoolsStack.Screen 
        name="SocialMentalHealthScreen" 
        component={SocialMentalHealthScreen} 
      />
      <MindtoolsStack.Screen 
        name="YoungsterIssuesScreen" 
        component={YoungsterIssuesScreen} 
      />
      <MindtoolsStack.Screen 
        name="EmotionalIntelligenceScreen" 
        component={EmotionalIntelligenceScreen} 
      />
      <MindtoolsStack.Screen 
        name="BullyingScreen"
        component={BullyingScreen}
      />
      <MindtoolsStack.Screen 
        name="SelfHarmBehaviourScreen"
        component={SelfHarmBehaviourScreen}
      />
      <MindtoolsStack.Screen 
        name="BunkingScreen"
        component={BunkingScreen}
      />
      <MindtoolsStack.Screen 
        name="LearningDisabilityScreen"
        component={LearningDisabilityScreen}
      />
      
      {/* Intervention Related Screens */}
      <MindtoolsStack.Screen 
        name="InterventionsScreen" 
        component={InterventionsScreen} 
      />
      <MindtoolsStack.Screen 
        name="InterventionDetailScreen" 
        component={InterventionDetailScreen} 
      />
      <MindtoolsStack.Screen 
        name="JournalEntriesScreen" 
        component={JournalEntriesScreen} 
      />
      <MindtoolsStack.Screen 
        name="JournalHistoryScreen" 
        component={JournalHistoryScreen} 
      />
      
      {/* Strategy Screens */}
      <MindtoolsStack.Screen 
        name="CBTScreen" 
        component={CBTScreen} 
      />
      <MindtoolsStack.Screen 
        name="REBTScreen" 
        component={REBTScreen} 
      />
      <MindtoolsStack.Screen 
        name="CommonSuggestionsScreen" 
        component={CommonSuggestionsScreen} 
      />
      <MindtoolsStack.Screen 
        name="RelaxationScreen" 
        component={RelaxationScreen} 
      />
      <MindtoolsStack.Screen 
        name="YogaScreen" 
        component={YogaScreen} 
      />
      
      {/* EQ Strategy Screens */}
      <MindtoolsStack.Screen 
        name="EmpathyStrategyScreen" 
        component={EmpathyStrategyScreen} 
      />
      <MindtoolsStack.Screen 
        name="MotivationStrategyScreen" 
        component={MotivationStrategyScreen} 
      />
      <MindtoolsStack.Screen 
        name="SelfAwarenessStrategyScreen" 
        component={SelfAwarenessStrategyScreen} 
      />
      <MindtoolsStack.Screen 
        name="SelfRegulationStrategyScreen" 
        component={SelfRegulationStrategyScreen} 
      />
      <MindtoolsStack.Screen 
        name="SocialSkillsStrategyScreen" 
        component={SocialSkillsStrategyScreen} 
      />
      
    </MindtoolsStack.Navigator>
  );
};

export default MindToolsNavigator;

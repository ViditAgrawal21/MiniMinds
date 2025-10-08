#!/usr/bin/env python3
"""
React Native Screen Generator with Condition-Specific Data Mapping
Generates React Native screens with proper data mapping for each condition
"""

import json
import os
from typing import Dict, List, Any

class ReactNativeScreenGenerator:
    def __init__(self, data_file_path: str = None):
        self.data_file_path = data_file_path
        self.condition_data = self._load_condition_data()
    
    def _load_condition_data(self) -> Dict:
        """Load condition-specific data from JSON file"""
        if self.data_file_path and os.path.exists(self.data_file_path):
            with open(self.data_file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    
    def generate_screen(self, config: Dict[str, Any]) -> str:
        """
        Generate a React Native screen based on configuration
        
        Args:
            config: Configuration dictionary containing screen details
        
        Returns:
            Generated React Native component code
        """
        # Extract configuration values
        screen_name = config.get('screenName', 'DefaultScreen')
        condition = config.get('condition', 'default')
        icon_name = config.get('iconName', 'flash')
        icon_color = config.get('iconColor', '#3b82f6')
        symptoms = config.get('symptoms', [])
        strategies = config.get('strategies', [])
        
        # Generate imports
        imports = self._generate_imports()
        
        # Generate component
        component = self._generate_component(
            screen_name, condition, icon_name, icon_color, 
            symptoms, strategies
        )
        
        # Generate styles
        styles = self._generate_styles()
        
        return f"{imports}\n\n{component}\n\n{styles}"
    
    def _generate_imports(self) -> str:
        return '''import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "../../../../components/CustomIcon";
import { useLanguage } from "../../../../context/LanguageContext";'''
    
    def _generate_component(self, screen_name: str, condition: str, 
                          icon_name: str, icon_color: str, 
                          symptoms: List[str], strategies: List[Dict]) -> str:
        
        # Generate navigation handlers with condition mapping
        nav_handlers = self._generate_navigation_handlers(strategies, condition)
        
        # Generate symptoms JSX
        symptoms_jsx = self._generate_symptoms_jsx(symptoms, condition)
        
        # Generate strategies JSX
        strategies_jsx = self._generate_strategies_jsx(strategies, condition)
        
        return f'''export default function {screen_name}({{ navigation }}: any) {{
  const {{ t }} = useLanguage();

  const handleBackPress = () => {{
    navigation.goBack();
  }};

{nav_handlers}

  return (
    <View style={{styles.container}}>
      {{/* Header */}}
      <View style={{styles.header}}>
        <Pressable style={{styles.backButton}} onPress={{handleBackPress}}>
          <CustomIcon type="IO" name="chevron-back" size={{24}} color="#1a1a1a" />
        </Pressable>
        <Text style={{styles.headerTitle}}>
          {{t("{condition}Screen.headerTitle")}}
        </Text>
      </View>

      <ScrollView style={{styles.content}} showsVerticalScrollIndicator={{false}}>
        {{/* Illustration */}}
        <View style={{styles.illustrationContainer}}>
          <View style={{styles.illustrationBox}}>
            <View style={{styles.imageContainer}}>
              <CustomIcon type="IO" name="{icon_name}" size={{48}} color="{icon_color}" />
              <Text style={{styles.imageLabel}}>
                {{t("{condition}Screen.imageLabel")}}
              </Text>
            </View>
          </View>
        </View>

        {{/* Title and Description */}}
        <Text style={{styles.title}}>{{t("{condition}Screen.title")}}</Text>
        <Text style={{styles.description}}>
          {{t("{condition}Screen.description")}}
        </Text>

        {{/* Symptoms Section */}}
        <View style={{styles.section}}>
          <Text style={{styles.sectionTitle}}>
            {{t("{condition}Screen.symptomsTitle")}}
          </Text>

{symptoms_jsx}
        </View>

        {{/* Coping Strategies Section */}}
        <View style={{styles.section}}>
          <Text style={{styles.sectionTitle}}>
            {{t("{condition}Screen.copingStrategiesTitle")}}
          </Text>

{strategies_jsx}
        </View>

        {{/* Alert Box */}}
        <View style={{styles.alertBox}}>
          <View style={{styles.alertHeader}}>
            <View style={{styles.alertIconContainer}}>
              <CustomIcon type="IO" name="warning" size={{16}} color="#dc2626" />
            </View>
            <Text style={{styles.alertTitle}}>
              {{t("{condition}Screen.alertTitle")}}
            </Text>
          </View>
          <Text style={{styles.alertText}}>
            {{t("{condition}Screen.alertText")}}
          </Text>
        </View>

        <View style={{styles.bottomSpacing}} />
      </ScrollView>
    </View>
  );
}}'''
    
    def _generate_navigation_handlers(self, strategies: List[Dict], condition: str) -> str:
        if not strategies:
            return ""
        
        cases = []
        for strategy in strategies:
            key = strategy.get('key', '')
            screen = strategy.get('screen', f"{key.title()}Screen")
            
            # Add condition-specific data mapping
            if key == "commonSuggestions":
                cases.append(f'''      case "{key}":
        navigation.navigate("{screen}", {{
          condition: "{condition}",
          strategyType: "{key}",
          data: getConditionSpecificData("{condition}", "{key}")
        }});
        break;''')
            else:
                cases.append(f'''      case "{key}":
        navigation.navigate("{screen}", {{
          condition: "{condition}",
          strategyType: "{key}",
          data: getConditionSpecificData("{condition}", "{key}")
        }});
        break;''')
        
        cases_str = '\n'.join(cases)
        
        # Add helper function for data mapping
        data_mapping_function = self._generate_data_mapping_function()
        
        return f'''{data_mapping_function}

  const handleViewStrategy = (strategyKey: string) => {{
    console.log(`${{strategyKey}} strategy pressed for condition: {condition}`);
    switch (strategyKey) {{
{cases_str}
      default:
        console.log(`Unknown strategy: ${{strategyKey}}`);
    }}
  }};'''
    
    def _generate_data_mapping_function(self) -> str:
        """Generate the data mapping function based on loaded JSON data"""
        return '''  const getConditionSpecificData = (condition: string, strategyType: string) => {
    // This would typically load from your JSON data file
    const conditionData = {
      "adhd": {
        "commonSuggestions": {
          "suggestions": [
            "Break tasks into smaller, manageable steps",
            "Use timers and alarms for reminders", 
            "Create structured daily routines",
            "Minimize distractions in work/study spaces",
            "Use visual organizers and planners",
            "Take regular breaks during focused work",
            "Practice mindfulness and meditation",
            "Engage in regular physical exercise",
            "Maintain consistent sleep schedule",
            "Consider medication consultation with healthcare provider"
          ],
          "tips": [
            "Start with 2-3 strategies that feel most manageable",
            "Track your progress to see what works best",
            "Be patient with yourself during the adjustment period"
          ]
        },
        "yoga": {
          "poses": ["Mountain Pose", "Child's Pose", "Warrior III", "Tree Pose"],
          "benefits": ["Improves focus", "Reduces hyperactivity", "Enhances body awareness"]
        },
        "relaxation": {
          "techniques": ["Deep breathing", "Progressive muscle relaxation", "Guided imagery"],
          "duration": "10-20 minutes daily"
        }
      },
      "anxiety": {
        "commonSuggestions": {
          "suggestions": [
            "Practice deep breathing exercises daily",
            "Challenge negative thought patterns",
            "Gradually face feared situations (exposure therapy)",
            "Maintain regular exercise routine",
            "Limit caffeine and alcohol intake",
            "Establish consistent sleep schedule",
            "Use grounding techniques during panic",
            "Practice mindfulness meditation",
            "Build strong support network",
            "Consider professional counseling"
          ],
          "tips": [
            "Start with breathing exercises - they're immediately helpful",
            "Keep a worry journal to track patterns",
            "Remember: anxiety is temporary and manageable"
          ]
        },
        "breathing": {
          "techniques": ["4-7-8 breathing", "Box breathing", "Belly breathing"],
          "benefits": ["Reduces anxiety", "Calms nervous system", "Improves focus"]
        },
        "mindfulness": {
          "exercises": ["Body scan", "Mindful walking", "Breathing meditation"],
          "duration": "5-15 minutes daily"
        }
      },
      "depression": {
        "commonSuggestions": {
          "suggestions": [
            "Maintain consistent daily routine",
            "Engage in regular physical activity",
            "Connect with supportive friends and family",
            "Practice gratitude journaling",
            "Engage in meaningful activities and hobbies",
            "Ensure adequate sleep (7-9 hours)",
            "Eat nutritious, balanced meals",
            "Limit alcohol and avoid drugs",
            "Practice self-compassion and patience",
            "Seek professional help when needed"
          ],
          "tips": [
            "Small steps count - even 5 minutes of activity helps",
            "Focus on one suggestion at a time",
            "Celebrate small victories and progress"
          ]
        },
        "behavioralActivation": {
          "activities": ["Pleasant activity scheduling", "Goal setting", "Activity monitoring"],
          "benefits": ["Increases motivation", "Improves mood", "Builds routine"]
        },
        "socialSupport": {
          "strategies": ["Reach out to friends", "Join support groups", "Family involvement"],
          "benefits": ["Reduces isolation", "Provides perspective", "Emotional support"]
        }
      }
    };

    return conditionData[condition]?.[strategyType] || {};
  };'''
    
    def _generate_symptoms_jsx(self, symptoms: List[str], condition: str) -> str:
        if not symptoms:
            return ""
        
        symptom_items = []
        for symptom in symptoms:
            symptom_items.append(f'''          <View style={{styles.symptomItem}}>
            <View style={{styles.symptomDot}} />
            <Text style={{styles.symptomText}}>
              {{t("{condition}Screen.symptoms.{symptom}")}}
            </Text>
          </View>''')
        
        return '\n\n'.join(symptom_items)
    
    def _generate_strategies_jsx(self, strategies: List[Dict], condition: str) -> str:
        if not strategies:
            return ""
        
        strategy_cards = []
        for strategy in strategies:
            key = strategy.get('key', '')
            strategy_cards.append(f'''          <View style={{styles.strategyCard}}>
            <Text style={{styles.strategyTitle}}>
              {{t("{condition}Screen.strategies.{key}.title")}}
            </Text>
            <Text style={{styles.strategyDescription}}>
              {{t("{condition}Screen.strategies.{key}.description")}}
            </Text>
            <Pressable
              style={{styles.viewStrategyButton}}
              onPress={{() => handleViewStrategy("{key}")}}
            >
              <Text style={{styles.viewStrategyButtonText}}>
                {{t("{condition}Screen.viewStrategyButton")}}
              </Text>
            </Pressable>
          </View>''')
        
        return '\n\n'.join(strategy_cards)
    
    def _generate_styles(self) -> str:
        return '''const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  illustrationBox: {
    width: 160,
    height: 120,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#bfdbfe",
    width: 120,
    height: 80,
    gap: 8,
  },
  imageLabel: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6b7280",
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  symptomItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  symptomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3b82f6",
    marginRight: 16,
    marginTop: 6,
  },
  symptomText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
    lineHeight: 22,
  },
  strategyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  strategyDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  viewStrategyButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  viewStrategyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  alertBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  alertIconContainer: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
  },
  alertText: {
    fontSize: 14,
    color: "#7f1d1d",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});'''

def create_condition_data_json():
    """Create a sample JSON file with condition-specific data"""
    condition_data = {
        "adhd": {
            "commonSuggestions": {
                "title": "10 Common Suggestions for ADHD",
                "suggestions": [
                    {
                        "id": 1,
                        "title": "Break Tasks Into Steps",
                        "description": "Divide large tasks into smaller, manageable steps to avoid overwhelm.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 2,
                        "title": "Use Timers and Alarms",
                        "description": "Set reminders for important tasks and appointments.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 3,
                        "title": "Create Daily Routines",
                        "description": "Establish consistent daily structure to improve focus.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 4,
                        "title": "Minimize Distractions",
                        "description": "Create a clutter-free workspace for better concentration.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 5,
                        "title": "Use Visual Organizers",
                        "description": "Employ planners, calendars, and visual aids for organization.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 6,
                        "title": "Take Regular Breaks",
                        "description": "Use the Pomodoro technique or similar break schedules.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 7,
                        "title": "Practice Mindfulness",
                        "description": "Regular meditation can improve attention and reduce impulsivity.",
                        "difficulty": "hard"
                    },
                    {
                        "id": 8,
                        "title": "Regular Exercise",
                        "description": "Physical activity helps improve focus and reduce hyperactivity.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 9,
                        "title": "Consistent Sleep Schedule",
                        "description": "Maintain regular sleep patterns for better cognitive function.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 10,
                        "title": "Professional Support",
                        "description": "Consider medication consultation with healthcare provider.",
                        "difficulty": "varies"
                    }
                ],
                "quickTips": [
                    "Start with 2-3 strategies that feel most manageable",
                    "Track your progress to see what works best",
                    "Be patient with yourself during the adjustment period"
                ]
            },
            "yoga": {
                "title": "Yoga for ADHD",
                "poses": [
                    {"name": "Mountain Pose", "duration": "30 seconds", "benefit": "Improves focus"},
                    {"name": "Child's Pose", "duration": "1 minute", "benefit": "Calms mind"},
                    {"name": "Tree Pose", "duration": "30 seconds each side", "benefit": "Enhances balance"}
                ]
            }
        },
        "anxiety": {
            "commonSuggestions": {
                "title": "10 Common Suggestions for Anxiety",
                "suggestions": [
                    {
                        "id": 1,
                        "title": "Deep Breathing Exercises",
                        "description": "Practice 4-7-8 breathing or box breathing daily.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 2,
                        "title": "Challenge Negative Thoughts",
                        "description": "Question and reframe anxious thoughts with evidence.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 3,
                        "title": "Gradual Exposure",
                        "description": "Slowly face feared situations in manageable steps.",
                        "difficulty": "hard"
                    },
                    {
                        "id": 4,
                        "title": "Regular Exercise",
                        "description": "Physical activity reduces anxiety and improves mood.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 5,
                        "title": "Limit Caffeine",
                        "description": "Reduce caffeine intake as it can worsen anxiety symptoms.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 6,
                        "title": "Consistent Sleep",
                        "description": "Maintain regular sleep schedule for emotional regulation.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 7,
                        "title": "Grounding Techniques",
                        "description": "Use 5-4-3-2-1 technique during panic or high anxiety.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 8,
                        "title": "Mindfulness Practice",
                        "description": "Regular meditation reduces overall anxiety levels.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 9,
                        "title": "Build Support Network",
                        "description": "Connect with understanding friends, family, or groups.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 10,
                        "title": "Professional Help",
                        "description": "Consider therapy or counseling for persistent anxiety.",
                        "difficulty": "varies"
                    }
                ],
                "quickTips": [
                    "Start with breathing exercises - they provide immediate relief",
                    "Keep a worry journal to identify patterns",
                    "Remember: anxiety is temporary and manageable"
                ]
            }
        },
        "depression": {
            "commonSuggestions": {
                "title": "10 Common Suggestions for Depression",
                "suggestions": [
                    {
                        "id": 1,
                        "title": "Daily Routine",
                        "description": "Create and maintain a consistent daily structure.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 2,
                        "title": "Physical Activity",
                        "description": "Even 10-15 minutes of movement can improve mood.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 3,
                        "title": "Social Connection",
                        "description": "Reach out to supportive friends and family regularly.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 4,
                        "title": "Gratitude Practice",
                        "description": "Write down 3 things you're grateful for each day.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 5,
                        "title": "Meaningful Activities",
                        "description": "Engage in hobbies and activities that bring purpose.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 6,
                        "title": "Adequate Sleep",
                        "description": "Maintain 7-9 hours of quality sleep nightly.",
                        "difficulty": "medium"
                    },
                    {
                        "id": 7,
                        "title": "Nutritious Eating",
                        "description": "Focus on balanced, regular meals for stable mood.",
                        "difficulty": "easy"
                    },
                    {
                        "id": 8,
                        "title": "Limit Substances",
                        "description": "Avoid alcohol and drugs that worsen depression.",
                        "difficulty": "varies"
                    },
                    {
                        "id": 9,
                        "title": "Self-Compassion",
                        "description": "Practice kindness and patience with yourself.",
                        "difficulty": "hard"
                    },
                    {
                        "id": 10,
                        "title": "Professional Support",
                        "description": "Seek therapy or medical help for persistent symptoms.",
                        "difficulty": "varies"
                    }
                ],
                "quickTips": [
                    "Small steps count - even 5 minutes of activity helps",
                    "Focus on one suggestion at a time",
                    "Celebrate small victories and progress"
                ]
            }
        }
    }
    
    return condition_data

def create_sample_configs():
    """Create sample configuration files for different conditions"""
    
    configs = {
        "adhd": {
            "screenName": "ADHDScreen",
            "condition": "adhd",
            "iconName": "flash",
            "iconColor": "#3b82f6",
            "symptoms": [
                "inattention",
                "hyperactivity", 
                "impulsivity",
                "disorganization",
                "timeManagement"
            ],
            "strategies": [
                {
                    "key": "commonSuggestions",
                    "screen": "CommonSuggestionsScreen"
                },
                {
                    "key": "yoga",
                    "screen": "YogaScreen"
                },
                {
                    "key": "relaxation",
                    "screen": "RelaxationScreen"
                },
                {
                    "key": "cbt",
                    "screen": "CBTScreen"
                },
                {
                    "key": "rebt",
                    "screen": "REBTScreen"
                }
            ]
        },
        
        "anxiety": {
            "screenName": "AnxietyScreen",
            "condition": "anxiety",
            "iconName": "heart-outline",
            "iconColor": "#10b981",
            "symptoms": [
                "excessiveWorry",
                "restlessness", 
                "fatigue",
                "concentration",
                "irritability",
                "sleepDisturbances"
            ],
            "strategies": [
                {
                    "key": "commonSuggestions",
                    "screen": "CommonSuggestionsScreen"
                },
                {
                    "key": "breathing",
                    "screen": "BreathingScreen"
                },
                {
                    "key": "mindfulness",
                    "screen": "MindfulnessScreen"
                },
                {
                    "key": "cbt",
                    "screen": "CBTScreen"
                }
            ]
        },
        
        "depression": {
            "screenName": "DepressionScreen", 
            "condition": "depression",
            "iconName": "sunny-outline",
            "iconColor": "#f59e0b",
            "symptoms": [
                "persistentSadness",
                "lossOfInterest",
                "fatigueWeakness", 
                "sleepChanges",
                "appetiteChanges",
                "concentrationDifficulty"
            ],
            "strategies": [
                {
                    "key": "commonSuggestions",
                    "screen": "CommonSuggestionsScreen"
                },
                {
                    "key": "behavioralActivation", 
                    "screen": "BehavioralActivationScreen"
                },
                {
                    "key": "socialSupport",
                    "screen": "SocialSupportScreen"
                },
                {
                    "key": "cbt",
                    "screen": "CBTScreen"
                }
            ]
        }
    }
    
    return configs

def main():
    """Main function to demonstrate usage with condition mapping"""
    print("React Native Screen Generator with Condition Mapping")
    print("=" * 55)
    
    # Create condition data JSON file
    condition_data = create_condition_data_json()
    data_file = "condition_data.json"
    
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(condition_data, f, indent=2)
    print(f"✓ Created condition data file: {data_file}")
    
    # Initialize generator with data file
    generator = ReactNativeScreenGenerator(data_file)
    
    # Create output directory
    output_dir = "generated_screens"
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate sample configurations
    configs = create_sample_configs()
    
    print(f"Generating {len(configs)} screens with condition mapping...\n")
    
    # Generate screens
    for condition_name, config in configs.items():
        print(f"Generating {condition_name} screen...")
        
        # Generate the screen code
        screen_code = generator.generate_screen(config)
        
        # Write to file
        filename = f"{config['screenName']}.tsx"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(screen_code)
        
        print(f"✓ Generated: {filepath}")
    
    # Also save the configurations as JSON for reference
    config_file = os.path.join(output_dir, "screen_configs.json")
    with open(config_file, 'w', encoding='utf-8') as f:
        json.dump(configs, f, indent=2)
    
    print(f"✓ Configuration saved: {config_file}")
    print(f"\n✅ Successfully generated {len(configs)} screens with condition mapping")
    
    print("\n" + "="*60)
    print("HOW CONDITION MAPPING WORKS:")
    print("="*60)
    print("""
When you click "View Strategy" -> "10 Common Suggestions":

1. Navigation passes condition-specific data:
   navigation.navigate("CommonSuggestionsScreen", {
     condition: "adhd",           // or "anxiety", "depression"
     strategyType: "commonSuggestions",
     data: getConditionSpecificData("adhd", "commonSuggestions")
   });

2. The data parameter contains:
   - ADHD: Break tasks, use timers, create routines...
   - Anxiety: Deep breathing, challenge thoughts, gradual exposure...
   - Depression: Daily routine, physical activity, social connection...

3. CommonSuggestionsScreen receives this data and displays appropriate content
    """)

if __name__ == "__main__":
    main()
    
    print("\n" + "="*60)
    print("SAMPLE CONDITION DATA STRUCTURE:")
    print("="*60)
    sample_data = create_condition_data_json()
    print(json.dumps(sample_data["adhd"]["commonSuggestions"], indent=2))
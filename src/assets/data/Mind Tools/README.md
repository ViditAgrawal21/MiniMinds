# Mind Tools Data Structure

This directory contains organized mental health intervention data for the thought-healer application.

## Structure

```
Mind Tools/
└── data/
    ├── addictions/
    │   ├── 10-common-suggestions.json
    │   ├── yoga.json
    │   ├── relaxation.json
    │   ├── cbt.json
    │   └── rebt.json
    ├── anger-management/
    │   └── [intervention files...]
    └── [15 more condition folders...]
```

## Conditions Included

1. **addictions** - Substance and behavioral addiction interventions
2. **anger-management** - Anger control and management strategies  
3. **common-psychological-issues** - General mental health concerns
4. **environment-issues** - Environmental factors affecting wellbeing
5. **family-relationship** - Family and relationship interventions
6. **financial-mental-health** - Financial stress and money-related issues
7. **general-physical-fitness** - Physical health and fitness strategies
8. **internet-dependence** - Internet and technology addiction
9. **internet-social-media** - Social media related concerns
10. **professional-mental-health** - Work and career related stress
11. **sex-life** - Sexual health and relationship interventions
12. **sleep** - Sleep hygiene and insomnia interventions
13. **social-mental-health** - Social anxiety and interaction issues
14. **stress** - General stress management techniques
15. **youngster-issues** - Youth and adolescent specific concerns
16. **suicidal-behavior** - Crisis intervention and prevention

## Intervention Types

Each condition folder may contain up to 5 types of intervention files:

- **10-common-suggestions.json** - General practical suggestions
- **yoga.json** - Yoga and meditation techniques
- **relaxation.json** - Relaxation and mindfulness exercises
- **cbt.json** - Cognitive Behavioral Therapy interventions
- **rebt.json** - Rational Emotive Behavior Therapy interventions

## File Format

Each JSON file contains:
```json
{
  "condition": "Condition Name",
  "intervention_type": "Intervention Type",
  "interventions": [
    {
      "Title": "Intervention Title",
      "Description": "Detailed description...",
      "XP": 5,
      "Journal Template": "Template content...",
      ...
    }
  ],
  "count": 20,
  "metadata": {
    "created_from": "source files",
    "total_interventions": 20
  }
}
```

## Usage

These files are designed to be imported into the thought-healer React Native application for providing users with structured mental health interventions based on their specific needs.

---
*Generated from thought_pro_filtered.json and thought_pro_with_extracted_final.json*

import InterventionsSheet from "@/components/common/InterventionsSheet";
import InterventionDetailModal from "@/components/common/InterventionDetailModal";
import { interventionsData } from "@/components/interventionScanDBCall";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal,
} from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";

type HomeTabNavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "src/context/LanguageContext";
import RecommendedInterventionsList, {
  ScanItem,
} from "@/components/common/RecommendedInterventionsList";
import interventionObject from "@/components/interventionScanDBCall";
import { t } from "@/i18n/locales";
// ---------------------------------------------------------------------------
// Daily Mind‑Tools and EQ decks (round‑robin rotation)
// ---------------------------------------------------------------------------
const ANCHOR_DATE = new Date("2025-01-01");

type SimpleTip = {
  title: string;
  description: string;
  example: string;
  task: string;
};
type EqTip = { title: string; description: string[] };

const mindToolsTips: SimpleTip[] = [
  {
    title: "Emotional Auditing",
    description:
      "Emotional auditing is a systematic approach to understanding your emotional landscape by maintaining detailed logs of your feelings, triggers, and responses. This practice involves tracking not just what you feel, but when you feel it, what caused it, and how your body responds. Research shows that people who regularly audit their emotions develop greater emotional intelligence, improved stress management, and stronger relationships. The process helps identify patterns in your emotional responses, recognize early warning signs of stress or overwhelm, and create targeted strategies for emotional regulation. By documenting your emotional journey, you create a personal database of insights that can guide future decisions and help you understand your authentic needs and boundaries. This technique is particularly powerful for those who struggle with emotional overwhelm, unclear boundaries, or difficulty expressing their needs to others.",
    example:
      "Monday 3 PM: Felt intense frustration and tightness in chest during team meeting. Trigger: My project proposal was interrupted three times by colleagues who didn't let me finish explaining. Pattern noticed: I often feel unheard in group settings when multiple people speak over me. Physical response: Jaw clenched, hands gripped pen tightly. Need identified: To feel respected and heard when presenting ideas. Action taken: Scheduled one-on-one with manager to discuss meeting dynamics and communication preferences. Tuesday 7 AM: Experienced surge of anxiety while checking emails. Trigger: Saw urgent email from client that seemed negative in tone. Pattern: I catastrophize before reading full context. Reality check: Email was actually positive feedback with urgent questions. Learning: Practice reading full context before emotional reaction.",
    task: "Create a comprehensive 'Emotion Tracker' journal using a notebook or digital app. For the next 7 days, log at least 3 emotional moments daily. For each entry, include: (1) Time and situation, (2) Specific emotion and intensity (1-10 scale), (3) Physical sensations you noticed, (4) What triggered this emotion, (5) How you responded or what you did, (6) What you needed in that moment, (7) Any patterns you're starting to notice. At the end of the week, review your entries and identify your top 3 emotional triggers and your most effective coping strategies.",
  },
  {
    title: "Reverse Gratitude",
    description:
      "Reverse gratitude shifts the traditional gratitude practice by focusing on the positive impact you have on others rather than what you receive. This powerful technique combats feelings of worthlessness, imposter syndrome, and social isolation by helping you recognize your inherent value and contribution to the world. Unlike standard gratitude practices that can sometimes feel forced or superficial, reverse gratitude taps into your natural human need to feel useful and connected. Scientific studies indicate that people who regularly practice reverse gratitude experience increased self-esteem, stronger social connections, and reduced symptoms of depression. The practice works by activating the same neural pathways associated with purpose and meaning, while simultaneously building empathy and social awareness. It's particularly effective for caregivers, people in helping professions, parents, and anyone who tends to undervalue their contributions or struggles with feelings of inadequacy.",
    example:
      "Today I spent 20 minutes listening to my neighbor talk about her job stress. She seemed lighter afterward and thanked me for being such a good listener. My teenager might be grateful that I didn't lecture him about his messy room and instead just asked how his day was - he actually opened up about friendship drama at school. The barista at my coffee shop smiled when I remembered her name and asked about her college classes. My colleague might appreciate that I always respond to her questions promptly and never make her feel dumb for asking. My elderly mother is probably grateful that I call every Sunday, even when I'm busy, because I know it makes her feel less lonely. Even my dog is grateful for the daily walks I provide, the consistent feeding schedule, and the way I talk to him like he understands everything.",
    task: "For the next 14 days, write down 5 people who might be grateful for something you did, said, or provided that day. Include family members, friends, colleagues, strangers, and even pets. Be specific about what you did and why it might have mattered to them. Don't limit yourself to big gestures - include small acts like smiling at someone, holding a door, answering a question, or simply being present. Each week, choose one person from your list and tell them specifically how you think they might have been impacted by your actions. Notice how this makes you feel about your own worth and contribution to the world.",
  },
  {
    title: "The 5‑5‑5 Rule",
    description:
      "The 5‑5‑5 Rule is a powerful cognitive reframing technique that helps put current stressors and problems into proper perspective by examining their long-term significance. This mental tool works by interrupting the brain's tendency to catastrophize or over-focus on immediate concerns, helping you distinguish between genuine crises and temporary inconveniences. The technique is rooted in cognitive behavioral therapy principles and helps activate your prefrontal cortex - the brain region responsible for logical thinking and perspective-taking. Research shows that people who regularly practice perspective-taking techniques like the 5‑5‑5 Rule experience reduced anxiety, better decision-making under stress, and improved emotional regulation. The rule is particularly effective for perfectionists, overthinkers, and people prone to anxiety disorders. It works because it forces your brain to zoom out from the immediate emotional intensity and consider the broader context of your life, helping you allocate your mental energy more wisely.",
    example:
      "Situation: I sent an email to my boss with a typo in the subject line and I'm mortified. 5 days: My boss probably won't even remember this small mistake by next week, and it definitely won't affect my performance review. 5 months: This will be completely forgotten and will have zero impact on my career trajectory. 5 years: This won't even be a memory - I'll probably have had hundreds of interactions with my boss since then. Conclusion: I can let this go and focus my energy on the presentation I'm giving tomorrow. Another example: I had an awkward conversation with my neighbor and now I'm avoiding them. 5 days: The awkwardness will naturally fade as we both move on with our lives. 5 months: We'll have had many normal interactions since then. 5 years: This moment won't define our relationship at all. Conclusion: I can wave hello tomorrow and not let this affect my peace of mind.",
    task: "Identify your top 3 current stressors or worries that are consuming mental energy. Write each one at the top of a separate page. For each stressor, honestly answer: 'Will this matter in 5 days? How will I feel about this in 5 months? Will I even remember this in 5 years?' Write detailed responses explaining why or why not. Based on your answers, categorize each stressor as: (A) Deserves immediate attention and action, (B) Worth monitoring but not obsessing over, or (C) Not worth your mental energy. Create an action plan for Category A items, set a check-in date for Category B items, and practice letting go of Category C items. Use this rule daily for the next month whenever you notice yourself spiraling about something.",
  },
  {
    title: "Micro‑Meditation Bursts",
    description:
      "Micro-meditation bursts are brief, focused periods of mindfulness practice that can be seamlessly integrated into your daily routine. These mini-meditations are designed to help you quickly center yourself, reduce stress, and regain focus, no matter where you are or what you're doing. The beauty of micro-meditations lies in their accessibility and adaptability; they can be as short as 30 seconds or extend up to 5 minutes, making them perfect for busy schedules. Research indicates that even short bouts of mindfulness practice can significantly decrease stress levels, enhance emotional regulation, and improve overall well-being. Micro-meditations are particularly useful for individuals who find traditional meditation practices challenging due to time constraints or a busy mind. They serve as a mental reset button, allowing you to approach your tasks and interactions with renewed clarity and calm.",
    example:
      "Stuck in traffic? Instead of succumbing to road rage or stress, take a micro-meditation break. Close your eyes, take a deep breath, and focus on the sensation of your breath entering and leaving your body. Notice the sounds around you - the hum of the engine, the rustle of leaves, distant conversations. Allow yourself to be fully present in this moment. Another example: Before a big meeting, instead of rehearsing your presentation in your head and increasing your anxiety, take 2 minutes to sit quietly. Focus on your breath, inhale deeply through your nose, hold for a moment, and exhale slowly through your mouth. Visualize yourself entering the meeting room with confidence and clarity.",
    task: "For the next week, integrate micro-meditation bursts into your daily routine. Start with just one micro-meditation session each day, ideally at a time when you typically feel stressed or unfocused. Gradually increase to two or three sessions per day as you become more comfortable with the practice. Use a meditation app or timer to keep track of your sessions. After each micro-meditation, take a moment to notice any changes in your mood, stress levels, and ability to focus. At the end of the week, reflect on the overall impact of these micro-meditations on your daily life and consider making them a permanent part of your routine.",
  },
  {
    title: "JOMO (Joy of Missing Out)",
    description:
      "JOMO, or the Joy of Missing Out, is a mindful approach to social participation that emphasizes quality over quantity. It encourages individuals to engage deeply in the moments and activities that truly matter to them, rather than feeling pressured to be constantly available or involved in every social event. JOMO is about finding contentment and joy in your own company or in the company of a few close friends, without the distractions and noise of larger social gatherings. This concept is particularly relevant in today's hyper-connected world, where the fear of missing out (FOMO) can lead to anxiety, stress, and a diluted sense of self. By embracing JOMO, you can enhance your focus, deepen your relationships, and improve your overall well-being. It allows for a more intentional and meaningful engagement with the world around you.",
    example:
      "Instead of feeling anxious about missing a party that all your friends are attending, you choose to stay home and read that book you've been meaning to get to. You enjoy the story at your own pace, and find joy in the quiet and solitude. Another example: You decide not to check social media for a week. Initially, you might feel anxious or disconnected, but soon you start to enjoy the freedom from constant notifications and the pressure to respond immediately. You use this time to engage in activities that truly interest you, like painting, hiking, or learning a musical instrument.",
    task: "For the next 7 days, practice JOMO by consciously choosing to opt-out of at least one social obligation or digital distraction each day. Replace that time with an activity that brings you genuine joy or relaxation, whether it's a hobby, spending time in nature, or simply enjoying a quiet moment with a cup of tea. Notice how this impacts your mood, stress levels, and overall sense of well-being. At the end of the week, reflect on the experience and consider making JOMO a regular part of your life.",
  },
  {
    title: "Brain Dump Journaling",
    description:
      "Brain dump journaling is a free-writing technique that involves writing down all the thoughts, ideas, worries, and to-dos that are cluttering your mind. The goal is to transfer everything from your mind onto the paper (or screen), allowing you to declutter your brain and gain mental clarity. This technique is based on the principles of cognitive behavioral therapy and mindfulness, and it has been shown to reduce anxiety, improve focus, and enhance problem-solving abilities. Brain dump journaling is particularly useful for individuals who experience racing thoughts, have difficulty sleeping due to a busy mind, or feel overwhelmed by the demands of daily life. By regularly practicing brain dump journaling, you can train your mind to focus better, reduce stress, and approach challenges with a clearer, more organized mindset.",
    example:
      "Before starting your workday, you take 10 minutes to do a brain dump. You write down every task, idea, and worry that comes to mind, without filtering or organizing. This helps you clear your mind and prioritize your tasks for the day. Another example: You're feeling anxious and overwhelmed in the middle of the day. Instead of succumbing to stress, you take a break and do a brain dump. You write down everything that's bothering you, no matter how big or small. This act of externalizing your thoughts helps you see things more clearly and reduces your anxiety.",
    task: "Set aside 10-15 minutes at the beginning or end of each day for brain dump journaling. Find a quiet space where you can write without distractions. Use a notebook or digital app - whatever you prefer. The key is to write continuously without worrying about grammar, spelling, or structure. If you're stuck, try starting with 'I'm worried about...', 'I need to remember...', or 'I'm thinking about...'. Let your thoughts flow freely. After your brain dump, take a few minutes to review what you've written. Highlight or circle any action items or important thoughts. This will help you prioritize and organize your tasks and reduce the mental clutter.",
  },
  {
    title: "The Third Story Technique",
    description:
      "The Third Story Technique is a conflict resolution and communication strategy that involves reframing a situation or disagreement by imagining how a neutral third party would perceive and describe it. This technique helps to reduce defensiveness, increase empathy, and facilitate more constructive conversations. It's based on the principles of narrative therapy and cognitive behavioral therapy, and it has been shown to be effective in improving communication skills, enhancing emotional intelligence, and resolving interpersonal conflicts. The Third Story Technique is particularly useful in personal and professional relationships where misunderstandings, miscommunications, or conflicts are common. By adopting the perspective of a neutral observer, you can gain valuable insights into the dynamics of the situation, identify unhelpful patterns, and discover new ways to respond more effectively.",
    example:
      "You're in a heated argument with a colleague about the direction of a project. Instead of focusing on winning the argument or proving your point, you take a step back and ask yourself: 'If someone else were observing this conversation, what would they see? How would they describe each of us? What might be some common ground or misunderstandings?' This helps you see the situation more objectively and reduces the emotional intensity of the conflict. Another example: You're feeling frustrated with a family member who doesn't seem to understand your perspective. You imagine that a neutral friend is watching the two of you interact. What would they notice? How would they describe your body language, tone of voice, and choice of words? This exercise helps you identify any unhelpful patterns in your communication and consider how you might express yourself more clearly and calmly.",
    task: "The next time you find yourself in a conflict or heated discussion, consciously apply the Third Story Technique. Before responding or reacting, take a deep breath and ask yourself the following questions: (1) What is my desired outcome in this situation? (2) How might the other person be feeling right now? (3) If I were to describe this situation to a neutral third party, what would I say? (4) What common goals or values do we share that could help resolve this conflict? (5) What is one small step I can take to move towards a resolution? Write down your answers and use them to guide your response. Practice this technique regularly to improve your conflict resolution skills and enhance your emotional intelligence.",
  },
  {
    title: "Deliberate Daydreaming",
    description:
      "Deliberate daydreaming is a creative visualization technique that involves intentionally allowing your mind to wander and explore imaginative scenarios, ideas, and possibilities. Unlike regular daydreaming, which can be random and unstructured, deliberate daydreaming is a focused and purposeful practice that can enhance creativity, problem-solving, and emotional well-being. This technique is based on the principles of mindfulness, cognitive behavioral therapy, and creative visualization. Research shows that deliberate daydreaming can increase activity in the brain's default mode network, which is associated with creativity, imagination, and self-referential thought. By regularly engaging in deliberate daydreaming, you can improve your ability to generate new ideas, see connections between seemingly unrelated concepts, and approach challenges with a fresh perspective.",
    example:
      "You're working on a challenging problem and feeling stuck. Instead of forcing a solution, you take a break and allow yourself to daydream. You imagine different scenarios, possibilities, and solutions, no matter how outlandish they may seem. This helps you break free from conventional thinking and discover new approaches to the problem. Another example: You're feeling bored and uninspired. Instead of scrolling through social media or watching TV, you close your eyes and daydream about your ideal life, your dream job, or an exciting adventure. This boosts your mood, increases your motivation, and helps you reconnect with your passions and aspirations.",
    task: "Schedule 5-10 minutes of deliberate daydreaming time into your daily routine. Find a quiet, comfortable space where you can relax and let your mind wander. You can use guided visualization recordings, music, or simply your own imagination. The key is to allow your mind to explore freely without judgment or criticism. If you find it difficult to start, try focusing on a specific question or challenge you're facing, and ask your subconscious mind for creative solutions or insights. After each daydreaming session, take a few minutes to jot down any new ideas, insights, or solutions that emerged during the practice. Use these notes to inspire and guide your actions and decisions.",
  },
  {
    title: "Failure CV",
    description:
      "The Failure CV is a reflective exercise that involves creating a curriculum vitae (CV) or resume that highlights your failures, setbacks, and challenges instead of your achievements and successes. This unconventional approach helps to reframe your relationship with failure, reduce the fear of failure, and build resilience and perseverance. The Failure CV exercise is based on the principles of narrative therapy, cognitive behavioral therapy, and positive psychology. Research shows that individuals who can reframe their failures as opportunities for growth and learning are more likely to develop a resilient mindset, maintain motivation in the face of challenges, and achieve long-term success. The Failure CV is particularly useful for individuals who struggle with perfectionism, fear of failure, or negative self-talk. By acknowledging and embracing your failures as valuable learning experiences, you can cultivate a more balanced, realistic, and positive self-image.",
    example:
      "Instead of feeling ashamed of your failures, you create a Failure CV that includes: (1) Academic setbacks: Not getting into your desired college, failing a course, or receiving a low grade on an important assignment. (2) Career challenges: Being passed over for a promotion, receiving negative feedback from a manager, or struggling to meet a deadline. (3) Personal struggles: Going through a difficult breakup, facing health issues, or dealing with financial difficulties. (4) Social challenges: Feeling left out of social events, having conflicts with friends or family, or struggling to make new connections. (5) Internal challenges: Dealing with self-doubt, negative thinking, or a lack of motivation. For each item on your Failure CV, you also include: (a) What you learned from the experience, (b) How you grew or changed as a result, (c) What you would do differently next time, (d) How you can apply these lessons to future challenges.",
    task: "Create your own Failure CV using the following steps: (1) Reflect on your past failures, setbacks, and challenges in different areas of your life (academic, career, personal, social, and internal). (2) For each failure, write a brief description of what happened, how you felt, and what you learned. (3) Identify any patterns or themes in your failures (e.g., common triggers, recurring challenges, or similar emotional responses). (4) Reframe each failure as a valuable learning experience that contributed to your growth and development. (5) Use your Failure CV as a tool for self-reflection, self-compassion, and resilience building. Review and update your Failure CV regularly as you encounter new challenges and learn from your experiences.",
  },
  {
    title: "5‑Second Decision Rule",
    description:
      "The 5‑Second Decision Rule is a simple yet effective technique for overcoming procrastination, hesitation, and self-doubt when making decisions or taking action. This rule, popularized by Mel Robbins in her TEDx talk and book 'The 5 Second Rule', is based on the principle that you can change your life in just five seconds by taking immediate action toward your goals or desired outcomes. The 5‑Second Decision Rule works by interrupting the habit loop of overthinking, fear, and procrastination, and replacing it with a quick, decisive action. This technique is particularly useful for individuals who struggle with perfectionism, fear of failure, or anxiety. By consistently applying the 5‑Second Decision Rule, you can train your brain to become more comfortable with uncertainty, more resilient in the face of challenges, and more confident in your decision-making abilities.",
    example:
      "You're lying in bed, dreading the thought of getting up early to exercise. Instead of succumbing to the temptation to hit snooze and skip your workout, you count '5-4-3-2-1' and immediately get out of bed. This simple action interrupts your habitual pattern of procrastination and sets a positive tone for the rest of the day. Another example: You're about to make a difficult phone call that you've been avoiding. Instead of letting fear and self-doubt take over, you take a deep breath, count '5-4-3-2-1', and dial the number. By taking immediate action, you overcome your hesitation and increase your confidence.",
    task: "Identify one task or decision that you've been procrastinating or avoiding due to fear, self-doubt, or overthinking. It could be something related to your health, career, relationships, or personal development. Write down the specific thoughts, fears, or beliefs that are holding you back. Then, apply the 5‑Second Decision Rule by counting '5-4-3-2-1' and taking immediate action toward that task or decision. It could be as simple as making the phone call, sending the email, or starting the project. Notice how this impacts your mood, motivation, and sense of accomplishment. Repeat this process regularly to build your confidence and overcome procrastination.",
  },
  {
    title: "Mirror Questions",
    description:
      "Mirror questions are a powerful communication and self-reflection tool that involves asking yourself or others reflective questions that encourage deeper thinking, self-awareness, and empathy. These questions are designed to 'mirror' back the underlying emotions, needs, and values that may not be immediately apparent in a conversation or situation. Mirror questions are based on the principles of active listening, empathy, and cognitive behavioral therapy. Research shows that using mirror questions can improve communication skills, enhance emotional intelligence, and strengthen interpersonal relationships. Mirror questions are particularly useful in conflict resolution, negotiation, and coaching situations, where understanding underlying motivations and emotions is crucial. By regularly practicing mirror questioning, you can develop greater self-awareness, improve your relationships, and become a more effective communicator and problem-solver.",
    example:
      "In a conversation with a friend, instead of jumping to conclusions or offering solutions, you ask: 'It sounds like you're feeling really overwhelmed right now. Is that accurate?' This helps your friend reflect on their emotions and provides you with valuable information to respond empathetically. Another example: During a team meeting, instead of assuming you know what your colleague means, you ask: 'When you say that, it makes me wonder if you're feeling unsupported. Is that what you meant?' This encourages open communication and helps clarify any misunderstandings.",
    task: "Practice using mirror questions in your daily conversations and interactions. Start by identifying one or two key emotions or needs that are often present in your interactions (e.g., feeling heard, understood, respected, or valued). Then, listen carefully to the other person's words, tone, and body language, and ask mirror questions that reflect back what you observe. For example: 'It sounds like you really value honesty and directness, is that right?' or 'I hear you saying that you feel overwhelmed and need some support, is that correct?' Notice how this impacts the quality of your conversations, your relationships, and your own self-awareness.",
  },
  {
    title: "Random Acts of Kindness (Anonymous)",
    description:
      "Engaging in random acts of kindness, especially anonymous ones, is a powerful way to boost your mood, increase feelings of social connection, and make a positive impact on others' lives. This practice involves performing small, unexpected acts of kindness for others without revealing your identity. The concept is rooted in the principles of positive psychology, which emphasizes strengths, virtues, and factors that contribute to a fulfilling life. Research shows that performing acts of kindness can lead to increased feelings of happiness, satisfaction, and well-being. It also helps reduce stress, anxiety, and depression. Anonymous acts of kindness are particularly impactful because they foster a sense of connection and empathy without the expectation of recognition or reward. By regularly engaging in random acts of kindness, you can cultivate a more positive, compassionate, and connected mindset.",
    example:
      "Leaving a positive, anonymous note in a library book for the next reader to find. Donating to a charity or cause you care about without revealing your identity. Paying for the coffee or meal of the person behind you in line. Leaving extra change in a vending machine for someone else to find. Writing an anonymous letter of appreciation to a colleague or friend. Donating blood or plasma anonymously. Leaving a generous tip for a service worker without providing your name. Sending an anonymous e-card or letter to someone who could use a pick-me-up.",
    task: "For the next week, commit to performing at least one random act of kindness each day. It can be as simple as holding the door for someone, paying a compliment, or leaving a positive note for a stranger. The key is to do it anonymously, without expecting anything in return. Notice how this impacts your mood, your perception of others, and your overall sense of well-being. At the end of the week, reflect on the experience and consider making random acts of kindness a regular part of your life.",
  },
  {
    title: "No‑Complaint Conversations",
    description:
      "Committing to no-complaint conversations is a powerful way to shift your mindset, improve your mood, and enhance your relationships. This practice involves refraining from expressing complaints or negative remarks during conversations, and instead focusing on positive, constructive, and solution-oriented communication. The concept is rooted in the principles of positive psychology and cognitive behavioral therapy, which emphasize the impact of thoughts and language on emotions and behavior. Research shows that adopting a positive communication style can lead to improved relationships, increased feelings of happiness and satisfaction, and reduced symptoms of stress and anxiety. No-complaint conversations are particularly useful in personal and professional relationships where negativity, criticism, or blame can create conflict and dissatisfaction. By regularly practicing no-complaint conversations, you can cultivate a more positive, resilient, and solution-focused mindset.",
    example:
      "Instead of complaining about a difficult situation at work, you focus on discussing potential solutions and what you can learn from the experience. Rather than criticizing a friend for being late, you express understanding and suggest a positive activity to enjoy together. Instead of venting about a problem, you share it as a challenge you're working to overcome. Rather than discussing what's wrong, you focus on what you're grateful for and the positive aspects of your life.",
    task: "For the next 7 days, commit to having at least one no-complaint conversation each day. It can be with a friend, family member, colleague, or even yourself. The key is to focus on positive, constructive, and solution-oriented communication. If you catch yourself complaining or expressing negativity, pause and reframe your thoughts and words to align with a no-complaint approach. Notice how this impacts your mood, your relationships, and your overall sense of well-being. At the end of the week, reflect on the experience and consider making no-complaint conversations a regular part of your life.",
  },
  {
    title: "The Platinum Rule",
    description:
      "The Platinum Rule is a powerful interpersonal principle that involves treating others the way they want to be treated, rather than how you would like to be treated. This rule emphasizes empathy, understanding, and respect for individual differences in values, preferences, and needs. The Platinum Rule is based on the principles of emotional intelligence, social awareness, and effective communication. Research shows that individuals who practice the Platinum Rule experience improved relationships, increased trust and respect, and enhanced conflict resolution skills. This rule is particularly useful in diverse and multicultural settings, where understanding and respecting individual differences is crucial. By regularly applying the Platinum Rule, you can cultivate greater empathy, improve your interpersonal skills, and build stronger, more positive relationships.",
    example:
      "In a team meeting, instead of dominating the conversation with your ideas, you encourage others to share their perspectives and actively listen to their input. When giving feedback, you consider the other person's preferences and communication style, and tailor your feedback to be most helpful and respectful to them. Instead of assuming that everyone appreciates direct criticism, you offer constructive feedback in a way that aligns with the other person's values and preferences. When resolving a conflict, you seek to understand the other person's point of view and find a solution that respects both parties' needs and concerns.",
    task: "For the next week, practice the Platinum Rule in your daily interactions and conversations. Start by identifying one or two key preferences or values that are important to the people you interact with (e.g., respect, recognition, support, autonomy). Then, tailor your communication and actions to align with these preferences or values. For example, if someone values directness, be straightforward in your communication with them. If someone values recognition, make an effort to acknowledge their contributions and achievements. Notice how this impacts the quality of your relationships, your communication skills, and your overall sense of empathy and understanding.",
  },
  {
    title: "Neurosnacking",
    description:
      "Neurosnacking is a term that refers to the practice of using small, manageable 'snacks' of positive, engaging, and mentally stimulating content or activities to boost your mood, increase your energy, and enhance your cognitive performance. These neuro snacks can take many forms, including short videos, articles, podcasts, music, or even brief physical activities. The concept is rooted in the principles of positive psychology, which emphasizes the importance of positive emotions, engagement, and meaning in enhancing well-being and performance. Research shows that taking regular neuro snack breaks can improve focus, creativity, and problem-solving skills, while also reducing stress and mental fatigue. Neurosnacking is particularly useful in today's fast-paced, information-overloaded world, where it's essential to maintain mental agility, emotional balance, and a positive mindset.",
    example:
      "Feeling sluggish and unfocused in the afternoon? Instead of reaching for another cup of coffee, you take a 5-minute break to listen to an inspiring podcast episode, watch a funny video, or do a quick physical workout. This boosts your energy, lifts your mood, and sharpens your focus. Another example: You're working on a challenging problem and feeling stuck. Instead of forcing yourself to push through, you take a neuro snack break. You watch a short video that teaches you a new problem-solving technique, listen to music that inspires you, or do a quick meditation. This helps you relax, recharge, and return to the problem with a fresh perspective.",
    task: "For the next week, experiment with neurosnacking by incorporating short, positive, and engaging content or activities into your daily routine. Aim for at least three neuro snack breaks each day, especially during times when you typically feel low on energy or focus. Pay attention to how these neuro snacks impact your mood, energy levels, and cognitive performance. At the end of the week, reflect on the experience and consider making neurosnacking a regular part of your self-care and productivity routine.",
  },
  {
    title: "Cold Exposure (5‑30 s)",
    description:
      "Cold exposure, also known as cold thermogenesis, is a practice that involves exposing your body to cold temperatures for short periods to stimulate various physiological and psychological benefits. This technique has been used for centuries in various cultures for its health benefits. The practice is based on the principles of stress adaptation, which suggests that exposing your body to controlled stressors (like cold) can enhance your resilience, improve your mood, and boost your overall well-being. Research shows that cold exposure can increase the production of norepinephrine, a neurotransmitter that plays a role in mood regulation, attention, and response actions. It can also improve circulation, boost the immune system, and increase metabolic rate. Cold exposure is particularly popularized by practitioners like Wim Hof, who advocate for its physical and mental health benefits. However, it's essential to approach this practice with caution and gradually increase exposure time to avoid adverse effects.",
    example:
      "After a workout, instead of taking a hot shower, you finish with a cold shower for 30 seconds. This helps reduce muscle soreness, improves recovery, and boosts your mood. Another example: You're feeling mentally fatigued and unfocused. Instead of reaching for a snack or caffeine, you step outside for a quick 5-minute cold exposure. This could be a splash of cold water on your face, a cold shower, or even a brief walk in the cold air. This helps increase your alertness, improve your mood, and enhance your mental clarity.",
    task: "For the next week, experiment with cold exposure as a part of your daily routine. Start with just 5-10 seconds of cold exposure at the end of your shower, or splash your face with cold water. Gradually increase the duration and intensity as you become more comfortable with the practice. Pay attention to how this impacts your mood, energy levels, and overall sense of well-being. At the end of the week, reflect on the experience and consider making cold exposure a regular part of your self-care routine.",
  },
  {
    title: "Laughter Yoga",
    description:
      "Laughter yoga is a unique exercise routine that combines laughter exercises with yoga breathing techniques. This practice is based on the principle that voluntary laughter, when done in a group setting, can provide the same physiological and psychological benefits as spontaneous laughter. Laughter yoga is designed to promote physical, mental, and emotional well-being through the power of laughter. Research shows that laughter yoga can reduce stress, improve mood, boost immune function, and enhance overall well-being. It also helps increase pain tolerance, improve cardiovascular health, and promote relaxation. Laughter yoga is suitable for people of all ages and fitness levels, and it can be practiced in various settings, including community centers, workplaces, and online platforms. The practice typically involves a series of laughter exercises, breathing techniques, and playful activities, all done in a group setting to enhance the sense of connection and joy.",
    example:
      "Joining a laughter yoga class at your local community center. The class starts with simple laughter exercises, such as 'hee-hee, ha-ha, ho-ho,' combined with deep breathing. The instructor then leads the group in playful activities, like pretending to blow up a balloon while laughing. Everyone laughs together, creating a contagious and uplifting atmosphere. Another example: Practicing laughter yoga online with a virtual group. You follow along with a video or live session, doing laughter exercises and breathing techniques from the comfort of your home. You notice that even forced laughter starts to feel genuine and uplifting.",
    task: "For the next week, incorporate laughter yoga into your daily routine. Start with just 5 minutes of laughter exercises and deep breathing each day. You can do this alone or with others. The key is to engage in hearty, genuine laughter, not just polite or forced laughter. If you're doing this alone, you can use funny videos, jokes, or laughter yoga recordings to stimulate laughter. Notice how this impacts your mood, stress levels, and overall sense of well-being. At the end of the week, reflect on the experience and consider making laughter yoga a regular part of your self-care routine.",
  },
  {
    title: "Death Meditation",
    description:
      "Death meditation, also known as memento mori meditation, is a reflective practice that involves contemplating your own mortality and the impermanence of life. This meditation technique is rooted in various spiritual and philosophical traditions, including Stoicism, Buddhism, and Christian mysticism. The practice is based on the principle that by acknowledging and accepting the inevitability of death, you can cultivate a deeper appreciation for life, clarify your values and priorities, and reduce fear and anxiety. Research shows that death meditation can increase psychological resilience, improve emotional regulation, and enhance overall well-being. It also helps individuals develop a greater sense of purpose, meaning, and connection with others. Death meditation is typically practiced in a quiet, comfortable space, where you can relax and focus inward. The practice may involve guided visualizations, contemplative reading, and silent reflection.",
    example:
      "Taking a few minutes each day to reflect on the transient nature of life and the importance of living in alignment with your values and priorities. Considering what truly matters to you in life and what you would like to accomplish or experience before you die. Reflecting on the legacy you want to leave behind and how you can start creating it today. Contemplating the impermanence of all things, including your thoughts, emotions, and experiences, and how this awareness can enhance your appreciation for the present moment.",
    task: "For the next week, practice death meditation for 5-10 minutes each day. Find a quiet, comfortable space where you can relax and focus inward. You can use guided recordings, contemplative readings, or simply your own thoughts and reflections. The key is to approach this practice with an open mind and heart, and to allow yourself to fully experience any emotions or insights that arise. After each meditation, take a few minutes to journal about your experience, any insights or realizations, and how you can apply these to your daily life. Use this meditation to cultivate a deeper appreciation for life, clarify your values and priorities, and reduce fear and anxiety.",
  },
  {
    title: "Alter Ego Experiment",
    description:
      "The Alter Ego Experiment is a creative visualization and role-playing technique that involves creating and embodying an alternative persona or 'alter ego' that possesses the qualities, traits, and abilities you aspire to develop or enhance in yourself. This technique is based on the principles of cognitive behavioral therapy, performance psychology, and creative visualization. Research shows that using an alter ego can help individuals overcome self-doubt, increase confidence, and improve performance in various areas of life, including work, sports, and personal relationships. The Alter Ego Experiment is particularly useful for individuals who struggle with perfectionism, fear of failure, or negative self-talk. By regularly practicing the Alter Ego Experiment, you can train your brain to adopt a more positive, resilient, and confident mindset.",
    example:
      "Before a big presentation or performance, you take on the persona of your alter ego - a confident, charismatic, and skilled speaker. You visualize yourself entering the room with poise, delivering your message with clarity and impact, and receiving positive feedback from your audience. Another example: When facing a challenging situation or decision, you consult your alter ego - a wise, courageous, and resourceful mentor. You visualize this mentor guiding you, offering valuable insights and perspectives, and helping you navigate the situation with confidence and skill.",
    task: "Create your own alter ego using the following steps: (1) Reflect on the qualities, traits, and abilities that you admire and aspire to develop in yourself. (2) Create a detailed profile of your alter ego, including their name, age, appearance, personality traits, strengths, and skills. (3) Visualize yourself embodying this alter ego in various situations and challenges you face. (4) Practice using your alter ego as a source of guidance, support, and inspiration. (5) Regularly review and update your alter ego profile as you grow and develop. Use the Alter Ego Experiment to enhance your self-confidence, overcome self-doubt, and improve your performance in all areas of your life.",
  },
  {
    title: "Future Self Letters",
    description:
      "The Future Self Letters exercise is a powerful visualization and self-reflection technique that involves writing a letter from your future self to your present self. This letter typically includes reflections on your personal growth, achievements, lessons learned, and advice for overcoming current challenges or pursuing future goals. The exercise is based on the principles of narrative therapy, cognitive behavioral therapy, and positive psychology. Research shows that writing and reading future self letters can increase motivation, enhance goal clarity, and improve emotional regulation. This exercise is particularly useful for individuals who struggle with procrastination, lack of direction, or negative self-talk. By regularly practicing the Future Self Letters exercise, you can train your brain to adopt a more positive, resilient, and goal-oriented mindset.",
    example:
      "'Dear [Your Name], I'm writing to you from the future - a future where you've achieved all your goals and dreams. I want to remind you that every challenge you face now is an opportunity for growth and learning. Embrace them with courage and determination. Remember the importance of self-care, balance, and nurturing your passions. I'm proud of the person you are becoming, and I believe in your ability to create the life you desire. Keep pushing forward, stay positive, and never lose sight of your dreams. With love and encouragement, Your Future Self.'",
    task: "Write your own Future Self Letter using the following steps: (1) Find a quiet, comfortable space where you can relax and focus inward. (2) Close your eyes and take a few deep breaths to center yourself. (3) Visualize yourself 5, 10, or 20 years in the future - imagine the person you have become, the life you are living, and the goals you have achieved. (4) Open your eyes and write a letter from this future self to your present self. Include reflections on your personal growth, achievements, lessons learned, and advice for overcoming current challenges or pursuing future goals. (5) Read your Future Self Letter regularly to reinforce your motivation, goal clarity, and positive mindset. Consider writing new letters at regular intervals (e.g., annually) to update your future self vision and celebrate your progress.",
  },
];

const eqTips: EqTip[] = [
  {
    title: "EQ – Self‑Awareness",
    description: [
      "Keep a daily mood journal to identify emotional triggers and patterns.",
      "Practice mindfulness to observe your emotions without judgment.",
      'Ask yourself daily: "What emotion am I feeling right now? Why?"',
      "Request feedback from trusted friends about your emotional blind spots.",
      'Use "name it to tame it"—label emotions as they arise to reduce their intensity.',
    ],
  },
  {
    title: "EQ – Self‑Regulation",
    description: [
      "Pause before reacting—count to 5 or take a deep breath during emotional situations.",
      'Create a "calm‑down" plan: identify activities or places that help you reset.',
      "Reframe negative thoughts using cognitive techniques like the 5‑5‑5 Rule.",
      "Keep a list of grounding techniques (e.g., cold splash, sensory objects) for high‑stress moments.",
      "Review emotional reactions weekly: what worked, what didn't, and how you could respond better next time.",
    ],
  },
  {
    title: "EQ – Motivation",
    description: [
      "Set short‑term goals tied to a larger purpose to build intrinsic motivation.",
      "Write a letter from your future self to reinforce long‑term vision and effort.",
      "Track daily progress and celebrate small wins to stay motivated.",
      "Use affirmations and visualisation techniques to reinforce a growth mindset.",
      'Create a "Why I Started" board to remind yourself of your original passion and purpose.',
    ],
  },
  {
    title: "EQ – Empathy",
    description: [
      "Practice active listening—repeat back what someone said before responding.",
      'Ask mirror questions: "What are they really feeling or needing?"',
      "Read fiction or watch character‑driven films to practise emotional perspective‑taking.",
      'When in conflict, use the "Third Story" technique to understand both sides neutrally.',
      "Volunteer or spend time in diverse communities to increase exposure to others' lived experiences.",
    ],
  },
  {
    title: "EQ – Social Skills",
    description: [
      "Start conversations with curiosity—ask open‑ended questions.",
      "Practice giving genuine compliments or recognition without expectation.",
      "Engage in no‑complaint conversations to develop positive interaction habits.",
      'Use the "Platinum Rule" to adapt your communication style to others\' preferences.',
      "Join group activities, clubs, or communities to build collaborative experience.",
    ],
  },
];
const SCREEN_WIDTH = Dimensions.get("window").width;

// ---------------------------------------------------------------------------
// AsyncStorage helper to read saved profile image
// ---------------------------------------------------------------------------
const PROFILE_KEY = "profile_v1";

async function getStoredProfile(): Promise<{
  imageUri: string | null;
  currentAvatar?: any;
}> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      return {
        imageUri: obj.imageUri ?? null,
        currentAvatar: obj.currentAvatar,
      };
    }
  } catch {}
  return { imageUri: null };
}

type TabButtonProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => {
  // Map the title to the translation key
  const getTranslationKey = (title: string) => {
    switch (title) {
      case "Daily":
        return "homeTab.daily";
      case "Weekly":
        return "homeTab.weekly";
      case "Monthly":
        return "homeTab.monthly";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
      accessibilityLabel={`Switch to ${t(getTranslationKey(title))} view`}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {t(getTranslationKey(title))}
      </Text>
    </TouchableOpacity>
  );
};

const getProgressColor = (score: any) => {
  if (score > 70) {
    return "#B0C4DD"; // Green for above 70%
  } else if (score >= 50) {
    return "#F0818B"; // Yellow for between 50% and 70%
  } else {
    return "#F1AB6B"; // Red for below 50%
  }
};

const WellnessScore = ({ score, profileImage }: any) => {
  const animatedProgress = useState(new Animated.Value(0))[0];
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: score / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [score, animatedProgress]);

  const progressColor = getProgressColor(score);

  return (
    <View
      style={styles.wellnessContainer}
      accessible={true}
      accessibilityLabel={t("homeTab.yourWellnessScore")}
    >
      <View style={styles.progressContainer}>
        <View style={{ transform: [{ rotate: "90deg" }] }}>
          <Progress.Circle
            size={200}
            progress={score / 100}
            thickness={18}
            color={getProgressColor(score)}
            borderWidth={0}
            showsText={false}
            style={styles.progressCircle}
            accessibilityLabel={`${t("homeTab.yourWellnessScore")} ${score}%`}
          />
        </View>
        <Image
          source={profileImage}
          style={styles.profileImage}
          accessibilityLabel="Profile Picture"
        />
      </View>
      <View style={styles.wellnessTextContainer}>
        <Text style={styles.wellnessText}>
          {t("homeTab.yourWellnessScore")}
        </Text>
        <TouchableOpacity onPress={() => setShowInfoModal(true)}>
          <Icon name="info-outline" size={20} style={styles.infoIcon} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.wellnessPercentage, { color: progressColor }]}>
        {`${score}%`}
      </Text>

      <Modal
        visible={showInfoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.infoModalContainer}>
            <View style={styles.infoModalContent}>
              <Text style={styles.infoModalText}>
                Score depends on onboarding questions and test result
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowInfoModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ServiceCards = () => {
  const navigation = useNavigation<HomeTabNavigationProp>();
  const [activeService, setActiveService] = useState<string | null>(null);

  // Map service names to their translation keys
  const getTranslationKey = (service: string) => {
    switch (service) {
      case "Health Assessment":
        return "homeTab.healthAssessment";
      case "Explore Scans":
        return "homeTab.exploreScans";
      case "Anger Management":
        return "homeTab.angerManagement";
      case "Stress":
        return "homeTab.stress";
      case "Internet and Social Media Issue":
        return "homeTab.internetAndSocialMedia";
      default:
        return "";
    }
  };

  function redirectToScans(service: string) {
    setActiveService(service); // Set the active card
    if (service === "Explore Scans") {
      // @ts-ignore
      navigation.navigate("ConditionScansScreen");
    } else if (service === "Health Assessment") {
      // @ts-ignore
      navigation.navigate("MentalHealthAssessment");
    } else if (service === "Anger Management") {
      // @ts-ignore
      navigation.navigate("ScanIntro", { scanName: "Anger Management" });
    } else if (service === "Stress") {
      // @ts-ignore
      navigation.navigate("ScanIntro", { scanName: "Stress" });
    } else if (service === "Internet and Social Media Issue") {
      // @ts-ignore
      navigation.navigate("ScanIntro", { scanName: "Internet and Social Media Issue" });
    }
  }

  const services = [
    "Health Assessment", // New button in the first position
    "Explore Scans", // Moved to the second position
    "Anger Management",
    "Stress",
    "Internet and Social Media Issue",
  ];

  return (
    <View
      style={styles.servicesBox}
      accessible={true}
      accessibilityLabel={t("homeTab.checkConditionalWellness")}
    >
      <Text
        style={styles.servicesHeading}
        accessibilityLabel={t("homeTab.checkConditionalWellness")}
      >
        {t("homeTab.checkConditionalWellness")}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.serviceContainer}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingHorizontal: 0,
        }}
      >
        {services.map((service, index) => (
          <Pressable
            key={index}
            onPress={() => redirectToScans(service)}
            style={[
              styles.serviceCard,
              activeService === service && styles.activeCard, // Highlight active card
            ]}
          >
            <View
              key={index}
              accessible={true}
              accessibilityLabel={`${t(getTranslationKey(service))}`}
            >
              <Text
                style={[
                  styles.serviceTitle,
                  activeService === service && styles.activeTitle, // Change text color for active card
                ]}
              >
                {t(getTranslationKey(service))}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const getWellnessAvatar = (
  score: number,
  gender: string | null,
  avatarGender?: string | null,
  avatarIndex?: number | null,
) => {
  // If user has selected a specific avatar, use that
  if (avatarGender && avatarIndex !== null && avatarIndex !== undefined) {
    const avatars =
      avatarGender === "female"
        ? {
            sad: require("@/assets/avatars/female-sad.jpeg"),
            mid: require("@/assets/avatars/female-mid.jpeg"),
            happy: require("@/assets/avatars/female-happy.jpeg"),
          }
        : {
            sad: require("@/assets/avatars/male-sad.jpeg"),
            mid: require("@/assets/avatars/male-mid.jpeg"),
            happy: require("@/assets/avatars/male-happy.jpeg"),
          };
    return Object.values(avatars)[avatarIndex];
  }

  if (!gender)
    return {
      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    };

  // Only show gender-specific avatars for MALE and FEMALE
  if (gender !== "MALE" && gender !== "FEMALE") {
    return {
      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    };
  }

  const avatars =
    gender === "FEMALE"
      ? {
          sad: require("@/assets/avatars/female-sad.jpeg"),
          mid: require("@/assets/avatars/female-mid.jpeg"),
          happy: require("@/assets/avatars/female-happy.jpeg"),
        }
      : {
          sad: require("@/assets/avatars/male-sad.jpeg"),
          mid: require("@/assets/avatars/male-mid.jpeg"),
          happy: require("@/assets/avatars/male-happy.jpeg"),
        };

  if (score <= 40) {
    return avatars.sad;
  } else if (score <= 55) {
    return avatars.mid;
  } else {
    return avatars.happy;
  }
};

export default function App() {
  // Move these hooks to the very top of the component
  const [selectedTip, setSelectedTip] = useState<SimpleTip | null>(null);
  const [tipModalVisible, setTipModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState({
    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [activityTitle, setActivityTitle] = useState("");
  const [category, setCategory] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityRemarks, setActivityRemarks] = useState("");
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false); // Track if success message is visible
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const { locale } = useLanguage(); // Get current locale

  const [sheetVisible, setSheetVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState<
    any | null
  >(null);

  const [interventionsList, setInterventionsList] = useState<any[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<number>(0);

  const navigation = useNavigation();

  // Intervention counts state
  const [interventionCounts, setInterventionCounts] = useState({
    Daily: 0,
    Weekly: 0,
    "Bi-weekly": 0,
    Monthly: 0,
  });

  // Function to load intervention counts from AsyncStorage
  const loadInterventionCounts = async () => {
    try {
      const periods = ["Daily", "Weekly", "Bi-weekly", "Monthly"];
      const counts = { Daily: 0, Weekly: 0, "Bi-weekly": 0, Monthly: 0 };

      for (const period of periods) {
        const key = `interventions_${period}`;
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const interventions = JSON.parse(stored);
          if (Array.isArray(interventions)) {
            // Count all active interventions (not completed)
            counts[period as keyof typeof counts] = interventions.filter(
              (intervention: any) =>
                intervention &&
                typeof intervention === "object" &&
                !intervention.isCompleted,
            ).length;
          }
        }
      }

      console.log("Updated intervention counts:", counts);
      setInterventionCounts(counts);
    } catch (error) {
      console.error("Error loading intervention counts:", error);
      // Set default values in case of error
      setInterventionCounts({
        Daily: 0,
        Weekly: 0,
        "Bi-weekly": 0,
        Monthly: 0,
      });
    }
  };

  // Load intervention counts on component mount
  useEffect(() => {
    loadInterventionCounts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadInterventionCounts();
    }, []),
  );

  // Fetch interventions data on component mount
  useEffect(() => {
    async function fetchInterventions() {
      try {
        const data = await interventionObject();

        if (!Array.isArray(data)) {
          console.error("Invalid data format received from interventionObject");
          setInterventionsList([]);
          return;
        }

        // First, sort all interventions by date (oldest to newest)
        const sortedByDate = data
          .filter((intervention) => {
            // Validate each intervention
            if (!intervention.scan_title) {
              console.warn("Skipping intervention with missing scan_title");
              return false;
            }
            if (intervention.total_score === undefined) {
              console.warn(
                `Skipping ${intervention.scan_title} with missing score`,
              );
              return false;
            }
            if (!intervention.scan_date || !intervention.scan_time) {
              console.warn(
                `Skipping ${intervention.scan_title} with missing date/time`,
              );
              return false;
            }
            return true;
          })
          .sort((a: any, b: any) => {
            const dateA = new Date(`${a.scan_date} ${a.scan_time}`);
            const dateB = new Date(`${b.scan_date} ${b.scan_time}`);
            return dateA.getTime() - dateB.getTime();
          });

        // Create a map to track the latest intervention for each scan type
        const latestInterventionsMap = new Map();

        // Process interventions in chronological order
        sortedByDate.forEach((intervention) => {
          latestInterventionsMap.set(intervention.scan_title, intervention);
        });

        // Convert map to array and sort by date (oldest to newest)
        const latestInterventions = Array.from(
          latestInterventionsMap.values(),
        ).sort((a: any, b: any) => {
          const dateA = new Date(`${a.scan_date} ${a.scan_time}`);
          const dateB = new Date(`${b.scan_date} ${b.scan_time}`);
          return dateA.getTime() - dateB.getTime();
        });

        // Log the interventions with their dates and scores for debugging
        console.info(
          "Interventions in chronological order:",
          JSON.stringify(
            latestInterventions.map((item) => ({
              scan_title: item.scan_title,
              date: `${item.scan_date} ${item.scan_time}`,
              score: item.total_score,
            })),
            null,
            2,
          ),
        );

        setInterventionsList(latestInterventions);
      } catch (error) {
        console.error("Error fetching interventions:", error);
        setInterventionsList([]); // Set empty list on error
      }
    }

    fetchInterventions();
  }, []);

  // Toggle the Add Activity Modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddActivity = () => {
    setActivityTitle("");
    setCategory("");
    setActivityDuration("");
    setActivityRemarks("");
    setSuccessMessageVisible(true);

    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000);

    toggleModal();
  };

  const [activeTab, setActiveTab] = useState<"Daily" | "Weekly" | "Monthly">(
    "Daily",
  );
  // Fetch final onboarding score from AsyncStorage
  useEffect(() => {
    const fetchOnboardingScore = async () => {
      try {
        const stored = await AsyncStorage.getItem("onboardingResponses");
        if (stored) {
          const parsed = JSON.parse(stored);
          setFinalScore(parsed.overallOnboardingScore || 0);
        }
      } catch (error) {
        console.error("Error fetching onboarding score:", error);
      }
    };
    fetchOnboardingScore();

    // fetch stored profile picture and gender
    const fetchProfile = async () => {
      try {
        const profile = await AsyncStorage.getItem("profile_v1");
        if (profile) {
          const parsed = JSON.parse(profile);
          setSelectedGender(parsed.selectedGender || null);

          if (parsed.imageUri) {
            setProfileImage({ uri: parsed.imageUri });
          } else {
            // If no custom image, use wellness-based avatar
            const stored = await AsyncStorage.getItem("onboardingResponses");
            if (stored) {
              const responses = JSON.parse(stored);
              const score = responses.overallOnboardingScore || 0;
              const wellnessAvatar = getWellnessAvatar(
                score,
                parsed.selectedGender,
                parsed.avatarGender,
                parsed.avatarIndex,
              );
              setProfileImage(wellnessAvatar);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // refresh on focus so updates made in Profile screen appear instantly
  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          const profile = await AsyncStorage.getItem("profile_v1");
          if (profile) {
            const parsed = JSON.parse(profile);
            setSelectedGender(parsed.selectedGender || null);

            if (parsed.imageUri) {
              setProfileImage({ uri: parsed.imageUri });
            } else {
              // If no custom image, use wellness-based avatar
              const stored = await AsyncStorage.getItem("onboardingResponses");
              if (stored) {
                const responses = JSON.parse(stored);
                const score = responses.overallOnboardingScore || 0;
                const wellnessAvatar = getWellnessAvatar(
                  score,
                  parsed.selectedGender,
                  parsed.avatarGender,
                  parsed.avatarIndex,
                );
                setProfileImage(wellnessAvatar);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }, []),
  );

  // Show recommended interventions only if last addiction scan was within 7 days
  const [showInterventions, setShowInterventions] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("addictionScanResults");
        const history = stored ? JSON.parse(stored) : [];
        if (history.length > 0) {
          const lastEntry = history[history.length - 1];
          const lastDate = new Date(lastEntry.date);
          const now = new Date();
          const diffDays =
            (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
          setShowInterventions(diffDays <= 7);
        } else {
          setShowInterventions(false);
        }
      } catch (err) {
        console.error("Error fetching addiction scan history:", err);
        setShowInterventions(false);
      }
    })();
  }, []);

  const tabData = {
    Daily: {
      wellnessScore: 79,
      healthScore: 60,
      entries: [
        {
          title: "Online videos",
          description: "YouTube, education, movies",
          time: "2 hrs",
          color: "#e0bbff",
          date: "03 Mar 2024",
        },
        {
          title: "Sleep",
          description: "NA",
          time: "5 hrs",
          color: "#bbdefb",
          date: "03 Mar 2024",
        },
        {
          title: "Distance Traveled",
          description: "Home to Akurdi Railway Station",
          time: "1 hr",
          color: "#ffcccb",
          date: "03 Mar 2024",
        },
      ],
    },
    Weekly: {
      wellnessScore: 40,
      healthScore: 60,
      entries: [
        {
          title: "Walking",
          description: "Park walk",
          time: "4 hrs",
          color: "#c8e6c9",
          date: "03 Mar 2024",
        },
        {
          title: "Reading",
          description: "Books, articles",
          time: "3 hrs",
          color: "#ffcccb",
          date: "03 Mar 2024",
        },
      ],
    },
    Monthly: {
      wellnessScore: 63,
      healthScore: 60,
      entries: [
        {
          title: "Yoga",
          description: "Classes",
          time: "12 hrs",
          color: "#ffe0b2",
          date: "03 Mar 2024",
        },
        {
          title: "Meditation",
          description: "Mindfulness practice",
          time: "8 hrs",
          color: "#bbdefb",
          date: "03 Mar 2024",
        },
      ],
    },
  };

  const { wellnessScore, healthScore } = tabData[activeTab];

  // ---------------------------------------------------------------------------
  // Round‑robin selection of today's Mind‑Tools (2) tips
  // ---------------------------------------------------------------------------
  const today = new Date();
  const daysElapsed = Math.floor(
    (today.getTime() - ANCHOR_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  // two Mind‑Tools tips
  const mtIdx = daysElapsed % mindToolsTips.length;
  const todaysMindTools = [
    mindToolsTips[mtIdx],
    mindToolsTips[(mtIdx + 1) % mindToolsTips.length],
  ];

  const handleEQTestPress = () => {
    // @ts-ignore
    navigation.navigate("EQTestScreen");
  };

  const TopMessage = ({
    message,
    highlightText,
    suffixText,
    customTextStyle,
  }: any) => (
    <Text style={customTextStyle}>
      {message}
      {highlightText && (
        <Text style={styles.highlightedText}>{highlightText}</Text>
      )}
      {suffixText && <Text style={styles.suffixText}>{suffixText}</Text>}
    </Text>
  );

  // Mind‑Tools Cards with Modal
  const handleTipCardPress = (tip: SimpleTip) => {
    console.log("Selected tip:", tip);
    setSelectedTip(tip);
    setTipModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topMessageContainer}>
              <TopMessage
                message={
                  finalScore! > 70
                    ? t("homeTab.greatJob")
                    : t("homeTab.youCanDoBetter")
                }
                highlightText={finalScore! > 70 ? "" : t("homeTab.mindTools")}
                suffixText={finalScore! > 70 ? "" : t("homeTab.forSuggestions")}
                customTextStyle={
                  finalScore! > 70
                    ? styles.greatJobText
                    : styles.youCanDoBetterText
                }
                customMessageParts={
                  finalScore! > 70
                    ? []
                    : [
                        { text: "Check out ", style: styles.normalText },
                        { text: "MIND TOOLS", style: styles.highlightedText },
                        { text: " for suggestions", style: styles.normalText },
                      ]
                }
              />
            </View>

            <WellnessScore
              score={finalScore !== null ? finalScore : 0}
              profileImage={profileImage}
            />

            <View style={styles.tabContainer}>
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <TabButton
                  key={tab}
                  title={tab}
                  isActive={activeTab === tab}
                  onPress={() =>
                    setActiveTab(tab as "Daily" | "Weekly" | "Monthly")
                  }
                />
              ))}
            </View>
            <ServiceCards />

            {/* Intervention Buttons */}
            <View style={styles.interventionButtonsContainer}>
              <Text style={styles.interventionButtonsTitle}>
                {t("homeTab.currentInterventions")}
              </Text>
              <View style={styles.interventionButtonsRow}>
                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Daily",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.dailyInterventions")}: ${interventionCounts.Daily} items`}
                >
                  <View style={styles.interventionIconContainer}>
                    <Icon name="calendar-today" size={30} color="#4A90E2" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.dailyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts.Daily > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts.Daily}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Weekly",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.weeklyInterventions")}: ${interventionCounts.Weekly} items`}
                >
                  <View
                    style={[
                      styles.interventionIconContainer,
                      { backgroundColor: "#E6F2FF" },
                    ]}
                  >
                    <Icon name="view-week" size={30} color="#5D9DF5" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.weeklyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts.Weekly > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts.Weekly}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Bi-weekly",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.biweeklyInterventions")}: ${interventionCounts["Bi-weekly"]} items`}
                >
                  <View
                    style={[
                      styles.interventionIconContainer,
                      { backgroundColor: "#EEF7FF" },
                    ]}
                  >
                    <Icon name="date-range" size={30} color="#70A9F7" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.biweeklyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts["Bi-weekly"] > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts["Bi-weekly"]}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Monthly",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.monthlyInterventions")}: ${interventionCounts.Monthly} items`}
                >
                  <View
                    style={[
                      styles.interventionIconContainer,
                      { backgroundColor: "#F0F7FF" },
                    ]}
                  >
                    <Icon name="event-note" size={30} color="#85B8FF" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.monthlyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts.Monthly > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts.Monthly}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recommended Interventions */}
            {interventionsList.length > 0 && (
              <RecommendedInterventionsList
                scans={interventionsList}
                onScanSelect={(id) => {
                  const selected = interventionsList.find(
                    (item) => item.id === id,
                  );
                  if (!selected) return;

                  // Map scan_title to screen name
                  const screenMapping = {
                    Addictions: "AddictionsScreen",
                    "ADHD": "ADHDScreen",
                    "Common Psychological Issues": "CommonPsychologicalScreen",
                    "Environment Issues Affecting Mental Wellbeing":
                      "EnvironmentIssuesScreen",
                    "Family and Relationship": "FamilyRelationshipScreen",
                    "Financial Mental Health": "FinancialMentalHealthScreen",
                    "General Physical Fitness": "PhysicalFitnessScreen",
                    "Internet Dependence": "InternetDependenceScreen",
                    Stress: "StressScreen",
                    "Internet and Social Media Issue":
                      "InternetSocialMediaScreen",
                    Sleep: "SleepScreen",
                    "Suicidal Behaviour": "SuicidalBehaviourScreen",
                    "Substance Addiction": "SubstanceAddictionScreen",
                    "Professional Mental Health":
                      "ProfessionalMentalHealthScreen",
                    "Social Mental Health": "SocialMentalHealthScreen",
                    "Youngster Issues": "YoungsterIssuesScreen"
                  };
                  const screen = screenMapping[selected.scan_title as keyof typeof screenMapping];
                  if (screen) {
                    // @ts-ignore
                    navigation.navigate(screen);
                  } else {
                    // fallback: open MindToolsScreen with category param
                    // @ts-ignore
                    navigation.navigate("MindToolsScreen", {
                      category: selected.scan_title,
                    });
                  }
                }}
              />
            )}

            {/* Daily Mind‑Tools & EQ Test */}
            <View style={styles.tipCardsContainer}>
              {/* 2 Mind‑Tools cards */}
              {todaysMindTools.map((tip, i) => (
                <TouchableOpacity
                  key={`mt-${i}`}
                  style={styles.tipCard}
                  accessible
                  accessibilityLabel={tip.title}
                  onPress={() => handleTipCardPress(tip)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text
                    style={styles.tipDescription}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {tip.description}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* EQ Test Button */}
              <TouchableOpacity
                style={styles.eqTestButton}
                onPress={handleEQTestPress}
                accessible
                accessibilityLabel={t("homeTab.eqTest")}
              >
                <Text style={styles.eqTestButtonText}>
                  {t("homeTab.eqTest") || "EQ Test"}
                </Text>
              </TouchableOpacity>

              {/* Mind‑Tools Tip Modal */}
              <Modal
                visible={tipModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setTipModalVisible(false)}
              >
                <View style={styles.tipModalOverlay}>
                  <View style={styles.tipModalContainer}>
                    {/* Header */}
                    <View style={styles.tipModalHeader}>
                      <Text style={styles.tipModalTitle}>
                        {selectedTip?.title || "Loading..."}
                      </Text>
                      <TouchableOpacity
                        style={styles.tipModalCloseIcon}
                        onPress={() => setTipModalVisible(false)}
                      >
                        <Text style={styles.tipModalCloseText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Content Area */}
                    <View style={{ flex: 1, padding: 20 }}>
                      <ScrollView 
                        showsVerticalScrollIndicator={true}
                        style={{ flex: 1 }}
                      >
                        {/* Description */}
                        <Text style={{ 
                          fontSize: 16, 
                          marginBottom: 20, 
                          color: "#333",
                          lineHeight: 24
                        }}>
                          {selectedTip?.description || "No description available"}
                        </Text>
                        
                        {/* Example */}
                        {selectedTip?.example && (
                          <View style={{ marginBottom: 20 }}>
                            <Text style={{ 
                              fontSize: 18, 
                              fontWeight: "bold", 
                              color: "#2196F3",
                              marginBottom: 10 
                            }}>
                              💡 Example
                            </Text>
                            <Text style={{ 
                              fontSize: 15, 
                              backgroundColor: "#F0F0F0",
                              padding: 15,
                              borderRadius: 8,
                              lineHeight: 22
                            }}>
                              {selectedTip.example}
                            </Text>
                          </View>
                        )}
                        
                        {/* Task */}
                        {selectedTip?.task && (
                          <View style={{ marginBottom: 20 }}>
                            <Text style={{ 
                              fontSize: 18, 
                              fontWeight: "bold", 
                              color: "#2196F3",
                              marginBottom: 10 
                            }}>
                              🎯 Try this
                            </Text>
                            <Text style={{ 
                              fontSize: 15, 
                              backgroundColor: "#F0F0F0",
                              padding: 15,
                              borderRadius: 8,
                              lineHeight: 22
                            }}>
                              {selectedTip.task}
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                    
                    {/* Close Button */}
                    <View style={styles.tipModalFooter}>
                      <TouchableOpacity
                        style={styles.tipModalCloseButton}
                        onPress={() => setTipModalVisible(false)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.tipModalCloseButtonText}>Got it!</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            {/* This is the primary tertiary secondary intervention component. */}
            {selectedTestId && (
              <InterventionsSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                selectedTest={interventionsList.find(
                  (item) => item.id === selectedTestId,
                )}
                onSelectIntervention={(item) => {
                  setSelectedIntervention(item);
                  setSheetVisible(false);
                  setDetailVisible(true);
                }}
              />
            )}

            {/* This is the text detail component */}
            {interventionsList.length > 0 &&
              selectedTestId > 0 &&
              selectedIntervention && (
                <InterventionDetailModal
                  visible={detailVisible}
                  intervention={selectedIntervention}
                  onClose={() => setDetailVisible(false)}
                />
              )}
          </ScrollView>
          {/* Floating Action Button */}
          {/* <View style={styles.fabContainer}>
            <FAB
              style={styles.fab}
              icon="plus"
              size="large"
              color="#FFFFFF"
              onPress={toggleModal}
            />
          </View> */}
          {/* Modal for adding activity */}
          {/* <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={toggleModal}
          >
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.addActivityContainer}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.closeIconContainer}
                >
                  <IconButton icon="close" iconColor="white" size={25} />
                </TouchableOpacity>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {t("homeTab.activityTitle")}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t("homeTab.selectCategory")}
                    value={activityTitle}
                    onChangeText={setActivityTitle}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.inputLabel}>{t("homeTab.duration")}</Text>
                  <TextInput
                    style={styles.durationInput}
                    placeholder="HH:MM"
                    value={activityDuration}
                    onChangeText={setActivityDuration}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {t("homeTab.addTagsRemarks")}
                  </Text>
                  <TextInput
                    style={[styles.input, styles.remarksInput]}
                    placeholder={t("homeTab.selectCategory")}
                    value={activityRemarks}
                    onChangeText={setActivityRemarks}
                    multiline
                  />
                </View>

                <Pressable onPress={handleAddActivity}>
                  <View style={styles.modalButtons}>
                    <Button
                      mode="contained"
                      style={styles.saveButton}
                      labelStyle={styles.saveButtonLabel}
                    >
                      {t("homeTab.enter")}
                    </Button>
                  </View>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </Modal> */}

          {/* Success Message */}
          <Modal
            transparent={true}
            visible={isSuccessMessageVisible}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.successContent}>
                <Text style={styles.successMessage}>
                  {t("homeTab.activityAddedSuccess")}
                </Text>
                <Text style={styles.successSubtext}>
                  {t("homeTab.editActivityTimeLimit")}
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "FFF",
    alignItems: "center",
  },
  topMessageContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  topMessage: {
    fontSize: 16,
    fontWeight: "400",
    color: "#8E8E8E",
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  wellnessContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 5,
    marginBottom: 5,
    width: SCREEN_WIDTH,
  },
  progressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 165,
    height: 165,
    borderRadius: 83,
    position: "absolute",
    zIndex: 1,
    borderWidth: 6,
    borderColor: "#FFF",
  },
  progressCircle: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  wellnessPercentage: {
    fontSize: 42,
    fontWeight: "500",
    color: "#709ACF",
    marginTop: 5,
    fontFamily: "Poppins-Medium",
  },
  wellnessText: {
    fontSize: 18,
    color: "#4A4A4A",
    marginTop: 5,
    lineHeight: 24,
    fontFamily: "Poppins-Regular",
  },
  wellnessTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  infoIcon: {
    marginLeft: 8,
    marginTop: 7,
    color: "#B0B0B0",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: -10,
    backgroundColor: "#FFFFFF",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  activeTabButton: {
    backgroundColor: "#D27AD5",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#707070",
    fontFamily: "Poppins-Regular",
  },
  activeTabText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
  servicesBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  servicesHeading: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  serviceContainer: {
    // flexDirection: "row",
    // paddingHorizontal: 15,
    // marginLeft: -15,
    // marginRight: 15,
  },
  serviceCard: {
    width: 135,
    height: 78,
    borderRadius: 10,
    marginHorizontal: 8,
    borderColor: "#D27AD5",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#555555",
    textAlign: "left",
    fontFamily: "Poppins-Regular",
  },
  titleContainer: {
    justifyContent: "center",
    marginRight: 15,
  },
  healthScoreWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    width: "70%",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: -5,
  },
  percentageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  healthScoreContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    width: "70%",
    alignSelf: "flex-start",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -5,
    marginLeft: -10,
    paddingHorizontal: 15,
    fontFamily: "Poppins-Regular",
  },
  healthPercentage: {
    fontSize: 32,
    fontWeight: "500",
    color: "#F49E4F",
    marginLeft: -25,
    marginRight: 30,
    marginTop: -10,
    fontFamily: "Poppins-Medium",
  },
  fab: {
    width: 55,
    height: 55,
    backgroundColor: "#B0C4DD",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    transform: [{ rotate: "90deg" }],
  },
  fabContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
  journalContainer: {
    marginTop: 5,
    width: "100%",
    marginRight: 10,
  },
  journalEntryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  journalColorStrip: {
    width: 5,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  journalEntry: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
    marginLeft: 5,
    backgroundColor: "#f9f9f9",
  },
  journalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },
  journalTime: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Poppins-Regular",
  },
  journalDescription: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins-Regular",
  },
  journalDate: {
    marginTop: 5,
    fontSize: 12,
    color: "#888",
    fontFamily: "Poppins-Regular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 45,
    fontSize: 14,
    fontFamily: "Poppins_300Light",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // fixed typo
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#D27AD5",
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#B0B0B0",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  highlightedText: {
    fontSize: 16,
    color: "#D27AD5",
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
    padding: 10,
  },
  suffixText: {
    color: "#8E8E8E",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  greatJobText: {
    fontSize: 21,
    color: "#8E8E8E",
    fontFamily: "Poppins-Regular",
  },
  youCanDoBetterText: {
    fontSize: 16,
    color: "#8E8E8E",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  secondLineText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  normalText: {
    marginLeft: 30,
    fontWeight: "normal",
  },
  remarksInput: {
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "Poppins_300Light",
    textAlignVertical: "top",
    color: "#A2A2A2",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#5A96E1",
    borderWidth: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
  },
  saveButtonLabel: {
    color: "#5F6368",
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    marginTop: 15,
    marginBottom: 5,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  row: {
    top: -5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
  },
  durationInput: {
    width: "60%",
    height: 40,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 10,
    color: "#A2A2A2",
    backgroundColor: "#FFFFFF",
  },
  inputGroup: {
    marginBottom: 10,
  },
  successContent: {
    backgroundColor: "#B0C4DD",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    minHeight: "50%",
  },
  successMessage: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 60,
  },
  successSubtext: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular_Italic",
    textAlign: "center",
    color: "#4A4A4A",
  },
  closeIconContainer: {
    position: "absolute",
    top: 0,
    right: 5,
  },
  addActivityContainer: {
    backgroundColor: "#B0C4DD",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    minHeight: "50%",
    justifyContent: "flex-start",
    marginBottom: 55,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activeCard: {
    backgroundColor: "#D27AD5",
  },
  activeTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  tipCardsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tipCard: {
    borderWidth: 1,
    borderColor: "#B0C4DD",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  eqCard: {
    borderColor: "#F1AB6B",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 6,
    fontFamily: "Poppins-Bold",
  },
  tipDescription: {
    fontSize: 14,
    color: "#555555",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
  },
  eqTestButton: {
    borderWidth: 1,
    borderColor: "#F1AB6B",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  eqTestButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: "Poppins-Bold",
  },
  infoModalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoModalContent: {
    alignItems: "center",
  },
  infoModalText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  closeButton: {
    backgroundColor: "#D27AD5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  interventionButtonsContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 18,
    paddingBottom: 24,
    borderRadius: 16,
    marginVertical: 15,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  interventionButtonsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 18,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  interventionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2,
  },
  interventionButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 4,
    height: 125,
    borderRadius: 14,
    marginHorizontal: 5,
    backgroundColor: "#FAFAFA",
    borderColor: "#ECECEC",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  interventionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EDF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  interventionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4A4A4A",
    marginVertical: 4,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    width: "100%",
    paddingHorizontal: 1,
  },
  interventionButtonCount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4A90E2",
    fontFamily: "Poppins-Bold",
    backgroundColor: "#EDF4FF",
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
    lineHeight: 40,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  interventionButtonCountEmpty: {
    fontSize: 20,
    fontWeight: "500",
    color: "#BBBBBB",
    fontFamily: "Poppins-Medium",
    backgroundColor: "#F7F7F7",
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
    lineHeight: 36,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  // Enhanced Tip Modal Styles
  tipModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 20,
  },
  tipModalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "100%",
    maxWidth: 400,
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  tipModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tipModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
    fontFamily: "Poppins-Bold",
    flex: 1,
    marginRight: 12,
    lineHeight: 28,
  },
  tipModalCloseIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipModalCloseText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6C757D",
    fontFamily: "Poppins-Bold",
  },
  tipModalScrollView: {
    flex: 1,
  },
  tipModalSection: {
    marginBottom: 24,
  },
  tipModalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#495057",
    fontFamily: "Poppins-Regular",
    marginBottom: 16,
  },
  tipModalSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#E3F2FD",
  },
  tipModalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipModalIcon: {
    fontSize: 20,
  },
  tipModalSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2196F3",
    fontFamily: "Poppins-Bold",
    flex: 1,
  },
  tipModalSectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#495057",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#E3F2FD",
  },
  tipModalCloseButton: {
    backgroundColor: "#2196F3",
    marginHorizontal: 24,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  tipModalFooter: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tipModalCloseButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
});

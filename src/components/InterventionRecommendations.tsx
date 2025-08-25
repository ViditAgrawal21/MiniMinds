import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Linking,
} from "react-native";

/**
 * --------------------------------------------------------------------------------
 * PART ONE: Render functions for each type of content (Primary, Secondary, Tertiary).
 * Headings are rendered in bold via style={styles.boldHeading}.
 * --------------------------------------------------------------------------------
 */

// ------------------------ PRIMARY CONTENT ------------------------
function renderPrimaryContent() {
  return (
    <>
      <Text>
        Addressing addictions involves a combination of personal, social, and
        medical strategies. Here are ten common suggestions along with examples
        of how they might work:
      </Text>

      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>
          1. Acknowledgment and Acceptance:
        </Text>
        {"\n"} - Example: Recognizing and admitting you have an addiction can be
        the first step towards recovery. For instance, someone addicted to
        alcohol might start by attending an Alcoholics Anonymous (AA) meeting.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>2. Seeking Professional Help:</Text>
        {"\n"} - Example: A person addicted to opioids might consult a
        healthcare professional for medication-assisted treatment (MAT),
        alongside counseling.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>3. Behavioral Therapy:</Text>
        {"\n"} - Example: Cognitive Behavioral Therapy (CBT) can help an
        individual with a gambling addiction identify triggers and develop
        strategies to avoid addictive behaviors.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>4. Support Groups:</Text>
        {"\n"} - Example: Joining a support group like Narcotics Anonymous (NA)
        provides a community of people who share similar experiences and offer
        encouragement.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>5. Developing Coping Mechanisms:</Text>
        {"\n"} - Example: Replacing a smoking habit with chewing gum or taking a
        walk can help break the cycle and manage cravings.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>6. Mindfulness and Meditation:</Text>
        {"\n"} - Example: Practicing mindfulness meditation can help an
        individual with a food addiction by increasing awareness of eating
        habits and reducing compulsive eating.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>7. Avoidance of Triggers:</Text>
        {"\n"} - Example: Someone recovering from nicotine addiction might avoid
        places where they previously smoked, such as bars or cafes.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>8. Healthy Lifestyle Changes:</Text>
        {"\n"} - Example: Incorporating regular exercise and a balanced diet can
        help manage stress and reduce cravings for substances like caffeine.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>
          9. Setting Goals and Monitoring Progress:
        </Text>
        {"\n"} - Example: Setting small, achievable goals week by week and
        tracking progress in a journal can motivate and provide a sense of
        accomplishment.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>
          10. Building a Supportive Network:
        </Text>
        {"\n"} - Example: Relying on friends and family for support by openly
        discussing your addiction and involving them in your recovery process
        can create a strong support system.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        Each person's journey with addiction is unique, and it's important to
        find the combination of strategies that work best for the individual.
        Professional advice and a personalized plan are often the most effective
        approach to overcoming addiction.
      </Text>
    </>
  );
}

// ------------------------ SECONDARY PART 1 ------------------------
function renderSecondaryPart1() {
  return (
    <>
      <Text>
        Below are recommendations on books, movies, motivational content, and
        music related to addiction recovery. These resources should be easily
        searchable online or available through libraries or streaming services.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Books</Text>
      <Text>
        1. "In the Realm of Hungry Ghosts" by Gabor Maté – An insightful look at
        addiction through compassion and science.
        {"\n"}2. "The Unexpected Joy of Being Sober" by Catherine Gray
        {"\n"}3. "Alcoholics Anonymous: The Big Book"
        {"\n"}4. "Recovery: Freedom from Our Addictions" by Russell Brand
        {"\n"}5. "Beautiful Boy: A Father's Journey..." by David Sheff
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Movies and Documentaries</Text>
      <Text>
        1. "Beautiful Boy" (2018) – Based on David Sheff’s book.
        {"\n"}2. "Recovery Boys" (2018)
        {"\n"}3. "Clean and Sober" (1988)
        {"\n"}4. "Requiem for a Dream" (2000)
        {"\n"}5. "The Anonymous People" (2013)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Motivational Videos and Talks</Text>
      <Text>
        1. TED Talk: "Everything You Know About Addiction is Wrong" by Johann
        Hari
        {"\n"}2. Russell Brand’s YouTube channel
        {"\n"}3. "The Power of Vulnerability" by Brené Brown
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Music Therapy and Playlists</Text>
      <Text>
        1. Spotify’s "Music for Healing" playlists
        {"\n"}2. Calm – An app with music and meditation sessions
        {"\n"}3. Classical music playlists
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Online Resources</Text>
      <Text>
        - National Institute on Drug Abuse (NIDA)
        {"\n"}- SMART Recovery
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        These resources can provide support, insight, and inspiration. If you or
        someone you know is dealing with addiction, consult a healthcare
        professional for personalized help.
      </Text>
    </>
  );
}

// ------------------------ SECONDARY PART 2 ------------------------
function renderSecondaryPart2() {
  return (
    <>
      <Text>
        Addressing addictions through yoga and meditation can be a supportive
        practice. They help improve mental clarity, reduce stress, and increase
        self-awareness, but do not replace professional medical treatment.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Yoga for Addiction Recovery</Text>
      <Text>
        1. Mountain Pose (Tadasana)
        {"\n"}2. Child’s Pose (Balasana)
        {"\n"}3. Cat-Cow Stretch (Marjaryasana-Bitilasana)
        {"\n"}4. Tree Pose (Vrksasana)
        {"\n"}5. Bridge Pose (Setu Bandhasana)
        {"\n"}6. Savasana (Corpse Pose)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Meditation for Addiction Recovery</Text>
      <Text>
        1. Mindfulness Meditation
        {"\n"}2. Loving-Kindness Meditation (Metta)
        {"\n"}3. Body Scan Meditation
        {"\n"}4. Guided Meditations
        {"\n"}5. Breath Awareness Meditation
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Additional Tips</Text>
      <Text>
        - Consistency
        {"\n"}- Set Intentions
        {"\n"}- Community Support
        {"\n"}- Professional Guidance
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        Remember, recovery is a holistic journey. Combining yoga and meditation
        with formal addiction treatment and support networks can create a
        well-rounded approach.
      </Text>
    </>
  );
}

// ------------------------ SECONDARY PART 3 ------------------------
function renderSecondaryPart3() {
  return (
    <>
      <Text>
        Yoga and meditation can effectively complement professional treatment by
        helping manage stress, improving mental clarity, and promoting
        well-being.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Yoga Practices</Text>
      <Text>
        1. <Text style={styles.boldHeading}>Breath Awareness (Pranayama)</Text>
        {"\n"} - Deep Breathing: Spend a few minutes daily focusing on your
        breath. Inhale deeply, hold, then exhale slowly.
        {"\n"} - Nadi Shodhana (Alternate Nostril Breathing): Balances the mind
        and reduces anxiety.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Asanas (Postures)</Text>
      <Text>
        1. Child's Pose (Balasana)
        {"\n"}2. Cat-Cow Stretch (Marjaryasana-Bitilasana)
        {"\n"}3. Forward Bend (Uttanasana)
        {"\n"}4. Warrior Pose (Virabhadrasana)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Restorative Yoga Poses</Text>
      <Text>
        1. Legs-Up-The-Wall Pose (Viparita Karani)
        {"\n"}2. Reclining Bound Angle Pose (Supta Baddha Konasana)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Meditation Techniques</Text>
      <Text>
        1. Mindfulness Meditation
        {"\n"}2. Loving-Kindness Meditation (Metta)
        {"\n"}3. Body Scan Meditation
        {"\n"}4. Guided Imagery
        {"\n"}5. Mantra Meditation
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Creating a Routine</Text>
      <Text>
        1. Set Aside Regular Time
        {"\n"}2. Create a Dedicated Space
        {"\n"}3. Journal Reflections
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        Integration with Professional Support
      </Text>
      <Text>
        - Counseling or Therapy
        {"\n"}- Support Groups (AA, NA)
        {"\n"}- Medical Support
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        Remember, while yoga and meditation can be powerful tools in addiction
        recovery, they should be part of an integrative approach that includes
        medical and psychological support.
      </Text>
    </>
  );
}

// ------------------------ TERTIARY PART 1 ------------------------
function renderTertiaryPart1() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.paragraph}>
          Cognitive Behavioral Therapy (CBT) is a widely used therapeutic
          approach that aims to change patterns of thinking or behavior that are
          behind people's difficulties, and thus change the way they feel. Below
          are ten CBT suggestions for addressing addictions, along with
          explanations of why they help, what to do, and examples:
        </Text>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>
            1. Identify and Challenge Negative Thoughts
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Negative thoughts can
            fuel addictive behaviors by making the individual feel hopeless or
            unworthy.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Keep a journal to track
            negative thoughts when cravings appear. Identify the patterns and
            challenge these thoughts by asking whether they are rational or
            based on assumptions.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> If the thought "I can't
            cope without drinking" arises, counter it by listing times you have
            successfully coped without alcohol.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>2. Behavioral Activation</Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Engaging in
            meaningful activities can reduce the urge to engage in addictive
            behaviors as a way to cope with boredom or stress.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Schedule daily
            activities that are fulfilling or enjoyable to decrease downtime
            that can lead to cravings.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> Plan a daily walk, join a
            hobby group, or volunteer to replace time spent on addictive
            activities.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>3. Craving Control Techniques</Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Learning to manage
            cravings can prevent relapse.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Use techniques like
            deep breathing, visualization, or the "urge surfing" method to cope
            with cravings as they occur.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> When cravings hit, take
            deep breaths, visualize the craving as a wave that will eventually
            pass, and ride it out.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>4. Thought Stopping</Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> It interrupts the
            cycle of obsessive thinking about substances or behaviors.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Use a mental command
            like "Stop!" or snap a rubber band against your wrist to interrupt
            harmful thoughts.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> When starting to think
            about using, mentally shout "Stop!" to interrupt the thought process
            and focus on a positive affirmation.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>5. Cognitive Restructuring</Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Modifying distorted
            thinking can reduce the negative emotions that trigger addictive
            behavior.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Work with a therapist
            to identify cognitive distortions (like "all-or-nothing thinking")
            and replace them with balanced thoughts.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> Replace "I'll never be
            able to stay sober" with "I can take it one day at a time."
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>
            6. Mindfulness and Grounding Techniques
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Being present and
            grounded can help manage stress and reduce the impulse to escape
            into addictive behaviors.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Practice mindfulness
            meditation or grounding exercises regularly.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> Use the 5-4-3-2-1
            technique, naming five things you can see, four you can touch, three
            you can hear, two you can smell, and one you can taste.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>7. Relapse Prevention Planning</Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Anticipating and
            planning for potential triggers reduces the risk of relapse.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Develop a detailed plan
            for handling high-risk situations with alternate coping strategies.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> If social gatherings
            trigger drinking, plan to attend with a sober friend or drink a
            non-alcoholic beverage.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>8. Assertiveness Training</Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Building
            assertiveness can enable individuals to refuse substances from
            others confidently.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Practice using "I"
            statements to express needs and boundaries.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> "I don't drink anymore,
            can I have something else?" when offered alcohol.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>
            9. Goal Setting and Reward Systems
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Setting achievable
            goals and rewarding progress increases motivation and reinforces
            positive behavior.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Break long-term
            abstinence into smaller, manageable goals, and celebrate small
            victories.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> Reward yourself with a
            small treat or activity for each week you stay clean, such as a new
            book or a favorite meal.
          </Text>
        </View>

        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>10. Building a Support Network</Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Why it Helps:</Text> Support from others
            can provide encouragement and accountability.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>What to Do:</Text> Join a support group or
            work with a sponsor.
          </Text>
          <Text style={styles.subPoint}>
            <Text style={styles.bold}>Example:</Text> Attend weekly meetings or
            check-in daily with a sober partner or group.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          These CBT strategies address both the cognitive and behavioral aspects
          of addiction, providing individuals with tools to manage their
          thoughts, emotions, and behaviors, supporting lasting change.
        </Text>
      </ScrollView>
    </>
  );
}

// ------------------------ TERTIARY PART 2 ------------------------
function renderTertiaryPart2() {
  return (
    <>
      <Text>
        Rational Emotive Behavior Therapy (REBT) focuses on identifying and
        changing irrational beliefs. Here are ten REBT-based strategies:
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        1. Identify and Dispute Irrational Beliefs
      </Text>
      <Text>
        - Why it Helps: Irrational beliefs can fuel addictive behaviors.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        2. Develop a Stronger Sense of Self-acceptance
      </Text>
      <Text>
        - Why it Helps: Accepting yourself reduces the reliance on substances.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>3. Change "Musts" to Preferences</Text>
      <Text>
        - Why it Helps: Replacing absolute language with preferences reduces
        stress.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        4. Practice Emotional Responsibility
      </Text>
      <Text>
        - Why it Helps: Controlling your reactions minimizes the need for
        substances.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        5. Visualize Long-term Consequences
      </Text>
      <Text>
        - Why it Helps: Imagining negative outcomes can motivate behavior
        change.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>6. Create a Rational Coping Plan</Text>
      <Text>
        - Why it Helps: Having a clear plan for coping with urges reduces
        relapse risk.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>7. Develop Problem-solving Skills</Text>
      <Text>
        - Why it Helps: Overcoming problems without substances builds
        resilience.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>8. Challenge Catastrophic Thinking</Text>
      <Text>
        - Why it Helps: Disputing catastrophic thoughts creates a balanced
        perspective.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>9. Employ Mindfulness Techniques</Text>
      <Text>
        - Why it Helps: Mindfulness increases awareness of thoughts and urges.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>10. Seek Social Support</Text>
      <Text>
        - Why it Helps: Support from others provides encouragement and
        accountability.
      </Text>
    </>
  );
}

/**
 * --------------------------------------------------------------------------------
 * PART TWO: recommendedItems array
 * --------------------------------------------------------------------------------
 */
const recommendedItems = [
  {
    id: "1",
    title: "Primary Intervention",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Primary Intervention Info",
        renderContent: renderPrimaryContent,
      },
    ],
  },
  {
    id: "2",
    title: "Secondary Intervention",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Books, Movies, Motivational Content, and Music",
        renderContent: renderSecondaryPart1,
      },
      {
        title: "Yoga & Meditation (Part 1)",
        renderContent: renderSecondaryPart2,
      },
      {
        title: "Yoga & Meditation (Part 2)",
        renderContent: renderSecondaryPart3,
      },
    ],
  },
  {
    id: "3",
    title: "Tertiary Intervention",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Cognitive Behavioral Therapy (CBT)",
        renderContent: renderTertiaryPart1,
      },
      {
        title: "Rational Emotive Behavior Therapy (REBT)",
        renderContent: renderTertiaryPart2,
      },
    ],
  },
  {
    id: "4",
    title: "Connect to Mental Health Professional",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Connect to Mental Health Professional",
        renderContent: () => (
          <>
            <Text>
              Tap below to message on WhatsApp for professional support.
            </Text>
            <View style={{ marginVertical: 5 }}>
              <Button
                title="Message on WhatsApp"
                onPress={() =>
                  Linking.openURL("whatsapp://send?phone=+1234567890")
                }
                color="#AB47BC"
              />
            </View>
          </>
        ),
      },
    ],
  },
];

/**
 * --------------------------------------------------------------------------------
 * PART THREE: Main Component (VERTICAL list + modal)
 * --------------------------------------------------------------------------------
 */
export default function RecommendedInterventions() {
  const [selectedIntervention, setSelectedIntervention] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<any>(null);

  const handlePress = (item: any) => {
    setSelectedIntervention(item);
    setSelectedSection(null);
  };

  const closeModal = () => {
    setSelectedIntervention(null);
    setSelectedSection(null);
  };

  const handleSectionPress = (section: any) => {
    setSelectedSection(section);
  };

  // Renders content inside the modal, depending on user selection
  const renderModalContent = () => {
    if (!selectedIntervention) return null;

    // If there's only one section and no specific section chosen, show it by default
    if (selectedIntervention.sections.length === 1 && !selectedSection) {
      const { renderContent } = selectedIntervention.sections[0];
      return (
        <ScrollView style={styles.modalScroll}>
          {renderContent && renderContent()}
        </ScrollView>
      );
    }

    // If a specific section is chosen, show that
    if (selectedSection) {
      return (
        <ScrollView style={styles.modalScroll}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedSection(null)}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Back to Sections
            </Text>
          </TouchableOpacity>
          {selectedSection.renderContent && selectedSection.renderContent()}
        </ScrollView>
      );
    }

    // Otherwise, list all sections for that intervention
    return (
      <View>
        <Text style={styles.sectionListTitle}>
          Sections for {selectedIntervention.title}:
        </Text>
        {selectedIntervention.sections.map((sec: any, idx: number) => (
          <TouchableOpacity
            key={idx}
            style={styles.sectionButton}
            onPress={() => handleSectionPress(sec)}
          >
            <Text style={styles.sectionButtonText}>{sec.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommended Interventions</Text>

      {/* A vertical ScrollView now (instead of horizontal) */}
      <ScrollView style={styles.scrollContainer}>
        {recommendedItems.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemOuterShape}
            onPress={() => handlePress(item)}
            activeOpacity={0.9}
          >
            {/* The black-outlined rectangle from your design */}
            <View style={styles.roundedOutline}>
              {/* The left yellow box with watchman.png */}
              <View style={styles.leftYellowBox}>
                <Image source={item.image} style={styles.watchmanImage} />
              </View>
              {/* Text area: "Condition Name" over item.title */}
              <View style={styles.textArea}>
                <Text style={styles.conditionName}>Condition Name</Text>
                <Text style={styles.interventionSubTitle}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for sections & content */}
      <Modal visible={!!selectedIntervention} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                {selectedIntervention?.title}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
            {/* Modal body with actual content */}
            {renderModalContent()}
          </View>
        </View>
      </Modal>
    </View>
  );
}

/**
 * --------------------------------------------------------------------------------
 * PART FOUR: Styles
 * --------------------------------------------------------------------------------
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff", // Added background color for better visibility
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    color: "#333", // Added text color
  },
  pointContainer: {
    marginBottom: 20,
    paddingLeft: 10, // Indent points slightly
    borderLeftWidth: 2, // Add a visual separator for points
    borderLeftColor: "#eee", // Light grey separator color
    paddingBottom: 10, // Add some space at the bottom of each point section
  },
  pointTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111", // Darker color for titles
  },
  subPoint: {
    fontSize: 16,
    marginLeft: 10, // Indent sub-points
    marginBottom: 5,
    lineHeight: 22,
    color: "#555", // Slightly lighter text color for sub-points
  },
  bold: {
    fontWeight: "bold",
    color: "#333", // Ensure bold text is clearly visible
  },
  // container: {
  //   flex: 1,
  //   marginVertical: 20,
  //   // optional backgroundColor or any styling
  // },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  // For vertical scrolling
  scrollContainer: {
    marginHorizontal: -45, // leaves space on left & right
  },

  // Each item shape
  itemOuterShape: {
    marginBottom: 15, // space between items vertically
  },
  roundedOutline: {
    borderWidth: 2,
    borderColor: "#808080",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
  },

  // The left "yellow" box
  leftYellowBox: {
    width: 60,
    height: 60,
    backgroundColor: "#FFD668",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  watchmanImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  // Text area (Condition Name + subTitle)
  textArea: {
    flex: 1,
    justifyContent: "center",
  },
  conditionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  interventionSubTitle: {
    fontSize: 14,
    color: "#666",
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#AB47BC",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalHeaderText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  modalScroll: {
    padding: 15,
  },
  sectionListTitle: {
    fontSize: 16,
    fontWeight: "600",
    margin: 15,
    textAlign: "center",
    color: "#333",
  },
  sectionButton: {
    backgroundColor: "#E6E6E6",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  sectionButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  backButton: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },

  // Bold headings in content
  boldHeading: {
    fontWeight: "bold",
  },
  lineSpacer: {
    marginVertical: 6,
  },
});

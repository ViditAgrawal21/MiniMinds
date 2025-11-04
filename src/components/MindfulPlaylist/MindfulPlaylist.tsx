/**
 * MindfulPlaylist
 * ---------------
 * Displays a 2‑column grid of psycho‑education "folders" (categories).
 * Tapping a folder opens a modal that lists the YouTube (or other) links in that
 * category, each with its own thumbnail.
 *
 * 👉  Data source lives in the `playlistData` constant further down – that's the
 *     closest thing to a "JSON object" in this file.
 * 👉  Thumbnails come straight from the YouTube CDN; if a video has `thumbnail: null`
 *     we fall back to the local `download.png` placeholder.
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  ScrollView,
  Linking,
} from "react-native";
import { t } from "@/i18n/locales/i18n";

type ThumbProps = { uri: string | null; style?: any };

// ---------------------------------------------------
//  VideoThumbnail
//  --------------------------------------------------
//  🔹 If `uri` is provided, it first tries the high‑res
//     `maxresdefault.jpg`.  A 404 triggers an automatic
//     retry with `hqdefault.jpg`.  If that fails too,
//     nothing is rendered (no default image).
//  🔹  This means an image *only* appears when YouTube
//     actually hosts a thumbnail; otherwise the space
//     stays empty – exactly as requested.
// ---------------------------------------------------
function VideoThumbnail({ uri, style }: ThumbProps) {
  const [sourceUri, setSourceUri] = React.useState<string | null>(uri);
  const [failedOnce, setFailedOnce] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Reset when the parent passes a new URI
  // React.useEffect(() => {
  //   setSourceUri(uri);
  //   setFailedOnce(false);
  //   setIsLoading(true);
  // }, [uri]);

  console.log("Thumbnail URI:", uri);

  // Nothing to show? leave the space empty
  if (!sourceUri) {
    return <View style={style || styles.modalThumbnail} />;
  }

  return (
    <Image
      source={{ 
        uri: sourceUri,
        cache: 'force-cache' // Enable built-in caching
      }}
      style={[style || styles.modalThumbnail, isLoading && { opacity: 0.5 }]}
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
      onError={() => {
        // 1st failure → try hqdefault
        if (!failedOnce && sourceUri.includes("maxresdefault.jpg")) {
          const hqUri = sourceUri.replace("maxresdefault.jpg", "hqdefault.jpg");
          setSourceUri(hqUri);
          setFailedOnce(true);
        } else {
          // 2nd failure → give up (empty)
          setSourceUri(null);
        }
      }}
    />
  );
}
// ---------------------------------------------------

// ---------------------------------------------------
//  👇 Data: one big array of categories (“folders”)
//     Each category has:
//       • category:   readable folder name
//       • items:      array of { title, link, thumbnail }
// ---------------------------------------------------
// Playlist data grouped by Folder Name from the CSV
const playlistData = [
  {
    category: "Addictions",
    items: [
      {
        title:
          "Cognitive Behavioral Therapy (CBT) Explainer Video - Source: Addiction Policy Forum",
        link: "https://www.addictionpolicy.org/post/cognitive-behavioral-therapy",
        thumbnail: null,
      },
      {
        title:
          "Substance Use Disorders: Signs, Common Addictions, Treatment - Source: Shelly F. Greenfield, M.D., M.P.H.",
        link: "https://www.mcleanhospital.org/video/common-questions-about-addiction",
        thumbnail: null,
      },
      {
        title:
          "Why Addiction is a \"Disease\" and Why It's Important - Source: Dr. Corrie Vilsaint",
        link: "https://www.recoveryanswers.org/media/addiction-disease-important-webcast/",
        thumbnail: null,
      },
      {
        title: "How an Addicted Brain Works - Source: Clara Liao",
        link: "https://www.youtube.com/watch?v=AOyhRb7UA08",
        thumbnail: "https://img.youtube.com/vi/AOyhRb7UA08/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Common Psychological Issues",
    items: [
      {
        title: "What are mental health problems? - Source: Mind",
        link: "https://www.youtube.com/watch?v=AUWhdmKyOE8",
        thumbnail: "https://img.youtube.com/vi/AUWhdmKyOE8/maxresdefault.jpg",
      },
      {
        title:
          "5 MOST COMMON Mental Illnesses EXPLAINED - Source: Junior Doctor",
        link: "https://www.youtube.com/watch?v=BdhbPTkfVcw",
        thumbnail: "https://img.youtube.com/vi/BdhbPTkfVcw/maxresdefault.jpg",
      },
      {
        title: "Every Mental Illness Explained in 8 Minutes - Source: YouTube",
        link: "https://www.youtube.com/watch?v=3NKqq20W538",
        thumbnail: "https://img.youtube.com/vi/3NKqq20W538/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Environment Issues Affecting Mental Wellbeing",
    items: [
      {
        title: "Mental Health | Environment 101 | CSEN",
        link: "https://www.youtube.com/watch?v=3IRCAgbHvl8",
        thumbnail: "https://img.youtube.com/vi/3IRCAgbHvl8/maxresdefault.jpg",
      },
      {
        title: "Climate Change Affect On Mental Health | Commonwealth Fund",
        link: "https://www.commonwealthfund.org/publications/explainer/2023/mar/how-climate-change-affects-mental-health",
        thumbnail: null,
      },
      {
        title:
          "Pollution's mental toll: How climate change shapes our mental health",
        link: "https://www.youtube.com/watch?v=0M-L4fawOPc",
        thumbnail: "https://img.youtube.com/vi/0M-L4fawOPc/maxresdefault.jpg",
      },
      {
        title: "How Climate Change Impacts Your Mental Health | APA",
        link: "https://www.youtube.com/watch?v=xhN4afWdX4Q",
        thumbnail: "https://img.youtube.com/vi/xhN4afWdX4Q/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Family and Relationship",
    items: [
      {
        title: "Learn Family Relations Names for Kids - Source: Litchi Show",
        link: "https://www.youtube.com/watch?v=78V5yCSwV9s",
        thumbnail: "https://img.youtube.com/vi/78V5yCSwV9s/maxresdefault.jpg",
      },
      {
        title:
          "The Simple Tool That Will Transform Your Family Dynamic - Source: Mel Robbins",
        link: "https://www.youtube.com/watch?v=Pw1ohFfCPsg",
        thumbnail: "https://img.youtube.com/vi/Pw1ohFfCPsg/maxresdefault.jpg",
      },
      {
        title:
          "PBS KIDS Talk About | RELATIONSHIPS & FAMILY - Source: PBS KIDS",
        link: "https://www.youtube.com/watch?v=tDzv0Wclpn4",
        thumbnail: "https://img.youtube.com/vi/tDzv0Wclpn4/maxresdefault.jpg",
      },
      {
        title:
          "Defining YOUR Relationship with Family Science - Source: Utah Valley University",
        link: "https://www.youtube.com/watch?v=oia6tNFbp30",
        thumbnail: "https://img.youtube.com/vi/oia6tNFbp30/maxresdefault.jpg",
      },
      {
        title:
          "How and Why Family Relationships Change As We Age - Source: Nanny",
        link: "https://www.youtube.com/watch?v=cZpIgQKGrCk",
        thumbnail: "https://img.youtube.com/vi/cZpIgQKGrCk/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Financial Mental Health",
    items: [
      {
        title:
          "Financial Stress & Mental Health: How Money Worries Affect Your Mind - Source: Dr. Greg Jantz",
        link: "https://www.youtube.com/watch?v=tc5xG7or648",
        thumbnail: "https://img.youtube.com/vi/tc5xG7or648/maxresdefault.jpg",
      },
      {
        title:
          "Money and Mental Health: The Psychological Links - Source: Dr. Thomas Richardson",
        link: "https://www.youtube.com/watch?v=LbNX1YTh_6s",
        thumbnail: "https://img.youtube.com/vi/LbNX1YTh_6s/maxresdefault.jpg",
      },
      {
        title:
          "Financial Therapist Explains Money and Mental Health - Source: Lindsay Bryan-Podvin",
        link: "https://www.youtube.com/watch?v=uaBjQzFANHU",
        thumbnail: "https://img.youtube.com/vi/uaBjQzFANHU/maxresdefault.jpg",
      },
      {
        title:
          "What Is The Link Between Mental Health and Financial Wellness? - Source: Joan Kirera",
        link: "https://www.youtube.com/watch?v=w32o0bYUaWI",
        thumbnail: "https://img.youtube.com/vi/w32o0bYUaWI/maxresdefault.jpg",
      },
      {
        title: "Financial Anxiety and Mental Health - Source: Dan Harris",
        link: "https://www.youtube.com/watch?v=CZGYdsuTLkk",
        thumbnail: "https://img.youtube.com/vi/CZGYdsuTLkk/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Stress",
    items: [
      {
        title:
          "Stress and Adaptation - Explains General Adaptation Syndrome (GAS) and stress responses",
        link: "https://www.youtube.com/watch?v=-QSVsb0wlLw",
        thumbnail: "https://img.youtube.com/vi/-QSVsb0wlLw/maxresdefault.jpg",
      },
      {
        title:
          "How Stress Affects Our Brains and Bodies - By Dr. Yewande Pearse",
        link: "https://www.youtube.com/watch?v=a4opDJOCEKA",
        thumbnail: "https://img.youtube.com/vi/a4opDJOCEKA/maxresdefault.jpg",
      },
      {
        title: "Where Does Our Stress Come From? - By Dr. Tina Lasisi",
        link: "https://www.youtube.com/watch?v=Ymnt5Ib4Xes",
        thumbnail: "https://img.youtube.com/vi/Ymnt5Ib4Xes/maxresdefault.jpg",
      },
      {
        title: "How Stress Can Change Your Brain - Animated explanation",
        link: "https://www.openculture.com/2017/10/how-stress-can-change-your-brain-an-animated-introduction.html",
        thumbnail: null,
      },
      {
        title:
          "The Upside of Stress - Kelly McGonigal's TED Talk on the helpful aspects of stress",
        link: "https://www.youtube.com/watch?v=72ER7zqOpWE",
        thumbnail: "https://img.youtube.com/vi/72ER7zqOpWE/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Suicidal Behavior",
    items: [
      {
        title:
          "Addressing Suicidal Thoughts and Behaviors in Substance Abuse Treatment - SAMHSA and VA guidance",
        link: "https://www.youtube.com/watch?v=1n2QZlheuzc",
        thumbnail: "https://img.youtube.com/vi/1n2QZlheuzc/maxresdefault.jpg",
      },
      {
        title:
          "Cognitive Behavioral Therapy for Suicidal Behavior - CBT techniques and case approaches",
        link: "https://www.youtube.com/watch?v=ZshYSdmcYu8",
        thumbnail: "https://img.youtube.com/vi/ZshYSdmcYu8/maxresdefault.jpg",
      },
      {
        title:
          "Understanding Suicidal Behavior - Prof. Rory O’Connor explains the IMV model",
        link: "https://www.youtube.com/watch?v=5bCBrvDjMr4",
        thumbnail: "https://img.youtube.com/vi/5bCBrvDjMr4/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "General Physical Fitness",
    items: [
      {
        title: "The 5 Components of Health-Related Fitness",
        link: "https://www.youtube.com/watch?v=rc3ZDoheMQs",
        thumbnail: "https://img.youtube.com/vi/rc3ZDoheMQs/maxresdefault.jpg",
      },
      {
        title: "CrossFit Explained - The 10 General Physical Skills",
        link: "https://www.youtube.com/watch?v=SHsAma4AHJ0",
        thumbnail: "https://img.youtube.com/vi/SHsAma4AHJ0/maxresdefault.jpg",
      },
      {
        title:
          "Dr. Andy Galpin: How to Assess & Improve All Aspects of Your Fitness",
        link: "https://www.youtube.com/watch?v=zEYE-vcVKy8",
        thumbnail: "https://img.youtube.com/vi/zEYE-vcVKy8/maxresdefault.jpg",
      },
      {
        title: "Fitness Toolkit: Protocol & Tools to Optimize Physical Health",
        link: "https://www.youtube.com/watch?v=q1Ss8sTbFBY",
        thumbnail: "https://img.youtube.com/vi/q1Ss8sTbFBY/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Internet Dependence",
    items: [
      {
        title:
          "What You Need to Know About Internet Addiction | Dr. Kimberly Young",
        link: "https://www.youtube.com/watch?v=vOSYmLER664",
        thumbnail: "https://img.youtube.com/vi/vOSYmLER664/maxresdefault.jpg",
      },
      {
        title: "How Can We Get Addicted to the Internet?",
        link: "https://www.youtube.com/watch?v=ibaJ1fz2wbA",
        thumbnail: "https://img.youtube.com/vi/ibaJ1fz2wbA/maxresdefault.jpg",
      },
      {
        title: "Internet Addiction - YouTube",
        link: "https://www.youtube.com/watch?v=n-Y4wrpcbp0",
        thumbnail: "https://img.youtube.com/vi/n-Y4wrpcbp0/maxresdefault.jpg",
      },
      {
        title: "Understanding Internet Addiction: Dr. Kimberly Young",
        link: "https://www.youtube.com/watch?v=fAjYOlOaAPQ",
        thumbnail: "https://img.youtube.com/vi/fAjYOlOaAPQ/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Professional Mental Health",
    items: [
      {
        title: "What are mental health problems? - Source: Mind",
        link: "https://www.youtube.com/watch?v=AUWhdmKyOE8",
        thumbnail: "https://img.youtube.com/vi/AUWhdmKyOE8/hqdefault.jpg",
      },
      {
        title: "5 MOST COMMON Mental Illnesses EXPLAINED - Source: Junior Doctor",
        link: "https://www.youtube.com/watch?v=BdhbPTkfVcw",
        thumbnail: "https://img.youtube.com/vi/BdhbPTkfVcw/hqdefault.jpg",
      },
      {
        title: "Every Mental Illness Explained in 8 Minutes - Source: YouTube",
        link: "https://www.youtube.com/watch?v=3NKqq20W538",
        thumbnail: "https://img.youtube.com/vi/3NKqq20W538/hqdefault.jpg",
      },
      {
        title: "Financial Stress & Mental Health - Source: Dr. Greg Jantz",
        link: "https://www.youtube.com/watch?v=tc5xG7or648",
        thumbnail: "https://img.youtube.com/vi/tc5xG7or648/hqdefault.jpg",
      },
      {
        title: "Money and Mental Health - Source: Dr. Thomas Richardson",
        link: "https://www.youtube.com/watch?v=LbNX1YTh_6s",
        thumbnail: "https://img.youtube.com/vi/LbNX1YTh_6s/hqdefault.jpg",
      },
      {
        title: "Mental Health in the Workplace - Source: Professional Guide",
        link: "https://www.youtube.com/watch?v=w32o0bYUaWI",
        thumbnail: "https://img.youtube.com/vi/w32o0bYUaWI/hqdefault.jpg",
      },
      {
        title: "Professional Mental Health Support - Source: Expert Panel",
        link: "https://www.youtube.com/watch?v=CZGYdsuTLkk",
        thumbnail: "https://img.youtube.com/vi/CZGYdsuTLkk/hqdefault.jpg",
      },
    ],
  },
  {
    category: "Substance Addiction",
    items: [
      {
        title: "Understanding Substance Addiction and Mental Health",
        link: "https://www.youtube.com/watch?v=A5V8eMw9x1I",
        thumbnail: "https://img.youtube.com/vi/A5V8eMw9x1I/maxresdefault.jpg",
      },
      {
        title:
          "Lessons from a Sexologist: How to Have Better Sex and Relationships",
        link: "https://www.youtube.com/watch?v=mgKCD22iNXQ",
        thumbnail: "https://img.youtube.com/vi/mgKCD22iNXQ/maxresdefault.jpg",
      },
      {
        title: "All About Women's Sexual Desire",
        link: "https://www.youtube.com/watch?v=F1VDjccTliY",
        thumbnail: "https://img.youtube.com/vi/F1VDjccTliY/maxresdefault.jpg",
      },
      {
        title: "How to Have Better Sex in Midlife",
        link: "https://www.youtube.com/watch?v=vJPk3ElwOX8",
        thumbnail: "https://img.youtube.com/vi/vJPk3ElwOX8/maxresdefault.jpg",
      },
      {
        title: "Male & Female Sexual Problems?",
        link: "https://www.youtube.com/watch?v=hRLnOHAVWA8",
        thumbnail: "https://img.youtube.com/vi/hRLnOHAVWA8/maxresdefault.jpg",
      },
      {
        title: "Sex, Energy & Mental Health: Why Soul Ties Matter",
        link: "https://www.youtube.com/watch?v=kZUuI2gJC0Y",
        thumbnail: "https://img.youtube.com/vi/kZUuI2gJC0Y/maxresdefault.jpg",
      },
      {
        title: "#1 Sex Therapist: How to Have Better Sex | Kate Moyle",
        link: "https://www.youtube.com/watch?v=9IsrhG6Gf-E",
        thumbnail: "https://img.youtube.com/vi/9IsrhG6Gf-E/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Sleep",
    items: [
      {
        title: "Sleep and Sleep Disorders",
        link: "https://www.youtube.com/watch?v=3h_AwmM6SxA",
        thumbnail: "https://img.youtube.com/vi/3h_AwmM6SxA/maxresdefault.jpg",
      },
      {
        title: "Insomnia Explained Clearly",
        link: "https://www.youtube.com/watch?v=vdc8JonEax8",
        thumbnail: "https://img.youtube.com/vi/vdc8JonEax8/maxresdefault.jpg",
      },
      {
        title: "Sleep Disorders (Psychiatry)",
        link: "https://www.youtube.com/watch?v=tr7qqeeGMgE",
        thumbnail: "https://img.youtube.com/vi/tr7qqeeGMgE/maxresdefault.jpg",
      },
      {
        title: "Narcolepsy (NORD)",
        link: "https://www.youtube.com/watch?v=UMxMatGeL44",
        thumbnail: "https://img.youtube.com/vi/UMxMatGeL44/maxresdefault.jpg",
      },
      {
        title: "Sleep Disorders | APA",
        link: "https://www.youtube.com/watch?v=GgtLqMxaOww",
        thumbnail: "https://img.youtube.com/vi/GgtLqMxaOww/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Social Mental Health",
    items: [
      {
        title: "We All Have Mental Health",
        link: "https://www.youtube.com/watch?v=DxIDKZHW3-E",
        thumbnail: "https://img.youtube.com/vi/DxIDKZHW3-E/maxresdefault.jpg",
      },
      {
        title: "Mental Health and Social Media",
        link: "https://www.youtube.com/watch?v=-QDjx_spkwI",
        thumbnail: "https://img.youtube.com/vi/-QDjx_spkwI/maxresdefault.jpg",
      },
      {
        title: "Mental Health Triggers of Social Media",
        link: "https://www.pbslearningmedia.org/resource/mht-hips-social-media-video/student-mental-health-matters/",
        thumbnail: null,
      },
      {
        title: "Mental Health Awareness PSA: Social Media Video",
        link: "https://www.samhsa.gov/resource/988/mental-health-awareness-psa-social-media-video",
        thumbnail: null,
      },
      {
        title:
          "Why Social Health Is Key to Happiness and Longevity | Kasley Killam",
        link: "https://www.youtube.com/watch?v=LpSDuDIaBGk",
        thumbnail: "https://img.youtube.com/vi/LpSDuDIaBGk/maxresdefault.jpg",
      },
      {
        title: "Mental Health: What it is and why it matters | CBC Kids News",
        link: "https://www.youtube.com/watch?v=WnxKSD6F4Sw",
        thumbnail: "https://img.youtube.com/vi/WnxKSD6F4Sw/maxresdefault.jpg",
      },
      {
        title: "What is Mental Health?",
        link: "https://www.youtube.com/watch?v=G0zJGDokyWQ",
        thumbnail: "https://img.youtube.com/vi/G0zJGDokyWQ/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Internet and Social Media Issue Issue",
    items: [
      {
        title: "TED-Ed: Animated educational videos on tech and global issues",
        link: "https://www.youtube.com/user/TEDEducation",
        thumbnail: null,
      },
      {
        title: "Veritasium: Scientific insights and tech explanations",
        link: "https://www.youtube.com/user/1veritasium",
        thumbnail: null,
      },
      {
        title:
          "The Infographics Show: Animated videos on internet-related issues",
        link: "https://www.youtube.com/user/TheInfographicsShow",
        thumbnail: null,
      },
      {
        title: "Cleo Abram – Huge If True series on tech and internet",
        link: "https://www.youtube.com/c/CleoAbram",
        thumbnail: null,
      },
      {
        title: "National Academies: Social Media and Adolescent Health Study",
        link: "https://nap.nationalacademies.org/catalog/27188/social-media-and-adolescent-health",
        thumbnail: null,
      },
      {
        title: "Mental Health and Social Media",
        link: "https://www.youtube.com/watch?v=-QDjx_spkwI",
        thumbnail: "https://img.youtube.com/vi/-QDjx_spkwI/maxresdefault.jpg",
      },
      {
        title: "The Dangers of Social Media and Online Posting",
        link: "https://www.youtube.com/watch?v=7UKObKBOn2s",
        thumbnail: "https://img.youtube.com/vi/7UKObKBOn2s/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Anger Management",
    items: [
      {
        title: "Treating the Angry Client: 5 Anger Management Techniques",
        link: "https://www.youtube.com/watch?v=BII-q7mIJoQ",
        thumbnail: "https://img.youtube.com/vi/BII-q7mIJoQ/maxresdefault.jpg",
      },
      {
        title: "Anger Management – CBT Workshop",
        link: "https://www.youtube.com/watch?v=k1Oz9yvWU4A",
        thumbnail: "https://img.youtube.com/vi/k1Oz9yvWU4A/maxresdefault.jpg",
      },
      {
        title: "CBT for Anger Management",
        link: "https://www.youtube.com/watch?v=hxZS50WhhBI",
        thumbnail: "https://img.youtube.com/vi/hxZS50WhhBI/maxresdefault.jpg",
      },
      {
        title: "Psychologist On How To Deal With / Control / Manage Anger",
        link: "https://www.youtube.com/watch?v=hbSxsRdjosI",
        thumbnail: "https://img.youtube.com/vi/hbSxsRdjosI/maxresdefault.jpg",
      },
      {
        title: "Anger Management: 10 Session Cognitive Behavioral Protocol",
        link: "https://www.youtube.com/watch?v=fN4w4UWVZUg",
        thumbnail: "https://img.youtube.com/vi/fN4w4UWVZUg/maxresdefault.jpg",
      },
    ],
  },
  {
    category: "Youngster Issues",
    items: [
      {
        title: "Youth Justice Legal Centre (YJLC) Explainer Videos",
        link: "https://www.yjlc.uk/resources/explainer-videos",
        thumbnail: null,
      },
      {
        title: "YouTube's Principled Approach for Children and Teenagers",
        link: "https://www.youtube.com/howyoutubeworks/our-commitments/protecting-kids/",
        thumbnail: null,
      },
      {
        title: "TED Talk: The Nightmare Videos of Children's YouTube",
        link: "https://www.ted.com/talks/james_bridle_the_nightmare_videos_of_children_s_youtube_and_what_s_wrong_with_the_internet_today",
        thumbnail: null,
      },
      {
        title: "The Magic of Medical Animation | Cincinnati Children's",
        link: "https://www.youtube.com/watch?v=GyP46Dl5Nqo",
        thumbnail: "https://img.youtube.com/vi/GyP46Dl5Nqo/maxresdefault.jpg",
      },
    ],
  },
];

export default function MindfulPlaylist() {
  // Convert raw data into a shape the grid understands
  const playlists = playlistData.map((category, index) => {
    // Pick *first* non-null thumbnail in the folder for the grid cover
    const firstThumbnail =
      category.items.find((item) => item.thumbnail)?.thumbnail || null;
    return {
      id: String(index + 1), // e.g. "1", "2"
      title: category.category, // folder label
      imageUrl: firstThumbnail, // cover thumb or placeholder
      items: category.items, // pass full list to the modal
    };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
    items: {
      title: string;
      link: string;
      thumbnail: string | null;
    }[];
  } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#AB47BC" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Content Space</Text>

      <View style={styles.panel}>
        {/* -------- Folder grid -------- */}
        <View style={styles.grid}>
          {playlists.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.block,
                pressed && { opacity: 0.7 },
              ]}
              android_ripple={{ color: "#e0e0e0" }}
              onPress={() => {
                setSelectedCategory(item);
                setModalVisible(true);
              }}
            >
              <VideoThumbnail
                uri={item.imageUrl as string | null}
                style={styles.thumbnail}
              />
              <Text style={styles.label}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      {/* -------- Modal: shows video list for selected folder -------- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedCategory?.title || ""}
            </Text>
            <ScrollView>
              {selectedCategory?.items.map((it, idx) => (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [
                    styles.modalItem,
                    pressed && { opacity: 0.6 },
                  ]}
                  android_ripple={{ color: "#d0d0d0" }}
                  onPress={() => Linking.openURL(it.link)}
                >
                  <VideoThumbnail uri={it.thumbnail} />
                  <Text style={styles.modalItemText}>{it.title}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 32,
    alignItems: "center",
  },
  wrapper: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#4A4A4A",
    marginBottom: 12,
  },
  panel: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  block: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  thumbnail: {
    width: 110,
    height: 70,
    resizeMode: "cover",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4A4A4A",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    marginBottom: 12,
    textAlign: "center",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modalThumbnail: {
    width: 80,
    height: 50,
    resizeMode: "cover",
    borderRadius: 6,
    marginRight: 10,
  },
  modalItemText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4A4A4A",
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#AB47BC",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#CB6C46";
const tintColorDark = "#F09161";

export const Colors = {
  light: {
    text: "#2B395E",
    background: "#E4E1FE",
    tint: tintColorLight,
    icon: "#2B395E",
    tabIconDefault: "#2B395E",
    tabIconSelected: tintColorLight,
    primary: "#CB6C46",
    secondary: "#F09161",
    accent: "#2B395E",
    card: "#FFFFFF",
  },
  dark: {
    text: "#ECEDEE",
    background: "#2B395E",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#F09161",
    secondary: "#CB6C46",
    accent: "#E4E1FE",
    card: "#FFFFFF",
  },
};

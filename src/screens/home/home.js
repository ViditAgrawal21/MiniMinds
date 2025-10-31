import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../context/themeContext';
import { Header } from '../../components';
import CustomButton from '../../components/common/CustomButton';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    // Add logout logic here
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Home"
        showBackButton={false}
        rightIcon={
          <Text style={styles.menuButton}>⚙️</Text>
        }
        onRightPress={() => navigation.navigate('Settings')}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Minimimds</Text>
          <Text style={styles.welcomeSubtitle}>
            Your mental health and wellness companion
          </Text>
        </View>

        <View style={styles.actionSection}>
          <CustomButton
            label="View Profile"
            callback={handleNavigateToProfile}
            style={styles.actionButton}
          />
          
          <CustomButton
            label="Settings"
            callback={() => navigation.navigate('Settings')}
            variant="outline"
            style={styles.actionButton}
          />
          
          <CustomButton
            label="Logout"
            callback={handleLogout}
            variant="outline"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionSection: {
    marginTop: 30,
  },
  actionButton: {
    marginBottom: 15,
  },
  menuButton: {
    fontSize: 20,
  },
});

export default HomeScreen;

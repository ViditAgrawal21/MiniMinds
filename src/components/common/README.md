# Button Components

This directory contains React Native button components built with core components (TouchableOpacity) instead of external libraries.

## Components

### 1. PrimaryButton

A simple, styled button component using React Native core components with a filled purple background.

#### Props

```typescript
type Props = {
  label: string;           // Button text
  callback: () => void;    // Function to call when button is pressed
  style?: ViewStyle;       // Custom styles for the button container
  textStyle?: TextStyle;   // Custom styles for the button text
  disabled?: boolean;      // Disable button interaction
};
```

#### Usage

```tsx
import { PrimaryButton } from '@/components';

<PrimaryButton
  label="Click Me"
  callback={() => console.log('Button pressed!')}
  disabled={false}
/>
```

### 2. SecondaryButton

An outline-style button component with white background and purple border.

#### Props

```typescript
type Props = {
  label: string;           // Button text
  callback: () => void;    // Function to call when button is pressed
  customStyle?: ViewStyle; // Custom styles for the button container
  textStyle?: TextStyle;   // Custom styles for the button text
  disabled?: boolean;      // Disable button interaction
};
```

#### Usage

```tsx
import { SecondaryButton } from '@/components';

<SecondaryButton
  label="Secondary Action"
  callback={() => console.log('Secondary button pressed!')}
  disabled={false}
/>
```

### 3. CustomButton (Enhanced)

A more versatile button component with multiple variants and states.

#### Props

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type Props = {
  label: string;
  callback: () => void;
  variant?: ButtonVariant;  // Button style variant
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;        // Show loading state
  fullWidth?: boolean;      // Make button full width
};
```

#### Variants

- **primary**: Purple background with white text (default)
- **secondary**: Gray background with white text
- **outline**: Transparent background with purple border and text
- **ghost**: Transparent background with purple text

#### Usage

```tsx
import { PrimaryButton, SecondaryButton, EnhancedCustomButton } from '@/components';

// Primary button (filled)
<PrimaryButton
  label="Primary Action"
  callback={() => {}}
/>

// Secondary button (outline)
<SecondaryButton
  label="Secondary Action"
  callback={() => {}}
/>

// Enhanced button variants
<EnhancedCustomButton
  label="Primary Button"
  callback={() => {}}
/>

<EnhancedCustomButton
  label="Secondary Button"
  variant="secondary"
  callback={() => {}}
/>

<EnhancedCustomButton
  label="Outline Button"
  variant="outline"
  callback={() => {}}
/>

<EnhancedCustomButton
  label="Ghost Button"
  variant="ghost"
  callback={() => {}}
/>

// Disabled buttons
<PrimaryButton
  label="Disabled Primary"
  disabled={true}
  callback={() => {}}
/>

<SecondaryButton
  label="Disabled Secondary"
  disabled={true}
  callback={() => {}}
/>

// Loading button
<EnhancedCustomButton
  label="Loading Button"
  loading={true}
  callback={() => {}}
/>

// Full width button
<EnhancedCustomButton
  label="Full Width Button"
  fullWidth={true}
  callback={() => {}}
/>
```

## Features

### React Native Core Components
- Uses `TouchableOpacity` for better performance and customization
- No external dependencies required
- Consistent with React Native design patterns

### Accessibility
- Proper disabled states
- TouchableOpacity provides built-in accessibility features
- Customizable activeOpacity for touch feedback

### Styling
- Responsive design using screen dimensions
- Shadow/elevation effects for better visual depth
- Customizable through style props
- Support for custom text styles

### States
- **Normal**: Default interactive state
- **Disabled**: Non-interactive state with visual feedback
- **Loading**: Shows loading text and prevents interaction
- **Active**: Touch feedback with opacity change

## Customization

### Custom Styles

```tsx
const customButtonStyle = {
  backgroundColor: '#FF6B6B',
  borderRadius: 20,
  width: 200,
};

const customTextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
};

<PrimaryButton
  label="Custom Button"
  callback={() => {}}
  style={customButtonStyle}
  textStyle={customTextStyle}
/>
```

### Theme Integration

You can easily integrate these buttons with your app's theme system:

```tsx
import { useTheme } from '@/context/themeContext';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <EnhancedCustomButton
      label="Themed Button"
      callback={() => {}}
      style={{ backgroundColor: theme.colors.primary }}
      textStyle={{ color: theme.colors.onPrimary }}
    />
  );
};
```

## Best Practices

1. **Use appropriate variants**: Choose the right variant based on the button's importance and context
2. **Provide feedback**: Always handle loading and disabled states appropriately
3. **Consistent sizing**: Use the default sizing or create consistent custom sizes
4. **Accessibility**: Ensure proper contrast ratios and touch target sizes
5. **Error handling**: Handle callback errors gracefully

## Migration from react-native-paper

If you're migrating from react-native-paper Button:

```tsx
// Before (react-native-paper)
import { Button } from 'react-native-paper';

<Button mode="contained" onPress={() => {}}>
  Click me
</Button>

// After (Custom components)
import { PrimaryButton } from '@/components';

<PrimaryButton
  label="Click me"
  callback={() => {}}
/>
```

## Performance Benefits

- **Smaller bundle size**: No external library dependencies
- **Better tree shaking**: Only import what you need
- **Native performance**: Uses React Native core components
- **Custom optimization**: Tailored to your app's specific needs

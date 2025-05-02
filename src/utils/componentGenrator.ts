import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native-web';
import { Component } from '../types';

interface UIComponent {
  jsx: React.ReactNode;
  code: string;
}

export function generateUIComponent(type: string, elements: string[], styles: any): UIComponent {
  switch (type) {
    case 'login':
      return generateLoginComponent(styles);
    case 'signup':
      return generateSignupComponent(styles);
    case 'profile':
      return generateProfileComponent(styles);
    default:
      return generateDefaultComponent(styles);
  }
}

function generateLoginComponent(styles: any): UIComponent {
  const jsx = (``
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );

  const code = `import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(${JSON.stringify(styles, null, 2)});`;

  return { jsx, code };
}

function generateSignupComponent(styles: any): UIComponent {
  const jsx = (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  const code = `import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(${JSON.stringify(styles, null, 2)});`;

  return { jsx, code };
}

function generateProfileComponent(styles: any): UIComponent {
  const jsx = (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
        />
        <Text style={styles.title}>John Doe</Text>
        <Text style={styles.subtitle}>Software Developer</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.subtitle, { marginBottom: 8 }]}>About</Text>
        <Text>Passionate developer with expertise in React Native and TypeScript.</Text>
      </View>
    </View>
  );

  const code = `import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
        />
        <Text style={styles.title}>John Doe</Text>
        <Text style={styles.subtitle}>Software Developer</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.subtitle, { marginBottom: 8 }]}>About</Text>
        <Text>Passionate developer with expertise in React Native and TypeScript.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(${JSON.stringify(styles, null, 2)});`;

  return { jsx, code };
}

function generateDefaultComponent(styles: any): UIComponent {
  const jsx = (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a prompt to generate UI</Text>
    </View>
  );

  const code = '// Enter a prompt to generate component code';

  return { jsx, code };
}
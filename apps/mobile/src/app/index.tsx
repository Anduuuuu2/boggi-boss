import { TASK_STATUSES } from '@boggi/shared';
import { StyleSheet, Text, View } from 'react-native';

// BB-011 scaffold: proves the app boots and consumes @boggi/shared.
// Real screens arrive with BB-023/BB-024.
export default function Index() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Boggi Boss
      </Text>
      <Text style={styles.body}>Tu vida tiene un equipo.</Text>
      <Text style={styles.meta}>Estados de tarea del contrato: {TASK_STATUSES.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF8EF', padding: 16 },
  title: { fontSize: 32, fontWeight: '800', color: '#1C1B22' },
  body: { fontSize: 16, color: '#1C1B22', marginTop: 8 },
  meta: { fontSize: 13, color: '#4F4A57', marginTop: 16 },
});

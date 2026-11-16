import { Stack } from 'expo-router';
import { color } from '@/constants/theme';

export default function SectionLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.bgBase } }} />;
}

import React, { useId } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Pattern, Polygon, Rect, Stop, Text as SvgText } from 'react-native-svg';
import { color, editorial, font, gradient as gradients, GradientName, type } from '@/constants/theme';
import { Txt } from './Txt';

/* Couche éditoriale manga (planche 04b) : texte géant en contour, trame, diagonales. */

interface PosterTextProps {
  text: string;
  size?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/** Mot géant en Anton, en contour. Décoratif : masqué aux lecteurs d'écran. */
export function PosterText({ text, size = 96, stroke = editorial.posterStroke, fill = 'none', strokeWidth = 2, style }: PosterTextProps) {
  const upper = text.toUpperCase();
  const width = Math.ceil(upper.length * size * 0.52) + strokeWidth * 2 + 8;
  const height = Math.ceil(size * 1.1);
  return (
    <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={style}>
      <Svg width={width} height={height}>
        <SvgText
          x={strokeWidth}
          y={size * 0.95}
          fontFamily={font.poster}
          fontSize={size}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        >
          {upper}
        </SvgText>
      </Svg>
    </View>
  );
}

interface DotsProps {
  size?: number;
  dotColor?: string;
  style?: StyleProp<ViewStyle>;
}

/** Trame de points façon impression manga. */
export function Dots({ size = editorial.dotsSize, dotColor = editorial.dotsColor, style }: DotsProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id={`dots${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
            <Circle cx={size / 2} cy={size / 2} r={1.3} fill={dotColor} />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#dots${id})`} />
      </Svg>
    </View>
  );
}

interface DiagonalProps {
  /** Points du polygone en pourcentage (x,y), par ex. "0,0 72,0 44,100 0,100". */
  points?: string;
  gradient?: GradientName | readonly string[];
  angle?: 'vertical' | 'diagonal';
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}

/** Aplat coupé en diagonale, rempli d'un dégradé de la charte. */
export function Diagonal({ points = '0,0 72,0 44,100 0,100', gradient = 'flame', angle = 'diagonal', opacity = 1, style }: DiagonalProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const stops = (typeof gradient === 'string' ? gradients[gradient as GradientName] : gradient) as readonly string[];
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          <SvgGradient id={`g${id}`} x1="0" y1="0" x2={angle === 'diagonal' ? '1' : '0'} y2="1">
            {stops.map((c, i) => (
              <Stop key={c + i} offset={stops.length === 1 ? 0 : i / (stops.length - 1)} stopColor={c} />
            ))}
          </SvgGradient>
        </Defs>
        <Polygon points={points} fill={`url(#g${id})`} opacity={opacity} />
      </Svg>
    </View>
  );
}

interface SpeedLinesProps {
  /** Point de fuite en pourcentage (0 à 100) d'où partent les traits. */
  cx?: number;
  cy?: number;
  color?: string;
  count?: number;
  /** Épaisseur angulaire des traits (0 à 1 du créneau). */
  thickness?: number;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}

/** Lignes de vitesse / concentration façon case d'action manga. Décoratif. */
export function SpeedLines({ cx = 50, cy = 50, color: c = 'rgba(0,0,0,0.22)', count = 40, thickness = 0.4, opacity = 1, style }: SpeedLinesProps) {
  const R = 220;
  const wedges: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const half = ((Math.PI * 2) / count) * thickness * 0.5;
    const x1 = cx + Math.cos(a - half) * R;
    const y1 = cy + Math.sin(a - half) * R;
    const x2 = cx + Math.cos(a + half) * R;
    const y2 = cy + Math.sin(a + half) * R;
    wedges.push(`${cx},${cy} ${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`);
  }
  return (
    <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[StyleSheet.absoluteFill, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {wedges.map((p, i) => (
          <Polygon key={i} points={p} fill={c} opacity={opacity} />
        ))}
      </Svg>
    </View>
  );
}

interface KickerProps {
  /** Accent japonais (katakana/kanji), rendu dans la police système. */
  jp?: string;
  /** Libellé latin en petites capitales. */
  label?: string;
  tone?: string;
  style?: StyleProp<ViewStyle>;
}

/** Sur-titre éditorial manga : trait + accent japonais + libellé en capitales. */
export function Kicker({ jp, label, tone = color.primary, style }: KickerProps) {
  return (
    <View style={[kickerStyles.row, style]}>
      <View style={[kickerStyles.tick, { backgroundColor: tone }]} />
      {jp ? <Txt style={[kickerStyles.jp, { color: tone }]}>{jp}</Txt> : null}
      {label ? <Txt style={[type.micro as object, kickerStyles.label, { color: tone }]}>{label}</Txt> : null}
    </View>
  );
}

const kickerStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  tick: { width: 16, height: 3, transform: [{ skewX: '-30deg' }] },
  jp: { fontSize: 13, lineHeight: 15, letterSpacing: 1, fontWeight: '800' },
  label: { letterSpacing: 1.8 },
});

interface CornerTicksProps {
  tint?: string;
  size?: number;
  inset?: number;
}

/** Repères d'angle (haut gauche, bas droite). */
export function CornerTicks({ tint = '#FFC933', size = 14, inset = 10 }: CornerTicksProps) {
  return (
    <>
      <View pointerEvents="none" style={{ position: 'absolute', left: inset, top: inset, width: size, height: size, borderColor: tint, borderTopWidth: 3, borderLeftWidth: 3 }} />
      <View pointerEvents="none" style={{ position: 'absolute', right: inset, bottom: inset, width: size, height: size, borderColor: tint, borderBottomWidth: 3, borderRightWidth: 3 }} />
    </>
  );
}

import { Card, CardContent, Fade, Grow, Slide } from '@mui/material';
import type { CardProps } from '@mui/material';
import type { ReactNode } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';

interface AnimatedCardProps extends Omit<CardProps, 'children'> {
  children: ReactNode;
  animationType?: 'fade' | 'grow' | 'slide';
  delay?: number;
}

export default function AnimatedCard({ 
  children, 
  animationType = 'fade', 
  delay = 0,
  ...cardProps 
}: AnimatedCardProps) {
  const { animationsEnabled } = useAccessibilityStore();

  const cardContent = (
    <Card {...cardProps}>
      <CardContent>{children}</CardContent>
    </Card>
  );

  if (!animationsEnabled) {
    return cardContent;
  }

  switch (animationType) {
    case 'grow':
      return (
        <Grow in timeout={300 + delay}>
          {cardContent}
        </Grow>
      );
    case 'slide':
      return (
        <Slide direction="up" in timeout={300 + delay}>
          {cardContent}
        </Slide>
      );
    case 'fade':
    default:
      return (
        <Fade in timeout={300 + delay}>
          {cardContent}
        </Fade>
      );
  }
}

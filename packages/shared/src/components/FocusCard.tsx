import { Box, Card, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { useAnimations } from '../hooks/useAnimations';
import { useSpacing } from '../hooks/useSpacing';

interface FocusCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  defaultExpanded?: boolean;
  variant?: 'outlined' | 'elevation';
}

// Armazena o estado de expansão de cada card globalmente
const expandedStates: Record<string, boolean> = {};

export default function FocusCard({
  title,
  children,
  icon,
  variant = 'outlined'
}: FocusCardProps) {
  const cardKey = `focus-card-${title}`;
  const [expanded, setExpanded] = useState(() => expandedStates[cardKey] ?? false);

  // Atualiza o estado global sempre que o local mudar
  useEffect(() => {
    expandedStates[cardKey] = expanded;
  }, [expanded, cardKey]);

  const mode = useThemeStore((state) => state.mode);
  const animations = useAnimations();
  const spacing = useSpacing();

  return (
    <Card
      variant={variant}
      sx={{
        mb: `${1 * spacing.multiplier}rem`,
        backgroundColor: mode === 'dark' ? '#050505' : undefined,
        ...animations.slideUp,
        ...animations.cardHover,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: expanded ? 2 : 0,
            userSelect: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon}
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            aria-label={expanded ? 'Recolher' : 'Expandir'}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto">
          {children}
        </Collapse>
      </CardContent>
    </Card>
  );
}

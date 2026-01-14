import { Box, Card, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { useThemeStore } from '../store/themeStore';

interface FocusCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  defaultExpanded?: boolean;
  variant?: 'outlined' | 'elevation';
}

export default function FocusCard({ 
  title, 
  children, 
  icon, 
  defaultExpanded = false,
  variant = 'outlined'
}: FocusCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { complexityLevel, detailedMode } = useAccessibilityStore();
  const mode = useThemeStore((state) => state.mode);

  // Em modo simples, sempre expandido
  const isExpanded = complexityLevel === 'simple' || detailedMode ? true : expanded;

  return (
    <Card 
      variant={variant}
      sx={{ 
        mb: 1,
        transition: 'all 0.3s ease',
        backgroundColor: mode === 'dark' ? '#050505' : undefined,
        '&:hover': {
          boxShadow: 3,
        }
      }}
    >
      <CardContent sx={{ cursor: complexityLevel !== 'simple' && !detailedMode ? 'pointer' : 'default' }} onClick={() => complexityLevel !== 'simple' && !detailedMode && setExpanded(!expanded)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: isExpanded ? 2 : 0,
            userSelect: 'none',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon}
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          </Box>
          {complexityLevel !== 'simple' && !detailedMode && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              size="small"
              aria-label={expanded ? 'Recolher' : 'Expandir'}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>
        <Collapse in={isExpanded} timeout="auto">
          {children}
        </Collapse>
      </CardContent>
    </Card>
  );
}

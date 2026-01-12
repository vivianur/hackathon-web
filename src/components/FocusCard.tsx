import { Box, Card, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';

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

  // Em modo simples, sempre expandido
  const isExpanded = complexityLevel === 'simple' || detailedMode ? true : expanded;

  return (
    <Card 
      variant={variant}
      sx={{ 
        mb: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 3,
        }
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: isExpanded ? 2 : 0,
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
              onClick={() => setExpanded(!expanded)}
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

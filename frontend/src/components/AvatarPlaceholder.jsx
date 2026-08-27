import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { useMemo } from 'react';

const THEME_COLORS = {
  oscuro: { background: ['141714'], textColor: ['4AE28C'] },
  claro:  { background: ['F4F0E6'], textColor: ['1B1A15'] },
};

const AvatarPlaceholder = ({ theme }) => {
  const colors = THEME_COLORS[theme] ?? THEME_COLORS.oscuro;

  const svgString = useMemo(() => (
    createAvatar(initials, {
      seed: 'WL',
      scale: 50,
      radius: 50,
      backgroundType: ['solid'],
      backgroundColor: colors.background,
      textColor: colors.textColor,
    }).toString()
  ), [colors]);

  return (
    <div
      className="hero-img avatar-placeholder"
      aria-label="Avatar de Wilker Lopez"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

export default AvatarPlaceholder;

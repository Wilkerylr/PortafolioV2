import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { useMemo } from 'react';

const THEME_COLORS = {
  oscuro: { background: ['1C2333'], textColor: ['38BDF8'] },
  claro:  { background: ['EEF2FF'], textColor: ['4F46E5'] },
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

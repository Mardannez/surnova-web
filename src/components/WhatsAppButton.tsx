'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(false);
  const WA_NUMBER = '50499999999';
  const WA_MESSAGE = encodeURIComponent('Hola SURNOVA, quiero información sobre sus productos.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {tooltip && (
        <div className="bg-primary text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg max-w-[180px] text-center animate-slide-in-right">
          ¿Consultas? ¡Escríbenos!
        </div>
      )}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/30 hover:scale-110 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <Icon name="ChatBubbleLeftRightIcon" size={26} />
      </a>
    </div>
  );
}
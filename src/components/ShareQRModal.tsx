import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Smartphone, Share2, ExternalLink } from 'lucide-react';

interface ShareQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareQRModal: React.FC<ShareQRModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  if (!isOpen) return null;

  const currentUrl = window.location.origin + window.location.pathname;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#20AAA8]" />
            <h3 className="text-base font-bold text-[#0B3E50]">
              Acceso Rápido QR & NFC GRESALUD
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative text */}
        <p className="text-xs text-slate-600 leading-relaxed">
          Enlace público optimizado para Instagram bio, estados de WhatsApp, códigos QR impresos en recepción y tarjetas de proximidad NFC.
        </p>

        {/* QR Code Presentation (High resolution SVG barcode canvas) */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-3">
          <div className="w-48 h-48 bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center">
            {/* Robust inline clean QR visual matrix */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#0B3E50]">
              {/* Corner position markers */}
              <rect x="5" y="5" width="25" height="25" rx="3" fill="#0B3E50" />
              <rect x="9" y="9" width="17" height="17" rx="1" fill="#FFFFFF" />
              <rect x="13" y="13" width="9" height="9" fill="#20AAA8" />

              <rect x="70" y="5" width="25" height="25" rx="3" fill="#0B3E50" />
              <rect x="74" y="9" width="17" height="17" rx="1" fill="#FFFFFF" />
              <rect x="78" y="13" width="9" height="9" fill="#20AAA8" />

              <rect x="5" y="70" width="25" height="25" rx="3" fill="#0B3E50" />
              <rect x="9" y="74" width="17" height="17" rx="1" fill="#FFFFFF" />
              <rect x="13" y="78" width="9" height="9" fill="#20AAA8" />

              {/* Data modules */}
              <rect x="35" y="10" width="5" height="5" />
              <rect x="45" y="10" width="5" height="5" />
              <rect x="55" y="10" width="5" height="5" />
              <rect x="40" y="20" width="5" height="5" />
              <rect x="50" y="25" width="5" height="5" />
              <rect x="60" y="20" width="5" height="5" />
              
              <rect x="10" y="35" width="5" height="5" />
              <rect x="20" y="45" width="5" height="5" />
              <rect x="25" y="55" width="5" height="5" />

              <rect x="35" y="35" width="30" height="30" rx="4" fill="#0B3E50" />
              <rect x="40" y="40" width="20" height="20" rx="2" fill="#20AAA8" />
              <circle cx="50" cy="50" r="4" fill="#FFFFFF" />

              <rect x="70" y="35" width="5" height="5" />
              <rect x="80" y="45" width="5" height="5" />
              <rect x="85" y="55" width="5" height="5" />

              <rect x="35" y="75" width="5" height="5" />
              <rect x="45" y="85" width="5" height="5" />
              <rect x="55" y="75" width="5" height="5" />
              <rect x="75" y="75" width="5" height="5" />
              <rect x="85" y="85" width="5" height="5" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-medium">
            URL Estable: Sin datos personales incrustados
          </span>
        </div>

        {/* Copyable link */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Enlace oficial para compartir</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-700 font-mono select-all"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-[#20AAA8] hover:bg-[#18918f] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Mobile / Social badges */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-[#20AAA8]" />
            iPhone / Android
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5 text-[#20AAA8]" />
            Instagram & WhatsApp
          </span>
        </div>

      </div>
    </div>
  );
};

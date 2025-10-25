import React, { useEffect, useRef, useState } from 'react'
import { Bot, Sparkles } from 'lucide-react'
import avatarNoaImage from '../assets/noa-avatar.png'

interface NoaAnimatedAvatarProps {
  isSpeaking: boolean
  isListening: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showStatus?: boolean
}

const NoaAnimatedAvatar: React.FC<NoaAnimatedAvatarProps> = ({
  isSpeaking,
  isListening,
  size = 'lg',
  showStatus = true
}) => {
  const avatarRef = useRef<HTMLDivElement>(null)
  const [isLipSyncActive, setIsLipSyncActive] = useState(false)
  const [pulseIntensity, setPulseIntensity] = useState(1)

  // Tamanhos do avatar
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  }

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  // Animação de movimentação labial
  useEffect(() => {
    if (isSpeaking && avatarRef.current) {
      setIsLipSyncActive(true)
      const interval = setInterval(() => {
        if (avatarRef.current) {
          // Animação de escala para simular movimentação labial
          setPulseIntensity(1.05)
          setTimeout(() => {
            setPulseIntensity(1)
          }, 150)
        }
      }, 300)
      
      return () => {
        clearInterval(interval)
        setIsLipSyncActive(false)
        setPulseIntensity(1)
      }
    } else {
      setIsLipSyncActive(false)
      setPulseIntensity(1)
    }
  }, [isSpeaking])

  // Animação de escuta
  useEffect(() => {
    if (isListening && avatarRef.current) {
      const interval = setInterval(() => {
        setPulseIntensity(1.02)
        setTimeout(() => {
          setPulseIntensity(1)
        }, 200)
      }, 400)
      
      return () => {
        clearInterval(interval)
        setPulseIntensity(1)
      }
    }
  }, [isListening])

  return (
    <div className="relative">
      {/* Avatar Container */}
      <div 
        ref={avatarRef}
        className={`${sizeClasses[size]} mx-auto rounded-full overflow-hidden border-4 transition-all duration-300 ${
          isLipSyncActive ? 'animate-pulse' : ''
        }`}
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          border: '4px solid transparent',
          backgroundImage: 'linear-gradient(135deg, #8b5cf6, #ec4899), linear-gradient(135deg, #8b5cf6, #ec4899)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
          transform: `scale(${pulseIntensity})`
        }}
      >
        {/* Avatar Content - Usando imagem real da Nôa */}
        <div className="w-full h-full flex items-center justify-center relative">
          <img 
            src={avatarNoaImage} 
            alt="Nôa Esperança" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback para ícone se a imagem não carregar
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <svg class="${iconSizes[size]} text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              `
            }}
          />
          
          {/* Overlay com efeito de brilho quando falando */}
          {isSpeaking && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm">
              <Sparkles className={`${iconSizes[size]} text-white/50 animate-pulse`} />
            </div>
          )}
        </div>
      </div>
      
      {/* Status Indicator */}
      {showStatus && (
        <div className="absolute top-4 right-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
            isListening ? 'bg-green-500 text-white' : 
            isSpeaking ? 'bg-blue-500 text-white' : 
            'bg-slate-600 text-slate-300'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isListening ? 'bg-green-300 animate-pulse' : 
              isSpeaking ? 'bg-blue-300 animate-pulse' : 
              'bg-slate-400'
            }`} />
            <span>
              {isListening ? 'Ouvindo' : 
               isSpeaking ? 'Falando' : 
               'Pronta'}
            </span>
          </div>
        </div>
      )}

      {/* Efeitos de Partículas */}
      {isSpeaking && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NoaAnimatedAvatar

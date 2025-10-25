import { LifeAdvice as LifeAdviceType } from '@/types/weather';

interface LifeAdviceProps {
  advices: LifeAdviceType[];
}

export default function LifeAdvice({ advices }: LifeAdviceProps) {
  if (!advices || advices.length === 0) {
    return null;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'good':
        return 'bg-green-500/20 border-green-400/30';
      case 'moderate':
        return 'bg-yellow-500/20 border-yellow-400/30';
      case 'poor':
        return 'bg-red-500/20 border-red-400/30';
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-4">生活建议</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advices.map((advice) => (
          <div
            key={advice.type}
            className={`${getLevelColor(
              advice.level
            )} border rounded-xl p-4 hover:scale-105 transition-transform`}
          >
            {/* 图标和标题 */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{advice.icon}</span>
              <h4 className="text-white font-semibold text-lg">
                {advice.title}
              </h4>
            </div>

            {/* 建议内容 */}
            <p className="text-white/80 text-sm leading-relaxed">
              {advice.advice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

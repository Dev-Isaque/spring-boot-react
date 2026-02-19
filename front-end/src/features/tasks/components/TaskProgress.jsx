import { useTaskProgress } from "../hooks/useTaskProgress";

export function TaskProgress({ taskId, size = "default", showLabel = false }) {
  const { progress, loading, error } = useTaskProgress(taskId);

  const radius = size === "hero" ? 32 : size === "large" ? 20 : 12;
  const svgSize = size === "hero" ? 80 : size === "large" ? 48 : 28;
  const strokeWidth = size === "hero" ? 4 : size === "large" ? 3.5 : 2;
  const fontSize = size === "hero" ? 14 : size === "large" ? 10 : 7;
  const textOffset = size === "hero" ? 8 : size === "large" ? 6 : 3;

  if (!taskId) return null;
  if (loading || error) return null;
  if (!progress) return null;

  const total = progress.totalItems ?? 0;
  const completed = progress.completedItems ?? 0;
  const percentage = Math.min(
    100,
    Math.max(0, Number(progress.percentage) || 0),
  );

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (size === "hero") {
    return (
      <div className="task-progress-circle hero">
        <div
          className="progress-circle"
          style={{
            "--percentage": percentage,
            "--primary-color": "var(--primary-color)",
            "--secondary-color": "rgba(255,255,255,0.1)",
          }}
        >
          <span>{percentage}%</span>
        </div>

        <div className="progress-info">
          {showLabel && <span className="progress-label">PROGRESSO</span>}
          <span className="progress-count">
            {completed} de {total} concluídas
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-progress-circle ${size}`}>
      <div className="progress-circle-wrapper">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
        >
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />

          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
            style={{
              transition: "stroke-dashoffset 0.3s ease",
            }}
          />

          <text
            x={svgSize / 2}
            y={svgSize / 2 + textOffset}
            textAnchor="middle"
            fontSize={fontSize}
            fill="var(--primary-color)"
            fontWeight="bold"
          >
            {percentage}%
          </text>
        </svg>
      </div>

      <span className="progress-count">
        {completed}/{total}
      </span>
    </div>
  );
}

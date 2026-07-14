interface ProfileProgressProps {
  completion: number;
}

export default function ProfileProgress({
  completion,
}: ProfileProgressProps) {
  return (
    <div className="progress-box">
      <h3>📊 Profile Completion</h3>

      <progress
        className="progress-bar"
        value={completion}
        max={100}
      />

      <p className="progress-text">
        {completion}% Complete
      </p>
    </div>
  );
}
import ProgressCard from "../components/ProgressCard.jsx";

const fallbackProgress = {
  questionsAsked: 18,
  quizzesCompleted: 4,
  averageScore: "76%",
  learningStreak: "5 days"
};

const subjectPerformance = [
  { subject: "Science", value: 82 },
  { subject: "Mathematics", value: 74 },
  { subject: "English", value: 68 },
  { subject: "Social Science", value: 71 }
];

const recentActivity = [
  "Asked 3 questions in Life Processes",
  "Completed Science quiz",
  "Reviewed Real Numbers notes"
];

export default function Progress() {
  const stored = localStorage.getItem("pathshala-progress");
  const progress = stored ? { ...fallbackProgress, ...JSON.parse(stored) } : fallbackProgress;

  return (
    <section className="progress-page section" aria-labelledby="progress-title">
      <div className="section-heading">
        <p className="eyebrow">Progress</p>
        <h1 id="progress-title">Progress Dashboard</h1>
        <p>Demo learning stats are shown locally. No backend or database is connected.</p>
      </div>

      <div className="progress-grid">
        <ProgressCard label="Questions Asked" value={progress.questionsAsked} helper="Tutor practice" />
        <ProgressCard label="Quizzes Completed" value={progress.quizzesCompleted} helper="Local quiz attempts" />
        <ProgressCard label="Average Score" value={progress.averageScore} helper="Across demo quizzes" />
        <ProgressCard label="Learning Streak" value={progress.learningStreak} helper="Consistent study" />
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <h2>Subject performance</h2>
          {subjectPerformance.map((item) => (
            <div className="performance-row" key={item.subject}>
              <span>{item.subject}</span>
              <div className="progress-bar" aria-label={`${item.subject} ${item.value}%`}>
                <span style={{ width: `${item.value}%` }}></span>
              </div>
              <strong>{item.value}%</strong>
            </div>
          ))}
        </section>

        <section className="dashboard-card">
          <h2>Recent activity</h2>
          <ul className="clean-list">
            {recentActivity.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </section>

        <section className="dashboard-card">
          <h2>Learning goals</h2>
          <ul className="clean-list">
            <li>Ask 5 chapter questions this week.</li>
            <li>Complete 2 quizzes with 80% or more.</li>
            <li>Revise one notes chapter daily.</li>
          </ul>
        </section>

        <section className="dashboard-card offline-progress">
          <h2>Offline Progress</h2>
          <p>Progress is ready to be stored locally on the device. Cloud sync is not used.</p>
        </section>
      </div>
    </section>
  );
}

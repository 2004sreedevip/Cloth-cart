export default function ProfileSection({ user }) {
  return (
    <div className="page-section">
      <div className="section-header">
        <h2 className="section-title">Profile</h2>
      </div>
      <div className="profile-card">
        <div className="profile-avatar">{(user.name || "U")[0].toUpperCase()}</div>
        <h3 className="profile-name">{user.name || "User"}</h3>
        <div className="profile-fields">
          {[
            ["Email", user.email],
            ["Mobile", user.mobile],
            ["Gender", user.gender],
            ["Age", user.age],
          ]
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <div key={label} className="profile-row">
                <span className="profile-label">{label}</span>
                <span className="profile-value">{value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

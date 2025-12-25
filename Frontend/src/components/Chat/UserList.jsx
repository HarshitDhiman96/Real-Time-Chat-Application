import './Chat.css';

const UserList = ({ users, currentUser }) => {
  // Sort users to show current user first, then others alphabetically
  const sortedUsers = [...users].sort((a, b) => {
    if (a === currentUser) return -1;
    if (b === currentUser) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="user-list">
      {sortedUsers.length === 0 ? (
        <div className="no-users">No users online</div>
      ) : (
        sortedUsers.map((user, index) => (
          <div
            key={`${user}-${index}`}
            className={`user-item ${user === currentUser ? 'current-user' : ''}`}
          >
            <div className="user-avatar">
              {user.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user}</span>
              {user === currentUser && (
                <span className="user-badge-small">You</span>
              )}
            </div>
            <div className="user-status online"></div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;


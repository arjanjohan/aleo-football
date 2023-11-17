// key is username, value is id in mapping (key of the mapping)
// const usersSchema = z.record(z.number());

export const getUsers = () => {
  const unparsed = localStorage.getItem("users");
  if (!unparsed) return {};

  //   const users = usersSchema.parse(JSON.parse(unparsed));

  //   return users;
  return {};
};

export const getUserMappingId = (username) => {
  const users = getUsers();

  const userId = users[username];

  if (userId) return userId;

  const latestId = localStorage.getItem("id");
  const id = latestId ? parseInt(latestId) : 1;
  localStorage.setItem("id", `${id + 1}`);

  const newUsers = {
    ...users,
    [username]: id,
  };

  localStorage.setItem("users", JSON.stringify(newUsers));

  return id;
};

export const storeLeaderboard = (leaderboard) => {
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
};

export const getLeaderboard = () => {
  const unparsed = localStorage.getItem("leaderboard");
  if (!unparsed) return;

  return JSON.parse(unparsed);
};

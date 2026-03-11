const KEY = "unit8_progress";

export const initProgress = () => {
  if (!localStorage.getItem(KEY)) {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        stations: {
          listening: "in-progress",
          speaking: "locked",
          reading: "locked",
          writing: "locked",
          grammar: "locked",
        },
        badges: [],
      })
    );
  }
};

export const getProgress = () => {
  return JSON.parse(localStorage.getItem(KEY));
};

export const saveProgress = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const unlockStation = (id) => {
  const data = getProgress();
  if (data) {
    data.stations[id] = "in-progress";
    saveProgress(data);
  }
};

export const completeStation = (id) => {
  const data = getProgress();
  if (data) {
    data.stations[id] = "completed";
    if (!data.badges.includes(id)) data.badges.push(id);
    saveProgress(data);
  }
};

export function getBadges() {
  const data = getProgress();
  return data?.badges || [];
}
export const nestComments = (flat) => {
  const map = {};
  const roots = [];
  flat?.forEach((c) => (map[c._id] = { ...c, children: [] }));
  flat?.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.children.push(map[c._id]);
    } else {
      roots.push(map[c._id]);
    }
  });
  return roots;
};

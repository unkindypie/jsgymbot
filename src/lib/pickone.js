// picks one random string

module.exports = (strings) => {
  const index = ((Math.random() * 1000) ^ 0) % strings.length;
  return strings[index];
};

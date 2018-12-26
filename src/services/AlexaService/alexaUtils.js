export const extractFirstResolvedValue = (resolutions) => {
  if (resolutions && resolutions.resolutionsPerAuthority) {
    const [resolutionPerAuthority] = resolutions.resolutionsPerAuthority;

    if (resolutionPerAuthority.values && resolutionPerAuthority.values.length) {
      const { value } = resolutionPerAuthority.values[0];
      return value;
    }
  }
  return null;
};

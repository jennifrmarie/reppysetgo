   export const getWorkoutsForDate = (items=[], date) => (
      (!date)
        ? items
        : items.filter(item => item.date === date)
    )
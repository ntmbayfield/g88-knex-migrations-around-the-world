exports.seed = knex => {
  return knex('architects_landmarks').del()
    .then(() => {
      return knex('architects_landmarks').insert([
        { architect_id: 1, landmark_id: 1 },
        { architect_id: 2, landmark_id: 2 },
        { architect_id: 3, landmark_id: 3 },
        { architect_id: 4, landmark_id: 5 },
        { architect_id: 5, landmark_id: 5 },
        { architect_id: 6, landmark_id: 4 },
        { architect_id: 7, landmark_id: 4 },
      ])
    })
}

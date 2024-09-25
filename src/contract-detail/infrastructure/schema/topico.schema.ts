
export const topicoSchema = {
  type: {
    chip: {
      hasIncluded: Boolean,
      executed: Boolean,
      date: Date,
      description: String,
      observation: String,
      doctorProvince: String,
      user: String,
    },
    chipReview: {
      executed: Boolean,
      date: Date,
      description: String,
      observation: String,
      doctorProvince: String,
      user: String,
    },
    vaccination: {
      hasIncluded: Boolean,
      executed: Boolean,
      date: Date,
      description: String,
      observation: String,
      doctorProvince: String,
      user: String,
    },
    rabiesVaccination: {
      hasIncluded: Boolean,
      executed: Boolean,
      date: Date,
      description: String,
      observation: String,
      doctorProvince: String,
      user: String,
    },
    rabiesReVaccination: {
      hasIncluded: Boolean,
      executed: Boolean,
      date: Date,
      description: String,
      observation: String,
      doctorProvince: String,
      user: String,
    },
    takingSampleSerologicalTest: {
      hasIncluded: Boolean,
      executed: Boolean,
      date: Date,
      description: String,
      observation: String,
      typeSample: String,
      doctorProvince: String,
      user: String,
    },
    status: String
  },
  required: false,
};


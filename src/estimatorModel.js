import mongoose from 'mongoose';

const estimatorSchema = mongoose.Schema({
  region:
    {
      name: String,
      avgAge: Number,
      avgDailyIncomeInUSD: Number,
      avgDailyIncomePopulation: Number
    },
  periodType: {
    type: String,
    required: true
  },
  timeToElapse: Number,
  reportedCases: Number,
  population: Number,
  totalHospitalBeds: Number,
  is_active: { type: Boolean, default: false },
  is_verified: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false }
},
{ timestamps: true });

module.exports = mongoose.model('Estimator', estimatorSchema);

import mongoose from 'mongoose';

const DiagnosisSchema = new mongoose.Schema({
  income: {
    type: Number,
  },
  expenses: {
    type: Number,
  },
  recommendations: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{
  timestamps: true,
});

const Diagnosis = mongoose.model('Diagnosis', DiagnosisSchema);

export default Diagnosis;
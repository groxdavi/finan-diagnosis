import Diagnosis from "../../models/Diagnosis.js";

// Function to generate financial recommendations
function generateFinancialPlan(income, expenses) {
  const savings = income - expenses;
  const savingsRate = (savings / income) * 100;
  const essentialExpensesRate = (expenses / income) * 100;
  const recommendedEmergencyFund = income * 3; // Tres meses de ingresos como fondo de emergencia recomendado
  const discretionarySpending = expenses > income * 0.7;

  let recommendations = [];

  // Ahorro
  if (savings <= 0) {
    recommendations.push("Estás gastando más de lo que ganas. Reduce tus gastos inmediatamente.");
  } else if (savingsRate < 20) {
    recommendations.push("Intenta incrementar tu tasa de ahorro a al menos un 20% de tus ingresos.");
  } else {
    recommendations.push("¡Buen trabajo! Estás ahorrando bien. Considera invertir parte de tus ahorros.");
  }

  // Fondo de emergencia
  if (savings < recommendedEmergencyFund) {
    recommendations.push(
      `Establece un fondo de emergencia equivalente a al menos tres meses de tus ingresos (${recommendedEmergencyFund.toFixed(2)}).`
    );
  } else {
    recommendations.push("Ya tienes un buen fondo de emergencia. ¡Sigue así!");
  }

  // Gastos esenciales
  if (essentialExpensesRate > 50) {
    recommendations.push(
      "Tus gastos esenciales superan el 50% de tus ingresos. Evalúa reducir gastos fijos como renta o servicios."
    );
  } else {
    recommendations.push("Tus gastos esenciales están bajo control.");
  }

  // Gastos discrecionales
  if (discretionarySpending) {
    recommendations.push(
      "Estás destinando más del 70% de tus ingresos a gastos. Considera ajustar tu estilo de vida para equilibrar mejor tus finanzas."
    );
  }

  // Inversiones
  if (savings > 0) {
    recommendations.push(
      "Explora opciones de inversión como fondos indexados, certificados de depósito o bienes raíces para hacer crecer tu patrimonio."
    );
  }

  // Deudas
  if (expenses > income * 0.8) {
    recommendations.push(
      "Pareces tener una carga financiera elevada. Revisa tus deudas y prioriza pagar aquellas con tasas de interés altas."
    );
  }

  // Objetivos financieros
  recommendations.push(
    "Establece objetivos financieros claros: comprar una casa, pagar deudas, o ahorrar para la jubilación."
  );

  // Educación financiera
  recommendations.push(
    "Considere tomar cursos de educación financiera para aprender más sobre cómo administrar mejor su dinero."
  );

  // Suscripciones y gastos pequeños
  recommendations.push(
    "Revisa tus suscripciones y elimina aquellas que no estés utilizando regularmente."
  );

  // Ajuste mensual
  recommendations.push(
    "Cada mes, revisa tus gastos y ajusta tu presupuesto para reflejar tus prioridades financieras."
  );

  return recommendations;
}

// Create a new diagnosis
export const createDiagnosis = async (req, res) => {
  try {
    const { income, expenses } = req.body;

    // Generate recommendations
    const recommendations = generateFinancialPlan(income, expenses);

    // Create and save the diagnosis
    const newDiagnosis = new Diagnosis({
      income,
      expenses,
      recommendations: recommendations.join(' '), // Join recommendations into a single string
      user: req.user._id,
    });

    const diagnosisSave = await newDiagnosis.save();
    res.status(201).json(diagnosisSave);
  } catch (error) {
    console.error('Error creating diagnosis:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get diagnostic history for a user
export const getDiagnosticHistory = async (req, res) => {
  try {
    const history = await Diagnosis.find({ user: req.user._id });
    res.json(history);
  } catch (error) {
    console.error('Error fetching diagnostic history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Eliminar una tarea
export const deleteDiagnosis = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const diagnosis = await Diagnosis.findById(id);

    if (!diagnosis) {
      res.status(404).json({ message: "diagnosis not found!" });
    }

    // check if the user is the owner of the task
    if (!diagnosis.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await Diagnosis.findByIdAndDelete(id);

    return res.status(200).json({ message: "diagnosis deleted successfully!" });
  } catch (error) {
    console.log("Error in delete diagnosis: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

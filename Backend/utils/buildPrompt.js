function buildPrompt(logType, logs, query = null) {
  const instruction = {
    crop: "You are an agricultural expert analyzing crop records. Provide insights, detect issues, and suggest improvements.",
    soil: "You are a soil scientist. Analyze soil health trends, pH balance, moisture, and give soil care suggestions.",
    irrigation: "You are an irrigation expert. Check for overwatering/underwatering trends and recommend schedules.",
    pest: "You are a pest control advisor. Identify pest patterns, assess threat levels, and suggest solutions.",
    economic: "You are a farm economist. Analyze input costs, outputs, profits and suggest ways to optimize costs and improve profits.",
    custom: "You are an agricultural assistant. Review the user's custom notes and provide helpful observations or summaries.",
    overall: "You are a smart assistant reviewing all farming data (crop, soil, pest, irrigation, economic, and custom logs). Give a comprehensive report with strengths, weaknesses, and suggestions."
  };

  const logDataFormatted = logs.map((log, i) => `Log ${i + 1}: ${JSON.stringify(log, null, 2)}`).join("\n\n");

  return `
${instruction[logType]}

${query ? `User question: ${query}\n\n` : "Give a general analysis based on the following logs:\n\n"}

${logDataFormatted}
  `.trim();
}

module.exports = buildPrompt;

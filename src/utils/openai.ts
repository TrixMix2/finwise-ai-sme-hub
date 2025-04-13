
// OpenAI API integration for financial analysis

/**
 * Makes requests to the OpenAI API for financial analysis
 */
export const analyzeFinancialData = async (
  prompt: string, 
  apiKey: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a financial analysis assistant specialized in tax compliance and bookkeeping. Provide concise, accurate financial insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing financial data:', error);
    return 'Unable to analyze data at this time. Please try again later.';
  }
};

export const analyzeTaxDeductions = async (
  expenses: { category: string; amount: number }[],
  apiKey: string
): Promise<{ deductions: { category: string; amount: number; confidence: number }[]; summary: string }> => {
  try {
    const expensesText = expenses.map(e => `${e.category}: $${e.amount.toFixed(2)}`).join('\n');
    const prompt = `Analyze these business expenses and identify which ones are likely tax deductible:\n${expensesText}\n\nFor each deductible expense, provide a confidence score (0-100) and explain why it might be deductible.`;
    
    const analysisText = await analyzeFinancialData(prompt, apiKey);
    
    // This is a simplified parsing logic - in a real app you would need more robust parsing
    const deductions = expenses.map(expense => ({
      category: expense.category,
      amount: expense.amount,
      confidence: Math.floor(Math.random() * 30) + 70 // Mock confidence score between 70-100
    }));
    
    return {
      deductions,
      summary: analysisText
    };
  } catch (error) {
    console.error('Error analyzing tax deductions:', error);
    return {
      deductions: [],
      summary: 'Unable to analyze deductions at this time.'
    };
  }
};

export const analyzeFinancialDocument = async (
  documentText: string,
  apiKey: string
): Promise<{
  documentType: string;
  entities: { name: string; value: string }[];
  summary: string;
}> => {
  try {
    const prompt = `Analyze this financial document text and extract key information:\n\n${documentText}\n\nIdentify the document type, extract key entities (like dates, amounts, account numbers, etc.), and provide a brief summary.`;
    
    const analysisText = await analyzeFinancialData(prompt, apiKey);
    
    // In a real implementation, you would parse the AI response more carefully
    return {
      documentType: 'Invoice', // Mock data
      entities: [
        { name: 'Date', value: '2025-04-10' },
        { name: 'Amount', value: '$1,250.00' },
        { name: 'Vendor', value: 'Office Supplies Co.' }
      ],
      summary: analysisText
    };
  } catch (error) {
    console.error('Error analyzing document:', error);
    return {
      documentType: 'Unknown',
      entities: [],
      summary: 'Unable to analyze document at this time.'
    };
  }
};

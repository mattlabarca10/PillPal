// api.js

/**
 * Fetch data from the backend and process the response.
 * @param inputText The text input to send as a query to the backend.
 * @returns {Promise<string>} A promise that resolves to the response text content.
 */
async function fetchData(inputText) {
    try {
      const response = await fetch('http://localhost:3007/google/generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data && data.response && data.response.candidates && data.response.candidates.length > 0 &&
        data.response.candidates[0].content && data.response.candidates[0].content.parts &&
        data.response.candidates[0].content.parts.length > 0 && data.response.candidates[0].content.parts[0].text) {
        
        return data.response.candidates[0].content.parts[0].text;
  
      } else {
        console.error("Invalid or missing text content in response", data);
        return "Invalid or missing text content in response";
      }
    } catch (error) {
      console.error("ERROR: ", error);
      return `ERROR: ${error}`;
    }
  }
  
export { fetchData };
  
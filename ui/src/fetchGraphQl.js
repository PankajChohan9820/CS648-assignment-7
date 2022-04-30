 /* eslint linebreak-style: ["error", "windows"] */
 export default async function fetchGraphQl(query, variables = {}) {
   console.log(query);
    try {
      const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
      const result = await response.json();
      console.log(result);
      if (result.errors) {
        const error = result.errors[0];
        alert('Error while quering for data - ', error);
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
      return null;
    }
  }
  
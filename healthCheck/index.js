
document.getElementById('health-check-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const answers = [];

  // Loop through each question
  for (let i = 1; i <= 10; i++) { // Adjust the range if you have more/less questions
      const radios = document.getElementsByName('question' + i);
      for (const radio of radios) {
          if (radio.checked) {
              answers.push(radio.value);
              break; // Exit loop after finding the checked radio button for this question
          }
      }
  }

  // Function to find the most chosen letter
  function findMostChosenLetter(answers) {
      const counts = { A: 0, B: 0, C: 0, D: 0 };

      // Count the occurrences of each letter
      answers.forEach(answer => {
          if (counts.hasOwnProperty(answer)) {
              counts[answer]++;
          }
      });

      // Determine the most chosen letter
      let mostChosenLetter = null;
      let maxCount = 0;

      for (const letter in counts) {
          if (counts[letter] > maxCount) {
              maxCount = counts[letter];
              mostChosenLetter = letter;
          }
      }

      return mostChosenLetter;
  }

  // Object to map each letter to a corresponding result message with detailed advice
  const resultMessages = {
      A: "You should focus more on maintaining a balanced and healthy lifestyle. Consider the following advice:\n" +
         "1. Incorporate more fruits and vegetables into your diet.\n" +
         "2. Aim for at least 30 minutes of moderate exercise most days of the week.\n" +
         "3. Try to get 7-8 hours of sleep each night.\n" +
         "4. Stay hydrated by drinking at least 8 glasses of water daily.\n" +
         "5. Practice stress management techniques such as meditation or yoga.",
      B: "You're doing okay, but there is room for improvement. Here are some tips to enhance your health:\n" +
         "1. Increase your daily intake of fruits and vegetables.\n" +
         "2. Engage in regular physical activity, aiming for at least 150 minutes of moderate exercise per week.\n" +
         "3. Ensure you get enough restful sleep each night.\n" +
         "4. Drink sufficient water to stay hydrated throughout the day.\n" +
         "5. Find effective ways to manage stress, such as through hobbies or socializing.",
      C: "You're maintaining a good balance in your health habits. Keep up the good work with the following advice:\n" +
         "1. Continue to eat a balanced diet rich in fruits, vegetables, and whole grains.\n" +
         "2. Maintain a regular exercise routine.\n" +
         "3. Prioritize sleep and make sure to get enough rest each night.\n" +
         "4. Keep hydrated by drinking plenty of water.\n" +
         "5. Continue practicing stress management techniques that work for you.",
      D: "Excellent! You have a great approach to maintaining your health. To continue your good habits:\n" +
         "1. Keep up your balanced and nutritious diet.\n" +
         "2. Continue with your regular exercise regimen.\n" +
         "3. Maintain your healthy sleep patterns.\n" +
         "4. Stay hydrated and keep drinking enough water.\n" +
         "5. Keep managing stress effectively through your preferred methods."
  };

  const mostChosenLetter = findMostChosenLetter(answers);
  const resultMessage = resultMessages[mostChosenLetter];
  
  // Split the result message into sentences
  const sentences = resultMessage.split('\n');
  
  // Display each sentence in a new <p> element
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // Clear previous results
  sentences.forEach(sentence => {
      const p = document.createElement('p');
      p.textContent = sentence;
      resultDiv.appendChild(p);
  });
});

  
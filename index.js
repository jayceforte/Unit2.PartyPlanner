document.addEventListener('DOMContentLoaded', async () => {
    const partyForm = document.getElementById('partyForm');
    const partyList = document.getElementById('partyList');
  
    // Fetch party data from  API and render 
    try {
      const response = await fetch('https://fsa-async-await.herokuapp.com/api/workshop/parties');
      const data = await response.json();
      renderPartyList(data);
    } catch (error) {
      console.log(error);
    }
  
    //  form submission
    partyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const location = document.getElementById('location').value;
      const description = document.getElementById('description').value;
  
      // Create  new party object
      const newParty = {
        name,
        date,
        time,
        location,
        description
      };
  
      // Send a POST request to add  new party
      try {
        const response = await fetch('https://fsa-async-await.herokuapp.com/api/workshop/parties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newParty)
        });
        const data = await response.json();
  
        // Add the newest/recent party to the list
        renderParty(data);
  
        // Clear the  inputs
        partyForm.reset();
      } catch (error) {
        console.log(error);
      }
    });
  
    // Handle the party deletion
    partyList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('delete-button')) {
        const partyId = event.target.dataset.partyId;
  
        try {
          await fetch(`https://fsa-async-await.herokuapp.com/api/workshop/parties/${partyId}`, {
            method: 'DELETE'
          });
  
          event.target.parentElement.remove();
        } catch (error) {
          console.log(error);
        }
      }
    });
  
    function renderPartyList(parties) {
      parties.forEach(party => {
        renderParty(party);
      });
    }
  
    function renderParty(party) {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${party.name}</strong><br>
        Date: ${party.date}<br>
        Time: ${party.time}<br>
        Location: ${party.location}<br>
        Description: ${party.description}<br>
        <button class="delete-button" data-party-id="${party.id}">Delete</button>
      `;
      partyList.appendChild(li);
    }
  });
  
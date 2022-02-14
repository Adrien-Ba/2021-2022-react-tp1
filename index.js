import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

app.post('/', async (req, res) => {
  return {
    "foxPicture": await getFox(),
    "catFacts": await getChat(),
    "holidays": await getHolidays(req.body?.countryCode ?? "FR"),
  };
});

// Only used for dev server, do not remove
app.head('/', () => ({ ping: 'pong' }));

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();


//REQUETES

async function getChat() {
  try {
    return await axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3').then(
      function(response) {
        return response.data.map(element => element.text)
      }
    )
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getFox() {
  try {
    return await axios.get('https://randomfox.ca/floof/').then(
      function(response) {
        return response.data.link
      }
    )
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getHolidays(country) {
  try {
    return await axios.get('https://date.nager.at/api/v3/publicholidays/2022/' + country).then(
      function(response) {
        return response.data
      }
    )
  } catch (error) {
    console.error(error);
    return null;
  }
}




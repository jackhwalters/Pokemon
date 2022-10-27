const express = require('express');
const axios = require('axios');
const router = express();
const FormData = require('form-data');


// Endpoint for Endpoint 1
router.get("/:pokemonName", async (req, res) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.pokemonName}`)
        .then(response => {
            // Check if response is defined for attribute, if not assign attribute as "undefined"
            const name = ('name' in response.data) ? response.data.name : "undefined";
            const description = ('flavor_text_entries' in response.data) ? response.data.flavor_text_entries[0].flavor_text : "undefined";
            const habitat = ('habitat.name' in response.data) ? response.data.habitat.name : "undefined";
            const isLegendary = ('is_legendary' in response.data) ? response.data.is_legendary : "undefined";

            // Return a 200 response with a JSON of the Pokemon information
            res.status(200).json({
                name: name,
                description: description,
                habitat: habitat,
                isLegendary: isLegendary
            });
        })
        .catch(error => {
            // Simplistic error returning - verbosity depends on where this API will be used
            if (error.response) {
                res.status(error.response.status).json({
                    message: `Error: ${error.response.statusText}`
                });
            }
            else if (error.request) {
                res.status(400).json({
                    message: `Error: ${error.request}`
                });
            }
            else {
                res.status(500).json({
                    message: "An unknown error has occured"
                });
            }
        });
});

// Endpoint for Endpoint 2
router.get("/translated/:pokemonName", async (req, res) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.pokemonName}`)
        .then(async (pokeResponse) => {
            // Check if response is defined for attribute, if not assign attribute as "undefined"
            const name = ('name' in pokeResponse.data) ? pokeResponse.data.name : "undefined";
            var description = ('flavor_text_entries' in pokeResponse.data) ? pokeResponse.data.flavor_text_entries[0].flavor_text : "undefined";
            const habitat = ('habitat.name' in pokeResponse.data) ? pokeResponse.data.habitat.name : "undefined";
            const isLegendary = ('is_legendary' in pokeResponse.data) ? pokeResponse.data.is_legendary : "undefined";

            try {
                if (description !== "undefined") {
                    var bodyFormData = new FormData();
                    bodyFormData.append('text', description);
                    var language;

                    if (habitat === "cave" || isLegendary == true) {
                        language = "yoda";
                    }
                    else {
                        language = "shakespeare"
                    }

                    const translateResponse = await axios.post(`https://api.funtranslations.com/translate/${language}.json`, bodyFormData);
                    description = translateResponse.data.contents.translated;
                }
            }
            catch(error) {
                console.error("Translate Error: ", ('response' in error) ? error.response.statusText : error);
            }
            finally {
                res.status(200).json({
                    name: name,
                    description: description,
                    habitat: habitat,
                    isLegendary: isLegendary
                });
            }
        })
        .catch(error => {
            // Simplistic error returning - verbosity depends on where this API will be used
            if (error.response) {
                res.status(error.response.status).json({
                    message: `Error: ${error.response.statusText}`
                });
            }
            else if (error.request) {
                res.status(400).json({
                    message: `Error: ${error.request}`
                });
            }
            else {
                res.status(500).json({
                    message: "An unknown error has occured"
                });
            }
        });
});

module.exports = router; // Enable exporting of routes
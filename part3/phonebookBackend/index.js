require("dotenv").config();
//#region Imports
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");
//#endregion

//#region Launch configuration
const app = express();

morgan.token("jsonData", (req) => {
  if (Object.keys(req.body).length === 0) {
    return null;
  } else {
    return JSON.stringify(req.body);
  }
});

//#endregion

app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.jsonData(req, res),
    ].join(" ");
  })
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const info = `Phonebook has info for ${Person.length} persons`;
  const date = `${new Date()}`;
  response.send(`<p>${info}</p> <p>${date}</p>`);
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      console.log(`deleted ${person.name} from DB`);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  Person.findOne({ name: body.name })
    .then((person) => {
      if (person) {
        return response.status(400).json({
          error: "name already exists, must be unique",
        });
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        });

        person.save().then((savedPerson) => {
          response.json(savedPerson);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put("/api/persons/:id", (request, reponse) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      reponse.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

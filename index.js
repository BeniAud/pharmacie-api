const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //activer la possibilite les parametres de types body

const drugs = [
  { id: 1, name: "DOLIPRANE", quantity: 0 },
  { id: 5, name: "IMODIUM", quantity: 0 },
  { id: 10, name: "SPEDIFEN", quantity: 0 },
  { id: 6, name: "KARDEGIC", quantity: 0 },
  { id: 7, name: "SPASFON", quantity: 0 },
  { id: 8, name: "ISIMIG", quantity: 0 },
  { id: 3, name: "DAFALGAN", quantity: 0 },
  { id: 4, name: "LEVOTHYROX", quantity: 0 },
  { id: 2, name: "EFFERALGAN", quantity: 0 },
  { id: 9, name: "TAHOR", quantity: 0 }
];

//-------------------GET--------------------------------------//
//Service Web pour obtenir l'état de l'inventaire method//
app.get("/drugs/", function(req, res) {
  res.json(drugs);
});

//----------------------POST----------------------------------//
//Service Web pour ajouter dans l'inventaire methode//----------------------------

app.post("/drugs/add", function(req, res) {
  //Pour afficher les données reçues :
  console.log(req.body);

  const newDrugs = req.body.quantity;
  for (let i = 0; i < drugs.length; i++) {
    if (drugs[i].id === req.body.id) {
      drugs[i].quantity = newDrugs + drugs[i].quantity;

      return res.json(drugs);
    }
  }

  res.status(400).json({
    error: {
      message: "Bad request"
    }
  });

  //drugs.push(newDrugs);
});
//Service Web pour retirer de l'inventaire//---------------------------------

app.post("/drugs/remove", function(req, res) {
  //Pour afficher les données reçues :
  console.log(req.body);

  const newDrugs = req.body.quantity;
  for (let i = 0; i < drugs.length; i++) {
    if (drugs[i].id === req.body.id) {
      //----Gestion des erreurs---//
      if (drugs[i].quantity < newDrugs) {
        return res.status(400).json({
          error: {
            message: "Invalid quantity"
          }
        });
      } else {
        drugs[i].quantity = drugs[i].quantity - newDrugs;
        return res.json(drugs);
      }
    }
  }
  //----Gestion des erreurs---//
  res.status(400).json({
    error: {
      message: "Bad request"
    }
  });

  //drugs.push(newDrugs);
});

//----Gestion des erreurs----------------------------------------------------------------------//

// if (req.body.id != drugs[i].id) {
//   res.status(400).json({
//     error: {
//       message: "Bad request"
//     }
//   });

// }if (drugs[i].quantity < drugs[i].quantity ) {
//   res.status(400).json({
//     error: {
//       message: "Invalid quantity"
//     }
//   });
// }

//Créer un service pour ajouter un nouveau médicament et lui attribuer automatiquement un ID//
//------------------------------------------------------------------------------------------//
let count = 11;

app.post("/drugs/newProduct", function(req, res) {
  drugs.push({
    id: count,
    name: req.body.name,
    quantity: req.body.quantity
  });
  count++;
  res.json(drugs);
});

//-------------Créer un service pour modifier le nom d'un médicament-------------------------//

app.post("/drugs/changeName", function(req, res) {
  //Pour afficher les données reçues :
  console.log(req.body);

  const newName = req.body.name;
  for (let i = 0; i < drugs.length; i++) {
    if (drugs[i].id === req.body.id) {
      drugs[i].name = newName;
      res.json(drugs);
    }
  }
});

//Conserver un historique de chacune des modifications de l'inventaire. Vous devrez donc sauvegarder aussi la date //
//-------------------------------------------------------------------------------------//

//----------------------------Créer un service pour afficher l'historique--------------  //

//---------------------------------------------------------------------------------------------//
app.listen(3000, function() {
  console.log("Server started");
});

// cle : valeur
// history.push({ date:  ${name}});

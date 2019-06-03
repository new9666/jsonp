/**
 * Created by he on 2019/5/30.
 */
let express = require('../node-vue-moba/server/node_modules/express/index');
let cors = require('../node-vue-moba/server/node_modules/cors/lib/index')

let app = express();
// app.use(cors());

app.get('/api/users', (req, res) => {

  let callback = req.query.callback;
  let data = [
    {
      name: "Jack",
      age: 15,
      sex: 0
    },
    {
      name: "Amy",
      age: 18,
      sex: 1
    },
    {
      name: "Pany",
      age: 20,
      sex: 1
    }
  ]

  let dataStr = JSON.stringify(data);



  if (callback) {
    console.log("Callback: ", callback);
    let jsStr = `${callback}( ${dataStr} );`;
    return res.status(200).send(jsStr);
  }

  res.send(dataStr);


});



app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
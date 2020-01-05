const mongoose = require("mongoose");
const db = require("../models");
const _ = require("lodash");
const color = require("colors");
const moment = require("moment");
const bCrypt = require("bcrypt-nodejs");

const generateHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

//User
module.exports.getUser = (req, res) => {
  db.User.find({})
    .populate("statement")
    .sort([["createdAt", -1]])
    .populate("activity")
    .sort([["createdAt", -1]])
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.signupAdmin = (req, res) => {
  let data = _.pick(req.body, ["username", "password", "group"]);
  data.password = generateHash(data.password);
  db.User.create(data)
    .then(dbUser => {
      res.json({ message: "Success added!" });
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.updateUser = (req, res) => {
  let data = _.pick(req.body, ["password", "group"]);
  let username = _.pick(req.body, ["username"]);
  data.password = generateHash(data.password);
  db.User.findOneAndUpdate(
    { username: username.username },
    {
      $set: {
        password: data.password,
        group: data.group
      }
    }
  )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.deleteUser = (req, res) => {
  let data = req.params.username;
  db.User
    .findOneAndDelete({username: data})
    .then(dbUser => {
      res.json({message: "y"});
    })
    .catch(err => {
      console.log(err);
    });
}

//Activity
module.exports.newActivity = (req, res) => {
  let data = _.pick(req.body, [
    "username",
    "deposit",
    "totalBalance",
    "approval"
  ]);
  db.User.findOne({ username: data.username })
    .then(dbUser => {
      db.Activity.create(data)
        .then(dbActivity => {
          return db.User.findOneAndUpdate(
            { _id: dbUser.id },
            { $push: { activity: dbActivity._id } },
            { new: true }
          );
        })
        .then(dbActivity => {
          res.json(dbActivity);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.getActivity0 = (req, res) => {
  db.Activity.find({})
    .then(dbActivity => {
      res.json(dbActivity);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.getActivity1 = (req, res) => {
  let user = req.params.user;
  db.Activity.findOne({ username: user })
    .then(dbActivity => {
      res.json(dbActivity);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.updateActivity0 = (req, res) => {
  let data = _.pick(req.body, ["username", "balance", "deposit", "approval"]);
  console.log(data);
  db.Activity.findOneAndUpdate(
    { username: data.username },
    {
      $set: {
        totalBalance: data.balance,
        approval: data.approval,
        deposit: data.deposit,
        updatedAt0: moment()
      }
    }
  )
    .then(dbActivity => {
      res.json(dbActivity);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.updateActivity1 = (req, res) => {
  let data = _.pick(req.body, ["username", "deposit", "totalBalance"]);
  console.log(moment.now());
  db.Activity.findOneAndUpdate(
    { username: data.username },
    {
      $set: {
        deposit: data.deposit,
        totalBalance: data.totalBalance,
        updatedAt: moment(),
        approval: "Pending"
      }
    }
  )
    .then(dbActivity => {
      res.json(dbActivity);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.approveActivity = (req, res) => {
  let data = _.pick(req.body, ["username", "approval"]);
  db.Activity.findOneAndUpdate(
    { username: data.username },
    { $set: { approval: data.approval } }
  )
    .then(dbActivity => {
      res.json(dbActivity);
    })
    .catch(err => {
      res.json(err);
    });
};

//Statement
module.exports.getStatement = (req, res) => {
  db.Statement.find({})
    .then(dbStatement => {
      res.json(dbStatement);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.newStatement = (req, res) => {
  let data = _.pick(req.body, ["username", "cycle", "currentBalance", "notes"]);
  db.Statement.create(data)
    // .then(dbStatement => {
    //   return db.User.findOneAndUpdate(
    //     { username: data.username },
    //     { $push: { statement: dbStatement._id } },
    //     { new: true }
    //   );
    // })
    .then(dbStatement => {
      return db.Cycle.findOneAndUpdate(
        { date: data.cycle },
        { $push: { statement: dbStatement._id } },
        { new: true }
      );
    })
    .then(dbStatement => {
      res.json(dbStatement);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.updateStatement = (req, res) => {
  let data = _.pick(req.body, ["username", "cycle", "currentBalance", "notes"]);
  console.log(data);
  db.Statement.findOneAndUpdate(
    { username: data.username, cycle: data.cycle },
    { $set: { currentBalance: data.currentBalance, notes: data.notes } }
  )
    .then(dbStatement => {
      res.json(dbStatement);
    })
    .catch(err => {
      res.json(err);
    });
};

//Cycle
module.exports.getCycle = (req, res) => {
  db.Cycle.find({})
    .populate("statement")
    .sort([["createdAt", -1]])
    .then(dbCycle => {
      res.json(dbCycle);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.newCycle = (req, res) => {
  let data = _.pick(req.body, ["date"]);
  db.Cycle.create(data)
    .then(dbCycle => {
      res.json(dbCycle);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.updateCycle = (req, res) => {
  let data = _.pick(req.body, ["chooseDate", "date"]);
  db.Cycle.findOneAndUpdate(
    { date: data.chooseDate },
    { $set: { date: data.date } }
  )
    .then(dbCycle => {
      res.json(dbCycle);
    })
    .catch(err => {
      res.json(err);
    });
};

const db = require('../config/connection');
const { User, Account } = require('../models');
const userSeeds = require('./userSeeds.json');
const accountSeeds = require('./accountSeeds.json');

db.once('open', async () => {
  try {
    await Account.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Account.create(accountSeeds)

    for (let i = 0; i < accountSeeds.length; i++) {
      const { _id, gamerName } = await Account.create(accountSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: gamerName },
        {
          $addToSet: {
            accounts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

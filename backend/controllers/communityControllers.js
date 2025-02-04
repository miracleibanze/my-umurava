const Community = require("../models/Community");

const createCommunity = async (req, res) => {
  try {
    const community = new Community(req.body);
    await community.save();

    if (community.listOfMembers && community.listOfMembers.length > 0) {
      await User.updateMany(
        {
          _id: { $in: community.listOfMembers.map((member) => member.userId) },
        },
        { $push: { communityJoined: community._id } }
      );
    }

    res.status(201).json(community);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCommunity, getCommunities };

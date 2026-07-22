module.exports = async function handler(req, res) {
  res.status(200).json({ 
    status: "ok", 
    info: "I media sono ora gestiti via BSD Direct con cache Neon dinamica." 
  });
};

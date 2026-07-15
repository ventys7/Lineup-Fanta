module.exports = async function handler(req, res) {
  return res.status(200).json({
    disabled: true,
    reason: "Le facce usano URL BSD diretti e non richiedono sincronizzazioni Blob pianificate."
  });
};

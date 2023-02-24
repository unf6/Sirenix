require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",
    mongoUri: process.env.mongoUri || "",
    spotifyClientID: process.env.spotifyClientID || "",
    spotifySecret: process.env.spotifySecret || "",

  openai: {
    key: process.env.KEY || "",
  },

  color: {
        default: process.env.DEFAULT_COLOR || "#00FF00",
        error: process.env.ERROR_COLOR || "#FF0000",
        success: process.env.SUCCESS_COLOR || "#00FF00",
        info: process.env.INFO_COLOR || "#00FFFF",
        warn: process.env.WARN_COLOR || "#FFFF00",
    },

  links: {
        img: process.env.IMG || '',
        support: process.env.SUPPORT || '',
        invite: process.env.INVITE || '' //bot invite link
    },
  
}
